import { create } from '@storybook/theming/create';

// Set to dark so cold logo is visible
export default create({
	base: 'dark',
	brandTitle: 'Cold Components',
	brandUrl: 'https://app.coldclimate.online',
	brandImage: './cold.svg',
	brandTarget: '_self',
});
