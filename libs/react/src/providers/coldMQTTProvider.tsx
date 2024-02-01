import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import mqtt from 'mqtt';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import ColdMQTTContext from '../context/coldMQTTContext';
import { useSWRConfig } from 'swr';
import { forEach } from 'lodash';

export const ColdMQTTProvider = ({ children }: PropsWithChildren) => {
  const { user, orgId, getAccessTokenSilently, isAuthenticated } = useAuth0Wrapper();
  const client = useRef<mqtt.MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [messages, setMessages] = React.useState<string[]>([]);
  const { mutate } = useSWRConfig();
  useEffect(() => {
    const getToken = async () => {
      const audience = import.meta.env.VITE_COLD_API_AUDIENCE as string;
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: audience,
          scope: 'offline_access email profile openid',
        },
      });
      return token;
    };

    const connectToIOT = async () => {
      const auth0_domain = import.meta.env.VITE_AUTH0_DOMAIN;
      const authorizer = 'mqtt_authorizer';
      const org_id = orgId;
      const token = await getToken();
      const env = import.meta.env.VITE_DD_ENV;
      const url = `${
        import.meta.env.VITE_MQTT_URL
      }/mqtt?x-auth0-domain=${auth0_domain}&x-amz-customauthorizer-name=${authorizer}&x-cold-org=${org_id}&x-cold-env=${env}&token=${token}`;
      const account_id = user?.email;

      if (user && orgId) {
        client.current = mqtt.connect(url, { clientId: `${org_id}-${Math.floor(Math.random() * 1000)}` });

        client.current.on('connect', () => {
          console.log('connected to IOT');
          setConnectionStatus(true);
        });

        client.current.on('message', (topic, payload, packet) => {
          console.log('New Message ' + payload.toString());
          const payloadString = payload.toString();
          try {
            // convert the payload to a json object
            const parsedPayload = JSON.parse(payloadString);
            // if the payload is a json object, mutate the swr with the new swr_key
            if (parsedPayload.swr_key) {
              mutate([parsedPayload.swr_key, 'GET']);
            }
          } catch (e) {
            console.log(e);
          }
        });

        client.current.on('close', () => {
          setConnectionStatus(false);
          console.log('disconnected');
        });

        const topics = [`ui/${env}/${org_id}/${account_id}`, `ui/${env}/${org_id}/#`, `system/${env}`];

        forEach(topics, topic => {
          subscribeToTopic(topic);
        });

        // for cold admin users, subscribe to system/env/cold
        if (user.coldclimate_claims.roles.includes('cold:admin')) {
          client.current?.subscribe(`system/${env}/cold`, { qos: 0, nl: false }, (err, grant) => {
            if (!err) {
              console.log(`Subscribed to system/${env}/cold`);
            } else {
              console.log(`Error subscribing to system/${env}/cold` + err);
            }
          });
        }
      }
    };

    connectToIOT();
  }, [user, orgId, getAccessTokenSilently, isAuthenticated]);

  const subscribeToTopic = (topic: string) => {
    if (client.current) {
      client.current.subscribe(topic, (err, granted) => {
        if (err) {
          console.log('Error subscribing to topic ' + topic);
        } else {
          console.log('Subscribed to topic ' + topic);
        }
      });
    }
  };

  return children;
};
