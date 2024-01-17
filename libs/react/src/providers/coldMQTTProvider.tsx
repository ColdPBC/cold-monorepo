import React, { PropsWithChildren, useContext, useEffect } from 'react';
import mqtt from 'mqtt';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';

export const ColdMQTTProvider = ({ children }: PropsWithChildren) => {
  const { user, orgId, getAccessTokenSilently, isAuthenticated } = useAuth0Wrapper();

  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [messages, setMessages] = React.useState<string[]>([]);

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
      const url = `wss://a2r4jtij2021gz-ats.iot.us-east-1.amazonaws.com?x-auth0-domain=${auth0_domain}&x-amz-customauthorizer-name=${authorizer}&x-cold-org=${org_id}&token=${token}&mqtt-client-id=${Math.floor(
        Math.random() * 1000,
      )}&x-cold-env=${env}`;
      const account_id = user?.email;
      const subscription_topic = `${env}/ui/${org_id}/${account_id}/#`;
      const publish_topic = `${env}/ui/${org_id}/${account_id}/test`;

      if (user && orgId && account_id && isAuthenticated) {
        const options = {
          clean: true,
          connectTimeout: 4000,
        };
        const client = mqtt.connect(url, options);

        client.on('error', error => {
          console.log(`Error: ${error}`);
        });

        client.on('connect', () => {
          console.log('connected to IOT');
          setConnectionStatus(true);
          client.subscribe(subscription_topic, error => {
            if (error) {
              console.log(`error subscribing to ${subscription_topic}: ` + error);
            } else {
              console.log(`topic: ${subscription_topic}`);
            }
          });
          client.publish(publish_topic, 'Hello mqtt', error => {
            if (error) {
              console.log(`error publishing to ${publish_topic}: ` + error);
            } else {
              console.log(`publishing to: ${publish_topic}`);
            }
          });
        });

        client.on('close', () => {
          console.log('Closing');
          setConnectionStatus(false);
        });

        client.on('message', packet => {
          console.log('Message ' + packet);
        });
      }
    };

    connectToIOT();
  }, [user, orgId, getAccessTokenSilently, isAuthenticated]);

  return children;
};
