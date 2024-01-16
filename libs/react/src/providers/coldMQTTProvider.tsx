import React, { PropsWithChildren, useContext, useEffect } from "react";
import mqtt from 'mqtt';
import { useAuth0Wrapper, useColdContext } from "@coldpbc/hooks";
import { mqtt5 } from "aws-crt";
import { AwsIotMqtt5ClientConfigBuilder } from "aws-crt/dist.browser/browser/aws_iot_mqtt5";

export const ColdMQTTProvider = ({ children }: PropsWithChildren) => {
  // const {Mqtt5Client} = mqtt5;
  const {
    user,
    orgId,
    getAccessTokenSilently,
    isAuthenticated,
  } = useAuth0Wrapper();

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
    }

    const connectToIOT = async () => {
      const auth0_domain = import.meta.env.VITE_AUTH0_DOMAIN;
      const authorizer = 'mqtt_authorizer';
      const org_id = orgId;
      const token = await getToken();
      const env = import.meta.env.VITE_DD_ENV;
      const url = `wss://a2r4jtij2021gz-ats.iot.us-east-1.amazonaws.com:8443/mqtt?x-auth0-domain=${auth0_domain}&x-amz-customauthorizer-name=${authorizer}&org_id=${org_id}&token=${token}&mqtt-client-${Math.floor(Math.random() * 1000)}`;
      const account_id = user?.email;
      const subscription_topic = `${env}/ui/${org_id}/${account_id}/#`;
      const publish_topic = `${env}/ui/${org_id}/${account_id}/test`;

      if(user && orgId) {
        const client = mqtt.connect(url);
        // const customAuthConfig  = {
        //   authorizerName: "mqtt_authorizer",
        // };
        // let builder = AwsIotMqtt5ClientConfigBuilder.newWebsocketMqttBuilderWithCustomAuth(
        //   url,
        //   customAuthConfig
        // );
        // const client : Mqtt5Client = new mqtt5.Mqtt5Client(builder.build());

        client.on('connect', () => {
          console.log('connected to IOT');

          client.subscribe(subscription_topic, {qos: 0, nl: false}, (err, grant) => {
            if (!err) {
              setMessages(messages.concat([`Subscription: ${subscription_topic}`]));
              client.publish(publish_topic, JSON.stringify(grant));
            } else {
              console.log(err)
            }
          });
        });
        // client.on('connectionFailure', (error) => {
        //   console.log(error);
        // })
        client.on('message', (topic, payload, packet) => {
          console.log(payload.toString());
          setMessages(messages.concat(payload.toString()));
        });

        // client.start();

        client.on('close', () => {
          setConnectionStatus(false);
          console.log('disconnected');
        });
      }
    };

    connectToIOT();
  }, [user, orgId, getAccessTokenSilently, isAuthenticated]);

  console.log(messages);

  return (
    children
  );
};
