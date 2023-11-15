export const postNewsExample = {
  image_url: '{{$randomNatureImage}}',
  published_at: '{{$randomDatePast}}',
  source_name: 'New York Times',
  publish: false,
  title: '{{$randomAdjective}} Climate News',
  url: '{{$randomUrl}}',
};

export const publishNewsDecoratorOptions = {
  name: 'publish',
  type: Boolean,
  required: true,
  example: false,
};
