export type RabbitMessagePayload = {
  data: any;
  event: string;
  isRPC?: boolean;
  from: string;
};
