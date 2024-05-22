import React, { PropsWithChildren, useEffect, useRef } from 'react';
import mqtt from 'mqtt';
import { useSWRConfig } from 'swr';
import { forEach, set } from 'lodash';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { SWRSubscription } from 'swr/subscription';
import ColdMQTTContext from '../context/coldMQTTContext';
import { resolveNodeEnv } from '@coldpbc/fetchers';

export const ColdMQTTProvider = ({ children }: PropsWithChildren) => {
  const { logBrowser } = useColdContext();
  const { user, orgId, getAccessTokenSilently, isAuthenticated } = useAuth0Wrapper();
  const client = useRef<mqtt.MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [token, setToken] = React.useState<string>('');
  const { mutate } = useSWRConfig();
  const flags = useFlags();
  const [excludeTopics, setExcludeTopics] = React.useState<string[]>([]);

  useEffect(() => {
    const getToken = async () => {
      const audience = import.meta.env.VITE_COLD_API_AUDIENCE as string;
      return await getAccessTokenSilently({
        authorizationParams: {
          audience: audience,
          scope: 'offline_access email profile openid',
        },
      });
    };

    const connectToIOT = async () => {
      if (user && orgId) {
        const auth0_domain = import.meta.env.VITE_AUTH0_DOMAIN;
        const authorizer = 'mqtt_authorizer';
        const org_id = orgId;
        const token = await getToken();
        setToken(token);
        const env = resolveNodeEnv();
        const url = `${
          import.meta.env.VITE_MQTT_URL
        }/mqtt?x-auth0-domain=${auth0_domain}&x-amz-customauthorizer-name=${authorizer}&x-cold-org=${org_id}&x-cold-env=${env}&token=${token}`;

        if (client.current === null) {
          logBrowser('Connecting to IOT', 'info', {
            url,
            org_id,
            env,
          });
          client.current = mqtt.connect(url, {
            clientId: `${org_id}-${Math.floor(Math.random() * 1000)}`,
            clean: false,
            properties: {
              sessionExpiryInterval: 24 * 60 * 60,
            },
          });
        } else {
          logBrowser('Reconnecting to IOT', 'info', {
            url,
            org_id,
            env,
          });
          client.current.reconnect();
        }

        client.current?.on('connect', () => {
          logBrowser('Connected to IOT', 'info');
          setConnectionStatus(true);

          const topics = [`ui/${env}/${org_id}/#`, `system/${env}/public/#`];
          forEach(topics, topic => {
            subscribeToTopic(topic, client.current);
          });

          if (user.coldclimate_claims.roles.includes('cold:admin')) {
            subscribeToTopic(`system/${env}/cold/#`, client.current);
          }
        });

        client.current?.on('message', async (topic, payload, packet) => {
          const payloadString = packet.payload.toString();
          logBrowser('Received message from IOT', 'info', { topic });
          try {
            const parsedPayload = JSON.parse(payloadString);
            logBrowser('Parsed payload from IOT', 'info', {
              topic,
              swr_key: parsedPayload.swr_key,
              payload: parsedPayload,
            });
            if (parsedPayload.swr_key) {
              if (flags.throttleSwrMutateCalls) {
                const storage = localStorage.getItem('api-calls');
                const parsedStorage = storage ? JSON.parse(storage) : {};
                const waitMS = 100 * 60; // 10 per minute
                const lastCall = parsedStorage[parsedPayload.swr_key] ? new Date(parsedStorage[parsedPayload.swr_key]) : new Date(0);
                const now = new Date();
                if (now.getTime() - lastCall.getTime() < waitMS) {
                  logBrowser('Skipping SWR call', 'info', {
                    topic,
                    swr_key: parsedPayload.swr_key,
                    lastCall: lastCall.toISOString(),
                    now: now.toISOString(),
                  });
                  return;
                }
                parsedStorage[parsedPayload.swr_key] = new Date().toISOString();
                localStorage.setItem('api-calls', JSON.stringify(parsedStorage));
              }
              await mutate([parsedPayload.swr_key, 'GET']);
            }
          } catch (e) {
            logBrowser('Error parsing payload from IOT', 'error', { topic, e }, e);
          }
        });

        client.current?.on('close', () => {
          setConnectionStatus(false);
          console.log('Connection to IOT closed');
          logBrowser('Connection to IOT closed', 'info');
        });
      }
    };

    connectToIOT();

    return () => {
      if (client.current) {
        client.current?.end(true);
      }
    };
  }, [user, orgId, getAccessTokenSilently, isAuthenticated]);

  const subscribeToTopic = (topic: string, client: mqtt.MqttClient | null) => {
    if (client) {
      client.subscribe(topic, (err, granted) => {
        if (err) {
          logBrowser('Error subscribing to topic ' + topic, 'error', { err }, err);
        } else {
          logBrowser('Subscribed to topic ' + topic, 'info', { topic, granted });
        }
      });
    }
  };

  const subscribeSWR: SWRSubscription<string, number, Error> = (key: string | null, { next }) => {
    if (!key) {
      return () => {};
    }
    client.current?.subscribe(key, async (err, granted) => {
      logBrowser('Subscribed to topic ' + key, 'info', { err, key, granted });
      client.current?.on('message', async (topic, payload, packet) => {
        next(err, prev => {
          if (topic !== key) {
            logBrowser(`Received different message from IOT for ${key} to ${topic}`, 'info', {
              key,
              topic,
              payload: JSON.parse(payload.toString()),
            });
            return prev;
          } else {
            logBrowser(`Received message from IOT for ${key}`, 'info', {
              key,
              topic,
              payload: JSON.parse(payload.toString()),
            });
            return JSON.parse(payload.toString());
          }
        });
      });
    });
    return () => {
      client.current?.unsubscribe(key);
    };
  };

  const publishMessage = (topic: string, message: string) => {
    if (client.current) {
      const newMessage = JSON.parse(message);
      set(newMessage, 'user', user);
      set(newMessage, 'org_id', orgId);
      set(newMessage, 'token', token);
      logBrowser(`Publishing message to ${topic}`, 'info', { topic, newMessage });
      client.current.publish(topic, JSON.stringify(newMessage));
    }
  };

  return (
    <ColdMQTTContext.Provider
      value={{
        subscribeSWR,
        publishMessage,
        connectionStatus,
        client,
      }}>
      {children}
    </ColdMQTTContext.Provider>
  );
};
