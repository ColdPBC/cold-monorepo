import { v4 } from 'uuid';

export const publishMock = {
  image_url: 'http://placeimg.com/640/480',
  published_at: '1945-07-18T05:51:15.352Z',
  source_name: 'New York Times',
  title: 'dolore consectetur ea',
  url: 'http://cassandre.net',
  id: v4(),
  publish: true,
};

export const notPublishMock = {
  image_url: 'http://placeimg.com/640/480',
  published_at: '1945-07-18T05:51:15.352Z',
  source_name: 'New York Times',
  title: 'dolore consectetur ea',
  url: 'http://cassandre.net',
  id: v4(),
  publish: false,
};
