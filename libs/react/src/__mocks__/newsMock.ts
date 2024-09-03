import { subDays, subWeeks } from 'date-fns';

export function getNewsDefault() {
  return [
    {
      title: 'Carbon credit market confidence ebbs as big names retreat',
      url: 'https://www.reuters.com/sustainability/carbon-credit-market-confidence-ebbs-big-names-retreat-2023-09-01/',
      image_url:
        'https://www.reuters.com/resizer/19ZnOlXJL0lqbq588RsYF5Z-cAM=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/6ELBCZRUIRK7FNNQCF66P47QIA.jpg',
      published_at: subDays(new Date(), 1).toISOString(),
      source_name: 'Reuters',
    },
    {
      title: 'Save the Planet, Put Down that Hamburger',
      url: 'https://www.nytimes.com/2023/07/21/climate/diet-vegan-meat-emissions.html',
      image_url: 'https://static01.nyt.com/images/2023/07/21/science/21CLI-VEGAN/21CLI-VEGAN-facebookJumbo.jpg',
      published_at: subWeeks(new Date(), 6).toISOString(),
      source_name: 'The New York Times',
    },
  ];
}

export function getNewsAllMissingProperties() {
  return [
    {
      title: 'Carbon credit market confidence ebbs as big names retreat',
      image_url:
        'https://www.reuters.com/resizer/19ZnOlXJL0lqbq588RsYF5Z-cAM=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/6ELBCZRUIRK7FNNQCF66P47QIA.jpg',
      published_at: subDays(new Date(), 1).toISOString(),
      source_name: 'Reuters',
    },
    {
      url: 'https://www.nytimes.com/2023/07/21/climate/diet-vegan-meat-emissions.html',
      image_url: 'https://static01.nyt.com/images/2023/07/21/science/21CLI-VEGAN/21CLI-VEGAN-facebookJumbo.jpg',
      published_at: subWeeks(new Date(), 6).toISOString(),
      source_name: 'The New York Times',
    },
  ];
}

export function getNewsSomeMissingProperties() {
  return [
    {
      url: 'https://www.reuters.com/sustainability/carbon-credit-market-confidence-ebbs-big-names-retreat-2023-09-01/',
      image_url:
        'https://www.reuters.com/resizer/19ZnOlXJL0lqbq588RsYF5Z-cAM=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/6ELBCZRUIRK7FNNQCF66P47QIA.jpg',
      published_at: subDays(new Date(), 1).toISOString(),
      source_name: 'Reuters',
    },
    {
      title: 'Save the Planet, Put Down that Hamburger',
      url: 'https://www.nytimes.com/2023/07/21/climate/diet-vegan-meat-emissions.html',
      image_url: 'https://static01.nyt.com/images/2023/07/21/science/21CLI-VEGAN/21CLI-VEGAN-facebookJumbo.jpg',
      published_at: subWeeks(new Date(), 6).toISOString(),
      source_name: 'The New York Times',
    },
  ];
}
