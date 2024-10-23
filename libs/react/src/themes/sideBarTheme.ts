import { FlowbiteSidebarTheme } from 'flowbite-react';

export const SideBarTheme: FlowbiteSidebarTheme = {
	root: {
		base: 'h-full',
		collapsed: {
			on: 'w-16',
			off: 'w-72',
		},
		inner: 'h-full w-full overflow-y-auto overflow-x-hidden rounded bg-cold-midnightBlue py-4 px-3',
	},
	collapse: {
		button:
			'group flex w-full items-center rounded p-2 text-base text-cold-limestone stroke-cold-limestone group-hover:text-cold-starkWhite fill-cold-limestone font-normal transition duration-75 ',
		icon: {
			base: 'h-6 w-6 transition duration-75',
			open: {
				off: '',
				on: 'bg-cold-skyBlue text-cold-starkWhite',
			},
		},
		label: {
			base: 'ml-3 flex-1 whitespace-nowrap text-left',
			icon: {
				base: 'h-6 w-6',
				open: {
					on: '',
					off: '',
				},
			},
		},
		list: 'space-y-2 py-2',
	},
	cta: {
		base: 'mt-6 rounded-lg p-4',
		color: {
			blue: 'bg-cold-midnightBlue dark:bg-midnightBlue',
			dark: 'bg-dark-50 dark:bg-dark-900',
			failure: 'bg-cold-red-100 dark:bg-red-500',
			gray: 'bg-cold-secondary-100 dark:bg-secondary-900',
			green: 'bg-success-100 dark:bg-success-900',
			light: 'bg-light-50 dark:bg-light-900',
			red: 'bg-cold-red-100 dark:bg-cold-red-900',
			purple: 'bg-cold-midnightBlue-100 dark:bg-midnightBlue-900',
			success: 'bg-pineGreen-100 dark:bg-pineGreen-900',
			yellow: 'bg-astralYellow-100 dark:bg-astralYellow-900',
			warning: 'bg-astralYellow-100 dark:bg-astralYellow-900',
		},
	},
	item: {
		base: 'flex items-center justify-center rounded p-2 py-2 stroke-cold-limestone fill-cold-limestone text-cold-limestone hover:text-cold-starkWhite hover:bg-cold-midnightBlue-100 hover:stroke-cold-starkWhite ',
		active: 'bg-cold-skyBlue',
		collapsed: {
			insideCollapse: 'group w-full pl-8 transition duration-75',
			noIcon: 'font-bold',
		},
		content: {
			base: 'px-3 flex-1 whitespace-nowrap',
		},
		icon: {
			base: 'h-6 w-6 active:bg-cold-skyBlue stroke-cold-limestone fill-cold-limestone text-cold-limestone hover:stroke-cold-starkWhite, hover:fill-cold-starkWhite hover:text-cold-starkWhite flex-shrink-0 transition duration-75',
			active: 'bg-cold-skyBlue text-cold-starkWhite',
		},
		label: '',
		listItem: '',
	},
	items: {
		base: '',
	},
	itemGroup: {
		base: 'mt-4 space-y-2 border-t pt-8 first:mt-0 first:border-t-0 first:pt-0',
	},
	logo: {
		base: 'mb-5 flex items-center pl-2.5',
		collapsed: {
			on: 'hidden',
			off: 'self-center whitespace-nowrap text-xl font-semibold dark:text-white',
		},
		img: 'mr-3 h-6 sm:h-7',
	},
};
