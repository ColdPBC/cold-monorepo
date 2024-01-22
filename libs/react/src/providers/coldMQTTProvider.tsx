import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import mqtt from 'mqtt';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import ColdMQTTContext from '../context/coldMQTTContext';
import { useSWRConfig } from 'swr';

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
      const url = `wss://a2r4jtij2021gz-ats.iot.us-east-1.amazonaws.com:443/mqtt?x-auth0-domain=${auth0_domain}&x-amz-customauthorizer-name=${authorizer}&x-cold-org=${org_id}&x-cold-env=${env}&token=${token}`;
      const account_id = user?.email;
      const subscription_topic = `ui/${env}/${org_id}/${account_id}`;

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
              mutate(parsedPayload.swr_key);
            }
          } catch (e) {
            console.log(e);
          }
        });

        client.current.on('close', () => {
          setConnectionStatus(false);
          console.log('disconnected');
        });

        client.current?.subscribe(subscription_topic, { qos: 0, nl: false }, (err, grant) => {
          if (!err) {
            console.log(`Subscribed to ${subscription_topic}`);
          } else {
            console.log(err);
          }
        });
      }
    };

    connectToIOT();
  }, [user, orgId, getAccessTokenSilently, isAuthenticated]);

  const subscribe = (topic: string) => {
    client.current?.subscribe(topic, { qos: 0, nl: false }, (err, grant) => {
      if (!err) {
        setMessages(messages.concat([`Subscription: ${topic}`]));
        client.current?.publish(topic, JSON.stringify(grant));
      } else {
        console.log(err);
      }
    });
  };

  const publish = (topic: string, message: string) => {
    client.current?.publish(topic, message);
  };

  // create a context to store the client and expose the subscribe and publish methods
  const context = {
    client: client.current,
    subscribe,
    publish,
  };

  return children;
};
