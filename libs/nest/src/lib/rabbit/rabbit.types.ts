export type RabbitMessagePayload = {
  method?: string;
  event: string;
  from: string;
  data: any;
};
