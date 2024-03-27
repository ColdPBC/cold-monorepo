import React, { PropsWithChildren, useEffect, useRef } from 'react';
import mqtt from 'mqtt';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { useSWRConfig } from 'swr';
import { forEach } from 'lodash';

export const ColdMQTTProvider = ({ children }: PropsWithChildren) => {
  const { logBrowser } = useColdContext();
  const { user, orgId, getAccessTokenSilently, isAuthenticated } = useAuth0Wrapper();
  const client = useRef<mqtt.MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const { mutate } = useSWRConfig();
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
        const env = import.meta.env.VITE_DD_ENV;
        const url = `${
          import.meta.env.VITE_MQTT_URL
        }/mqtt?x-auth0-domain=${auth0_domain}&x-amz-customauthorizer-name=${authorizer}&x-cold-org=${org_id}&x-cold-env=${env}&token=${token}`;

        client.current = mqtt.connect(url, { clientId: `${org_id}-${Math.floor(Math.random() * 1000)}` });

        client.current.on('connect', () => {
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

        client.current.on('message', (topic, payload, packet) => {
          const payloadString = packet.payload.toString();
          logBrowser('Received message from IOT', 'info', { topic, payloadString, packet });
          try {
            const parsedPayload = JSON.parse(payloadString);
            logBrowser('Received message from IOT', 'info', { topic, parsedPayload, packet });
            if (parsedPayload.swr_key) {
              mutate([parsedPayload.swr_key, 'GET']);
            }
          } catch (e) {
            logBrowser('Error parsing payload from IOT', 'error', { topic, payloadString, packet, e }, e);
          }
        });

        client.current.on('close', () => {
          setConnectionStatus(false);
          logBrowser('Connection to IOT closed', 'info');
        });
      }
    };

    connectToIOT();
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

  return children;
};
