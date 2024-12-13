import type { CustomFlowbiteTheme, FlowbiteTheme } from 'flowbite-react';
import { theme } from 'flowbite-react';

export const darkTableTheme: CustomFlowbiteTheme = {
  ...theme,
  table: {
    root: {
      base: 'w-full text-left text-sm text-gray-500 dark:text-gray-400',
      shadow: '',
      wrapper: 'relative border-gray-50 border border-solid rounded-lg bg-gray-50 flex-1 w-full h-auto',
    },
    body: {
      base: 'group/body',
      cell: {
        base: 'group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg px-4 py-4 bg-bgc-elevated whitespace-pre',
      },
    },
    head: {
      base: 'group/head text-xs uppercase text-gray-700 dark:text-gray-400',
      cell: {
        base: 'group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-none dark:bg-gray-700 px-4 py-3 font-normal',
      },
    },
    row: {
      base: 'group/row border-t border-gray-50',
      hovered: 'hover:bg-gray-50 dark:hover:bg-gray-600',
      striped: 'odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700',
    },
  },
};

export const flowbiteThemeOverride: FlowbiteTheme = {
  ...theme,
  accordion: {
    root: {
      base: 'divide-y divide-gray-200 border-gray-200 dark:divide-gray-700 dark:border-gray-700',
      flush: {
        off: 'rounded-lg border',
        on: 'border-b',
      },
    },
    content: {
      base: 'py-5 px-5 last:rounded-b-lg dark:bg-gray-900 first:rounded-t-lg',
    },
    title: {
      arrow: {
        base: 'h-6 w-6 shrink-0',
        open: {
          off: '',
          on: 'rotate-180',
        },
      },
      base: 'flex w-full items-center justify-between first:rounded-t-lg last:rounded-b-lg py-5 px-5 text-left font-medium text-gray-500 dark:text-gray-400',
      flush: {
        off: 'hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-800',
        on: '!bg-transparent dark:!bg-transparent',
      },
      heading: '',
      open: {
        off: '',
        on: 'text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white',
      },
    },
  },
  alert: {
    base: 'flex flex-col gap-2 p-4 text-sm',
    borderAccent: 'border-t-4',
    closeButton: {
      base: '-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg p-1.5 focus:ring-2',
      icon: 'w-5 h-5',
      color: {
        info: 'bg-cold-primary-100 text-cold-primary-500 hover:bg-cold-primary-200 focus:ring-cold-primary-400 dark:bg-cold-primary-200 dark:text-cold-primary-600 dark:hover:bg-cold-primary-300',
        gray: 'bg-cold-limestone-100 text-cold-limestone-500 hover:bg-cold-limestone-200 focus:ring-cold-limestone-400 dark:bg-cold-limestone-700 dark:text-cold-limestone-300 dark:hover:bg-cold-limestone-800 dark:hover:text-cold-stark-white',
        failure: 'bg-cold-red-100 text-cold-red-500 hover:bg-cold-red-200 focus:ring-cold-red-400 dark:bg-cold-red-200 dark:text-cold-red-600 dark:hover:bg-cold-red-300',
        success:
          'bg-cold-pineGreen-100 text-cold-pineGreen-500 hover:bg-cold-pineGreen-200 focus:ring-cold-pineGreen-400 dark:bg-cold-pineGreen-200 dark:text-cold-pineGreen-600 dark:hover:bg-cold-pineGreen-300',
        warning: 'bg-yellow-100 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-400 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300',
        red: 'bg-red-100 text-red-500 hover:bg-red-200 focus:ring-red-400 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300',
        green:
          'bg-cold-pineGreen-100 text-cold-pineGreen-500 hover:bg-cold-pineGreen-200 focus:ring-cold-pineGreen-400 dark:bg-cold-pineGreen-200 dark:text-cold-pineGreen-600 dark:hover:bg-cold-pineGreen-300',
        yellow: 'bg-yellow-100 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-400 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300',
        blue: 'bg-cold-skyBlue-100 text-cold-skyBlue-500 hover:bg-cold-skyBlue-200 focus:ring-cold-skyBlue-400 dark:bg-cold-skyBlue-200 dark:text-cold-skyBlue-600 dark:hover:bg-cold-skyBlue-300',
        cyan: 'bg-cyan-100 text-cyan-500 hover:bg-cyan-200 focus:ring-cyan-400 dark:bg-cyan-200 dark:text-cyan-600 dark:hover:bg-cyan-300',
        pink: 'bg-pink-100 text-pink-500 hover:bg-pink-200 focus:ring-pink-400 dark:bg-pink-200 dark:text-pink-600 dark:hover:bg-pink-300',
        lime: 'bg-lime-100 text-lime-500 hover:bg-lime-200 focus:ring-lime-400 dark:bg-lime-200 dark:text-lime-600 dark:hover:bg-lime-300',
        dark: 'bg-gray-100 text-gray-500 hover:bg-gray-200 focus:ring-gray-400 dark:bg-gray-200 dark:text-gray-600 dark:hover:bg-gray-300',
        indigo: 'bg-indigo-100 text-indigo-500 hover:bg-indigo-200 focus:ring-indigo-400 dark:bg-indigo-200 dark:text-indigo-600 dark:hover:bg-indigo-300',
        purple: 'bg-purple-100 text-purple-500 hover:bg-purple-200 focus:ring-purple-400 dark:bg-purple-200 dark:text-purple-600 dark:hover:bg-purple-300',
        teal: 'bg-teal-100 text-teal-500 hover:bg-teal-200 focus:ring-teal-400 dark:bg-teal-200 dark:text-teal-600 dark:hover:bg-teal-300',
        light: 'bg-gray-50 text-gray-500 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white',
      },
    },
    color: {
      info: 'text-cold-skyBlue-700 bg-cold-skyBlue-100 border-cold-skyBlue-500 dark:bg-cold-skyBlue-200 dark:text-cold-skyBlue-800',
      gray: 'text-gray-700 bg-gray-100 border-gray-500 dark:bg-gray-700 dark:text-gray-300',
      failure: 'text-red-700 bg-red-100 border-red-500 dark:bg-red-200 dark:text-red-800',
      success: 'text-cold-pineGreen-700 bg-cold-pineGreen-100 border-cold-pineGreen-500 dark:bg-cold-pineGreen-200 dark:text-cold-pineGreen-800',
      warning: 'text-yellow-700 bg-yellow-100 border-yellow-500 dark:bg-yellow-200 dark:text-yellow-800',
      red: 'text-red-700 bg-red-100 border-red-500 dark:bg-red-200 dark:text-red-800',
      green: 'text-cold-pineGreen-700 bg-cold-pineGreen-100 border-cold-pineGreen-500 dark:bg-cold-pineGreen-200 dark:text-cold-pineGreen-800',
      yellow: 'text-yellow-700 bg-yellow-100 border-yellow-500 dark:bg-yellow-200 dark:text-yellow-800',
      blue: 'text-cold-skyBlue-700 bg-cold-skyBlue-100 border-cold-skyBlue-500 dark:bg-cold-skyBlue-200 dark:text-cold-skyBlue-800',
      cyan: 'text-cyan-700 bg-cyan-100 border-cyan-500 dark:bg-cyan-200 dark:text-cyan-800',
      pink: 'text-pink-700 bg-pink-100 border-pink-500 dark:bg-pink-200 dark:text-pink-800',
      lime: 'text-lime-700 bg-lime-100 border-lime-500 dark:bg-lime-200 dark:text-lime-800',
      dark: 'text-gray-200 bg-gray-800 border-gray-600 dark:bg-gray-900 dark:text-gray-300',
      indigo: 'text-indigo-700 bg-indigo-100 border-indigo-500 dark:bg-indigo-200 dark:text-indigo-800',
      purple: 'text-purple-700 bg-purple-100 border-purple-500 dark:bg-purple-200 dark:text-purple-800',
      teal: 'text-teal-700 bg-teal-100 border-teal-500 dark:bg-teal-200 dark:text-teal-800',
      light: 'text-gray-600 bg-gray-50 border-gray-400 dark:bg-gray-500 dark:text-gray-200',
    },
    icon: 'mr-3 inline h-5 w-5 flex-shrink-0',
    rounded: 'rounded-lg',
    wrapper: 'flex items-center',
  },
  avatar: {
    root: {
      base: 'flex justify-center items-center space-x-4',
      bordered: 'p-1 ring-2',
      rounded: '!rounded-full',
      color: {
        dark: 'ring-gray-800 dark:ring-gray-800',
        failure: 'ring-red-500 dark:ring-red-700',
        gray: 'ring-gray-500 dark:ring-gray-400',
        info: 'ring-blue-400 dark:ring-blue-800',
        light: 'ring-gray-300 dark:ring-gray-500',
        purple: 'ring-purple-500 dark:ring-purple-600',
        success: 'ring-green-500 dark:ring-green-500',
        warning: 'ring-yellow-300 dark:ring-yellow-500',
        pink: 'ring-pink-500 dark:ring-pink-500',
      },
      img: {
        off: 'rounded relative overflow-hidden',
        on: 'rounded',
        placeholder: 'absolute w-auto h-auto text-gray-400 -bottom-1',
        base: '',
      },
      size: {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-20 h-20',
        xl: 'w-36 h-36',
      },
      stacked: 'ring-2 ring-gray-300 dark:ring-gray-500',
      statusPosition: {
        'bottom-left': '-bottom-1 -left-1',
        'bottom-center': '-bottom-1 center',
        'bottom-right': '-bottom-1 -right-1',
        'top-left': '-top-1 -left-1',
        'top-center': '-top-1 center',
        'top-right': '-top-1 -right-1',
        'center-right': 'center -right-1',
        center: 'center center',
        'center-left': 'center -left-1',
      },
      status: {
        away: 'bg-yellow-400',
        base: 'absolute h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800',
        busy: 'bg-red-400',
        offline: 'bg-gray-400',
        online: 'bg-green-400',
      },
      initials: {
        text: 'font-medium text-cold-midnightBlue-a11y',
        base: 'inline-flex overflow-hidden relative justify-center items-center bg-cold-midnightBlue',
      },
    },
    group: {
      base: 'flex -space-x-4',
    },
    groupCounter: {
      base: 'relative flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full ring-2 ring-gray-300 hover:bg-gray-600 dark:ring-gray-500',
    },
  },
  badge: {
    root: {
      base: 'flex h-fit items-center gap-1 font-semibold',
      color: {
        info: 'bg-cold-skyBlue-100 text-cold-skyBlue-800 dark:bg-cold-skyBlue-200 dark:text-cold-skyBlue-800 group-hover:bg-cold-skyBlue-200 dark:group-hover:bg-cold-skyBlue-300',
        gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-600',
        failure: 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900 group-hover:bg-red-200 dark:group-hover:bg-red-300',
        success:
          'bg-cold-pineGreen-100 text-cold-pineGreen-800 dark:bg-cold-pineGreen-200 dark:text-cold-pineGreen-900 group-hover:bg-cold-pineGreen-200 dark:group-hover:bg-cold-pineGreen-300',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-300',
        indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-300',
        purple: 'bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-900 group-hover:bg-purple-200 dark:group-hover:bg-purple-300',
        pink: 'bg-pink-100 text-pink-800 dark:bg-pink-200 dark:text-pink-900 group-hover:bg-pink-200 dark:group-hover:bg-pink-300',
        blue: 'bg-cold-skyBlue-100 text-cold-skyBlue-800 dark:bg-cold-skyBlue-200 dark:text-cold-skyBlue-900 group-hover:bg-cold-skyBlue-200 dark:group-hover:bg-cold-skyBlue-300',
        cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-200 dark:text-cyan-900 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-300',
        dark: 'bg-gray-600 text-gray-100 dark:bg-gray-900 dark:text-gray-200 group-hover:bg-gray-500 dark:group-hover:bg-gray-700',
        light: 'bg-gray-200 text-gray-800 dark:bg-gray-400 dark:text-gray-900 group-hover:bg-gray-300 dark:group-hover:bg-gray-500',
        green:
          'bg-cold-pineGreen-100 text-cold-pineGreen-800 dark:bg-cold-pineGreen-200 dark:text-cold-pineGreen-900 group-hover:bg-cold-pineGreen-200 dark:group-hover:bg-cold-pineGreen-300',
        lime: 'bg-lime-100 text-lime-800 dark:bg-lime-200 dark:text-lime-900 group-hover:bg-lime-200 dark:group-hover:bg-lime-300',
        red: 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900 group-hover:bg-red-200 dark:group-hover:bg-red-300',
        teal: 'bg-teal-100 text-teal-800 dark:bg-teal-200 dark:text-teal-900 group-hover:bg-teal-200 dark:group-hover:bg-teal-300',
        yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-300',
      },
      href: 'group',
      size: {
        xs: 'p-1 text-xs',
        sm: 'p-1.5 text-sm',
      },
    },
    icon: {
      off: 'rounded px-2 py-0.5',
      on: 'rounded-full p-1.5',
      size: {
        xs: 'w-3 h-3',
        sm: 'w-3.5 h-3.5',
      },
    },
  },
  breadcrumb: {
    root: {
      base: '',
      list: 'flex items-center',
    },
    item: {
      base: 'group flex items-center',
      chevron: 'mx-1 h-6 w-6 text-gray-400 group-first:hidden md:mx-2',
      href: {
        off: 'flex items-center text-sm font-medium text-gray-500 dark:text-gray-400',
        on: 'flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
      },
      icon: 'mr-2 h-4 w-4',
    },
  },
  button: {
    base: 'group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10',
    fullSized: 'w-full',
    color: {
      dark: 'text-white bg-gray-800 border border-transparent hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 disabled:hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700 dark:disabled:hover:bg-gray-800',
      failure:
        'text-white bg-red-700 border border-transparent hover:bg-red-800 focus:ring-4 focus:ring-red-300 disabled:hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 dark:disabled:hover:bg-red-600',
      gray: 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-cold-skyBlue-700 disabled:hover:bg-white focus:ring-cold-skyBlue-700 focus:text-cold-skyBlue-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-2 dark:disabled:hover:bg-gray-800',
      info: 'text-white bg-cold-skyBlue-700 border border-transparent hover:bg-cold-skyBlue-800 focus:ring-4 focus:ring-cold-skyBlue-300 disabled:hover:bg-cold-skyBlue-700 dark:bg-cold-skyBlue-600 dark:hover:bg-cold-skyBlue-700 dark:focus:ring-cold-skyBlue-800 dark:disabled:hover:bg-cold-skyBlue-600',
      light:
        'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cold-skyBlue-300 disabled:hover:bg-white dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700',
      purple:
        'text-white bg-purple-700 border border-transparent hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 disabled:hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 dark:disabled:hover:bg-purple-600',
      success:
        'text-white bg-cold-lichenGreen-700 border border-transparent hover:bg-cold-pineGreen-800 focus:ring-4 focus:ring-cold-pineGreen-300 disabled:hover:bg-cold-pineGreen-700 dark:bg-cold-pineGreen-600 dark:hover:bg-cold-pineGreen-700 dark:focus:ring-cold-pineGreen-800 dark:disabled:hover:bg-cold-pineGreen-600',
      warning:
        'text-white bg-yellow-400 border border-transparent hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 disabled:hover:bg-yellow-400 dark:focus:ring-yellow-900 dark:disabled:hover:bg-yellow-400',
      blue: 'text-cold-skyBlue-900 bg-white border border-cold-skyBlue-300 hover:bg-cold-skyBlue-100 focus:ring-4 focus:ring-cold-skyBlue-300 disabled:hover:bg-white dark:bg-cold-skyBlue-600 dark:text-white dark:border-cold-skyBlue-600 dark:hover:bg-cold-skyBlue-700 dark:hover:border-cold-skyBlue-700 dark:focus:ring-cold-skyBlue-700',
      cyan: 'text-cyan-900 bg-white border border-cyan-300 hover:bg-cyan-100 focus:ring-4 focus:ring-cyan-300 disabled:hover:bg-white dark:bg-cyan-600 dark:text-white dark:border-cyan-600 dark:hover:bg-cyan-700 dark:hover:border-cyan-700 dark:focus:ring-cyan-700',
      green:
        'text-cold-pineGreen-900 bg-white border border-cold-pineGreen-300 hover:bg-cold-pineGreen-100 focus:ring-4 focus:ring-cold-pineGreen-300 disabled:hover:bg-white dark:bg-cold-pineGreen-600 dark:text-white dark:border-cold-pineGreen-600 dark:hover:bg-cold-pineGreen-700 dark:hover:border-cold-pineGreen-700 dark:focus:ring-cold-pineGreen-700',
      indigo:
        'text-indigo-900 bg-white border border-indigo-300 hover:bg-indigo-100 focus:ring-4 focus:ring-indigo-300 disabled:hover:bg-white dark:bg-indigo-600 dark:text-white dark:border-indigo-600 dark:hover:bg-indigo-700 dark:hover:border-indigo-700 dark:focus:ring-indigo-700',
      lime: 'text-lime-900 bg-white border border-lime-300 hover:bg-lime-100 focus:ring-4 focus:ring-lime-300 disabled:hover:bg-white dark:bg-lime-600 dark:text-white dark:border-lime-600 dark:hover:bg-lime-700 dark:hover:border-lime-700 dark:focus:ring-lime-700',
      pink: 'text-pink-900 bg-white border border-pink-300 hover:bg-pink-100 focus:ring-4 focus:ring-pink-300 disabled:hover:bg-white dark:bg-pink-600 dark:text-white dark:border-pink-600 dark:hover:bg-pink-700 dark:hover:border-pink-700 dark:focus:ring-pink-700',
      red: 'text-red-900 bg-white border border-red-300 hover:bg-red-100 focus:ring-4 focus:ring-red-300 disabled:hover:bg-white dark:bg-red-600 dark:text-white dark:border-red-600 dark:hover:bg-red-700 dark:hover:border-red-700 dark:focus:ring-red-700',
      teal: 'text-teal-900 bg-white border border-teal-300 hover:bg-teal-100 focus:ring-4 focus:ring-teal-300 disabled:hover:bg-white dark:bg-teal-600 dark:text-white dark:border-teal-600 dark:hover:bg-teal-700 dark:hover:border-teal-700 dark:focus:ring-teal-700',
      yellow:
        'text-yellow-900 bg-white border border-yellow-300 hover:bg-yellow-100 focus:ring-4 focus:ring-yellow-300 disabled:hover:bg-white dark:bg-yellow-600 dark:text-white dark:border-yellow-600 dark:hover:bg-yellow-700 dark:hover:border-yellow-700 dark:focus:ring-yellow-700',
    },
    disabled: 'cursor-not-allowed opacity-50',
    isProcessing: '!cursor-wait',
    spinnerSlot: 'mr-3',
    spinnerLeftPosition: {
      xs: 'left-2',
      sm: 'left-3',
      md: 'left-4',
      lg: 'left-5',
      xl: 'left-6',
    },
    gradient: {
      cyan: 'text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800',
      failure: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800',
      info: 'text-white bg-gradient-to-r from-cold-skyBlue-500 via-cold-skyBlue-600 to-cold-skyBlue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-cold-skyBlue-300 dark:focus:ring-cold-skyBlue-800 ',
      lime: 'text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:ring-lime-300 dark:focus:ring-lime-800',

      pink: 'text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800',
      purple: 'text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800',
      success:
        'text-white bg-gradient-to-r from-cold-pineGreen-400 via-cold-pineGreen-500 to-cold-pineGreen-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-cold-pineGreen-300 dark:focus:ring-cold-pineGreen-800',
      teal: 'text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800',
    },
    gradientDuoTone: {
      cyanToBlue: 'text-white bg-gradient-to-r from-cyan-500 to-cold-skyBlue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800',
      greenToBlue:
        'text-white bg-gradient-to-br from-cold-pineGreen-400 to-cold-skyBlue-600 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cold-pineGreen-200 dark:focus:ring-cold-pineGreen-800',
      pinkToOrange: 'text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800',
      purpleToBlue:
        'text-white bg-gradient-to-br from-purple-600 to-cold-skyBlue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cold-skyBlue-300 dark:focus:ring-cold-skyBlue-800',
      purpleToPink: 'text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800',
      redToYellow: 'text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-100 dark:focus:ring-red-400',
      tealToLime:
        'text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 hover:!text-gray-900 focus:ring-4 focus:ring-lime-200 dark:focus:ring-teal-700',
    },
    inner: {
      base: 'flex items-center',
      position: {
        none: '',
        start: 'rounded-r-none',
        middle: '!rounded-none',
        end: 'rounded-l-none',
      },
      outline: 'border border-transparent',
      isProcessingPadding: {
        xs: 'pl-8',
        sm: 'pl-10',
        md: 'pl-12',
        lg: 'pl-16',
        xl: 'pl-20',
      },
    },
    label: 'ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-cold-skyBlue-200 text-xs font-semibold text-cold-skyBlue-800',
    outline: {
      color: {
        gray: 'border border-gray-900 dark:border-white',
        default: 'border-0',
        light: '',
      },
      off: '',
      on: 'flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-hover:bg-opacity-0 group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full',
      pill: {
        off: 'rounded-md',
        on: 'rounded-full',
      },
    },
    pill: {
      off: 'rounded-lg',
      on: 'rounded-full',
    },
    size: {
      xs: 'text-xs px-2 py-1',
      sm: 'text-sm px-3 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-5 py-2.5',
      xl: 'text-base px-6 py-3',
    },
  },
  buttonGroup: {
    base: 'inline-flex',
    position: {
      none: 'focus:!ring-2',
      start: 'rounded-r-none',
      middle: '!rounded-none border-l-0 pl-0',
      end: 'rounded-l-none border-l-0 pl-0',
    },
  },
  card: {
    root: {
      base: 'flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800',
      children: 'flex h-full flex-col justify-center gap-4 p-6',
      horizontal: {
        off: 'flex-col',
        on: 'flex-col md:max-w-xl md:flex-row',
      },
      href: 'hover:bg-gray-100 dark:hover:bg-gray-700',
    },
    img: {
      base: '',
      horizontal: {
        off: 'rounded-t-lg',
        on: 'h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg',
      },
    },
  },
  carousel: {
    root: {
      base: 'relative h-full w-full',
      leftControl: 'absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none',
      rightControl: 'absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none',
    },
    indicators: {
      active: {
        off: 'bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800',
        on: 'bg-white dark:bg-gray-800',
      },
      base: 'h-3 w-3 rounded-full',
      wrapper: 'absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3',
    },
    item: {
      base: 'absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2',
      wrapper: {
        off: 'w-full flex-shrink-0 transform cursor-default snap-center',
        on: 'w-full flex-shrink-0 transform cursor-grab snap-center',
      },
    },
    control: {
      base: 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10',
      icon: 'h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6',
    },
    scrollContainer: {
      base: 'flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg',
      snap: 'snap-x',
    },
  },
  checkbox: {
    root: {
      ...theme.checkbox.root,
      base: 'h-4 w-4 rounded border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-cold-skyBlue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-cold-skyBlue-600',
    },
  },
  darkThemeToggle: {
    root: {
      base: 'rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700',
      icon: 'h-5 w-5',
    },
  },
  dropdown: {
    arrowIcon: 'ml-2 h-4 w-4',
    content: '',
    floating: {
      animation: 'transition-opacity',
      arrow: {
        base: 'absolute z-10 h-2 w-2 rotate-45',
        style: {
          dark: 'bg-gray-900 dark:bg-gray-700',
          light: 'bg-white',
          auto: 'bg-white dark:bg-gray-700',
        },
        placement: '-4px',
      },
      base: 'z-10 w-fit rounded-lg divide-y divide-gray-100 shadow !min-w-0',
      content: 'py-1 text-sm text-gray-700 dark:text-gray-200',
      divider: 'h-[1.5px] bg-bgc-accent',
      header: 'block py-2 px-4 text-sm text-gray-700 dark:text-gray-200',
      hidden: 'invisible opacity-0',
      item: {
        base: 'flex items-center justify-start py-4 px-4 text-white font-medium text-sm cursor-pointer w-full hover:bg-bgc-accent',
        icon: 'mr-2 h-4 w-4',
        container: '',
      },
      style: {
        dark: 'bg-gray-900 text-white dark:bg-gray-700',
        light: 'border border-bgc-accent bg-bgc-elevated',
        auto: 'border border-bgc-accent bg-bgc-elevated dark:border-none dark:bg-gray-700 dark:text-white',
      },
      target: 'w-fit',
    },
    inlineWrapper: 'flex items-center w-full',
  },
  fileInput: {
    root: {
      base: 'flex',
    },
    field: {
      base: 'relative w-full',
      input: {
        base: 'rounded-lg overflow-hidden block w-full border disabled:cursor-not-allowed disabled:opacity-50',
        sizes: {
          sm: 'sm:text-xs',
          md: 'text-sm',
          lg: 'sm:text-md',
        },
        colors: {
          gray: 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cold-skyBlue-500 focus:ring-cold-skyBlue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cold-skyBlue-500 dark:focus:ring-cold-skyBlue-500',
          info: 'border-cold-skyBlue-500 bg-cold-skyBlue-50 text-cold-skyBlue-900 placeholder-cold-skyBlue-700 focus:border-cold-skyBlue-500 focus:ring-cold-skyBlue-500 dark:border-cold-skyBlue-400 dark:bg-cold-skyBlue-100 dark:focus:border-cold-skyBlue-500 dark:focus:ring-cold-skyBlue-500',
          failure:
            'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500',
          warning:
            'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500',
          success:
            'border-cold-pineGreen-500 bg-cold-pineGreen-50 text-cold-pineGreen-900 placeholder-cold-pineGreen-700 focus:border-cold-pineGreen-500 focus:ring-cold-pineGreen-500 dark:border-cold-pineGreen-400 dark:bg-cold-pineGreen-100 dark:focus:border-cold-pineGreen-500 dark:focus:ring-cold-pineGreen-500',
        },
      },
    },
  },
  footer: {
    root: {
      base: 'w-full rounded-lg bg-white shadow dark:bg-gray-800 md:flex md:items-center md:justify-between',
      container: 'w-full p-6',
      bgDark: 'bg-gray-800',
    },
    groupLink: {
      base: 'flex flex-wrap text-sm text-gray-500 dark:text-white',
      link: {
        base: 'last:mr-0 md:mr-6',
        href: 'hover:underline',
      },
      col: 'flex-col space-y-4',
    },
    icon: {
      base: 'text-gray-500 dark:hover:text-white',
      size: 'h-5 w-5',
    },
    title: {
      base: 'mb-6 text-sm font-semibold uppercase text-gray-500 dark:text-white',
    },
    divider: {
      base: 'w-full my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8',
    },
    copyright: {
      base: 'text-sm text-gray-500 dark:text-gray-400 sm:text-center',
      href: 'ml-1 hover:underline',
      span: 'ml-1',
    },
    brand: {
      base: 'mb-4 flex items-center sm:mb-0',
      img: 'mr-3 h-8',
      span: 'self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white',
    },
  },
  helperText: {
    root: {
      base: 'mt-2 text-sm',
      colors: {
        gray: 'text-gray-500 dark:text-gray-400',
        info: 'text-cold-skyBlue-700 dark:text-cold-skyBlue-800',
        success: 'text-cold-pineGreen-600 dark:text-cold-pineGreen-500',
        failure: 'text-red-600 dark:text-red-500',
        warning: 'text-yellow-500 dark:text-yellow-600',
      },
    },
  },
  label: {
    root: {
      base: 'text-sm font-medium',
      disabled: 'opacity-50',
      colors: {
        default: 'text-gray-900 dark:text-gray-300',
        info: 'text-cold-skyBlue-500 dark:text-cold-skyBlue-600',
        failure: 'text-red-700 dark:text-red-500',
        warning: 'text-yellow-500 dark:text-yellow-600',
        success: 'text-cold-pineGreen-700 dark:text-cold-pineGreen-500',
      },
    },
  },
  listGroup: {
    root: {
      base: 'list-none rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-left',
    },
    item: {
      base: '[&>*]:first:rounded-t-lg [&>*]:last:rounded-b-lg [&>*]:last:border-b-0',
      link: {
        base: 'flex items-center w-full border-b border-gray-200 py-2 px-4 dark:border-gray-600',
        active: {
          off: 'hover:bg-gray-100 hover:text-cyan-700 focus:text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500',
          on: 'bg-cyan-700 text-white dark:bg-gray-800',
        },
        disabled: {
          off: '',
          on: 'hover:bg-gray-100 text-gray-900 hover:text-gray-900 focus:text-gray-900 bg-gray-100 cursor-not-allowed',
        },
        href: {
          off: '',
          on: '',
        },
        icon: 'mr-2 h-4 w-4 fill-current',
      },
    },
  },
  modal: {
    root: {
      base: 'fixed top-0 right-0 left-0 z-50 h-modal overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
      show: {
        on: 'flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80',
        off: 'hidden',
      },
      sizes: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
      },
      positions: {
        'top-left': 'items-start justify-start',
        'top-center': 'items-start justify-center',
        'top-right': 'items-start justify-end',
        'center-left': 'items-center justify-start',
        center: 'items-center justify-center',
        'center-right': 'items-center justify-end',
        'bottom-right': 'items-end justify-end',
        'bottom-center': 'items-end justify-center',
        'bottom-left': 'items-end justify-start',
      },
    },
    content: {
      base: 'relative h-full w-full m-auto md:h-auto rounded-2xl',
      inner: 'relative',
    },
    body: {
      base: 'p-6',
      popup: 'pt-0',
    },
    header: {
      base: 'flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5',
      popup: '!p-2 !border-b-0',
      title: 'text-xl font-medium text-gray-900 dark:text-white',
      close: {
        base: 'ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white',
        icon: 'h-5 w-5',
      },
    },
    footer: {
      base: 'flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600',
      popup: 'border-t',
    },
  },
  navbar: {
    root: {
      base: 'border-gray-200 bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4',
      rounded: {
        on: 'rounded',
        off: '',
      },
      bordered: {
        on: 'border',
        off: '',
      },
      inner: {
        base: 'mx-auto flex flex-wrap items-center justify-between',
        fluid: {
          on: '',
          off: 'container',
        },
      },
    },
    brand: {
      base: 'flex items-center',
    },
    collapse: {
      base: 'w-full md:block md:w-auto',
      list: 'mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium',
      hidden: {
        on: 'hidden',
        off: '',
      },
    },
    link: {
      base: 'block py-2 pr-4 pl-3 md:p-0',
      active: {
        on: 'bg-cold-skyBlue-700 text-white dark:text-white md:bg-transparent md:text-cold-skyBlue-700',
        off: 'border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cold-skyBlue-700 md:dark:hover:bg-transparent md:dark:hover:text-white',
      },
      disabled: {
        on: 'text-gray-400 hover:cursor-not-allowed dark:text-gray-600',
        off: '',
      },
    },
    toggle: {
      base: 'inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden',
      icon: 'h-6 w-6 shrink-0',
    },
  },
  pagination: {
    base: '',
    layout: {
      table: {
        base: 'text-sm text-gray-700 dark:text-gray-400',
        span: 'font-semibold text-gray-900 dark:text-white',
      },
    },
    pages: {
      base: 'xs:mt-0 mt-2 inline-flex items-center -space-x-px',
      showIcon: 'inline-flex',
      previous: {
        base: 'ml-0 rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
        icon: 'h-5 w-5',
      },
      next: {
        base: 'rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
        icon: 'h-5 w-5',
      },
      selector: {
        base: 'w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
        active: 'bg-cold-skyBlue-50 text-cold-skyBlue-600 hover:bg-cold-skyBlue-100 hover:text-cold-skyBlue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white',
        disabled: '',
      },
    },
  },
  progress: {
    base: 'w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
    label: 'mb-1 flex justify-between font-medium dark:text-white',
    bar: 'rounded-full text-center font-medium leading-none text-cyan-300 dark:text-cyan-100 space-x-2',
    color: {
      dark: 'bg-gray-600 dark:bg-gray-300',
      blue: 'bg-blue-600',
      red: 'bg-red-600 dark:bg-red-500',
      green: 'bg-green-600 dark:bg-green-500',
      yellow: 'bg-yellow-400',
      indigo: 'bg-indigo-600 dark:bg-indigo-500',
      purple: 'bg-purple-600 dark:bg-purple-500',
      cyan: 'bg-cyan-600',
      gray: 'bg-gray-500',
      lime: 'bg-lime-600',
      pink: 'bg-pink-500',
      teal: 'bg-teal-600',
    },
    size: {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-4',
      xl: 'h-6',
    },
  },
  radio: {
    root: {
      base: 'h-4 w-4 border border-gray-300 focus:ring-2 focus:ring-cold-skyBlue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:bg-cold-skyBlue-600 dark:focus:ring-cold-skyBlue-600',
    },
  },
  rangeSlider: {
    root: {
      base: 'flex',
    },
    field: {
      base: 'relative w-full',
      input: {
        base: 'w-full bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700',
        sizes: {
          sm: 'h-1 range-sm',
          md: 'h-2',
          lg: 'h-3 range-lg',
        },
      },
    },
  },
  rating: {
    root: {
      base: 'flex items-center',
    },
    star: {
      empty: 'text-gray-300 dark:text-gray-500',
      filled: 'text-yellow-400',
      sizes: {
        sm: 'w-5 h-5',
        md: 'w-7 h-7',
        lg: 'w-10 h-10',
      },
    },
  },
  ratingAdvanced: {
    base: 'flex items-center',
    label: 'text-sm font-medium text-cyan-600 dark:text-cyan-500',
    progress: {
      base: 'mx-4 h-5 w-2/4 rounded bg-gray-200 dark:bg-gray-700',
      fill: 'h-5 rounded bg-yellow-400',
      label: 'text-sm font-medium text-cyan-600 dark:text-cyan-500',
    },
  },
  select: {
    base: 'flex',
    addon:
      'inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400',
    field: {
      base: 'relative w-full',
      icon: {
        base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
        svg: 'h-5 w-5 text-gray-500 dark:text-gray-400',
      },
      select: {
        base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50',
        withIcon: {
          on: 'pl-10',
          off: '',
        },
        withAddon: {
          on: 'rounded-r-lg',
          off: 'rounded-lg',
        },
        withShadow: {
          on: 'shadow-sm dark:shadow-sm-light',
          off: '',
        },
        sizes: {
          sm: 'p-2 sm:text-xs',
          md: 'p-2.5 text-sm',
          lg: 'sm:text-md p-4',
        },
        colors: {
          gray: 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cold-skyBlue-500 focus:ring-cold-skyBlue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cold-skyBlue-500 dark:focus:ring-cold-skyBlue-500',
          info: 'border-cold-skyBlue-500 bg-cold-skyBlue-50 text-cold-skyBlue-900 placeholder-cold-skyBlue-700 focus:border-cold-skyBlue-500 focus:ring-cold-skyBlue-500 dark:border-cold-skyBlue-400 dark:bg-cold-skyBlue-100 dark:focus:border-cold-skyBlue-500 dark:focus:ring-cold-skyBlue-500',
          failure:
            'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500',
          warning:
            'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500',
          success:
            'border-cold-pineGreen-500 bg-cold-pineGreen-50 text-cold-pineGreen-900 placeholder-cold-pineGreen-700 focus:border-cold-pineGreen-500 focus:ring-cold-pineGreen-500 dark:border-cold-pineGreen-400 dark:bg-cold-pineGreen-100 dark:focus:border-cold-pineGreen-500 dark:focus:ring-cold-pineGreen-500',
        },
      },
    },
  },
  textInput: {
    base: 'flex',
    addon:
      'inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400',
    field: {
      base: 'relative w-full',
      icon: {
        base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
        svg: 'h-5 w-5 text-gray-500 dark:text-gray-400',
      },
      rightIcon: {
        base: 'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3',
        svg: 'h-5 w-5 text-gray-500 dark:text-gray-400',
      },
      input: {
        base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50',
        sizes: {
          sm: 'p-2 sm:text-xs',
          md: 'p-2.5 text-sm',
          lg: 'sm:text-md p-4',
        },
        colors: {
          gray: 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cold-skyBlue-500 focus:ring-cold-skyBlue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cold-skyBlue-500 dark:focus:ring-cold-skyBlue-500',
          info: 'border-cold-skyBlue-500 bg-cold-skyBlue-50 text-cold-skyBlue-900 placeholder-cold-skyBlue-700 focus:border-cold-skyBlue-500 focus:ring-cold-skyBlue-500 dark:border-cold-skyBlue-400 dark:bg-cold-skyBlue-100 dark:focus:border-cold-skyBlue-500 dark:focus:ring-cold-skyBlue-500',
          failure:
            'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500',
          warning:
            'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500',
          success:
            'border-cold-pineGreen-500 bg-cold-pineGreen-50 text-cold-pineGreen-900 placeholder-cold-pineGreen-700 focus:border-cold-pineGreen-500 focus:ring-cold-pineGreen-500 dark:border-cold-pineGreen-400 dark:bg-cold-pineGreen-100 dark:focus:border-cold-pineGreen-500 dark:focus:ring-cold-pineGreen-500',
        },
        withRightIcon: {
          on: 'pr-10',
          off: '',
        },
        withIcon: {
          on: 'pl-10',
          off: '',
        },
        withAddon: {
          on: 'rounded-r-lg',
          off: 'rounded-lg',
        },
        withShadow: {
          on: 'shadow-sm dark:shadow-sm-light',
          off: '',
        },
      },
    },
  },
  textarea: {
    base: 'block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50',
    colors: {
      gray: 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cold-skyBlue-500 focus:ring-cold-skyBlue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cold-skyBlue-500 dark:focus:ring-cold-skyBlue-500',
      info: 'border-cold-skyBlue-500 bg-cold-skyBlue-50 text-cold-skyBlue-900 placeholder-cold-skyBlue-700 focus:border-cold-skyBlue-500 focus:ring-cold-skyBlue-500 dark:border-cold-skyBlue-400 dark:bg-cold-skyBlue-100 dark:focus:border-cold-skyBlue-500 dark:focus:ring-cold-skyBlue-500',
      failure:
        'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500',
      warning:
        'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500',
      success:
        'border-cold-pineGreen-500 bg-cold-pineGreen-50 text-cold-pineGreen-900 placeholder-cold-pineGreen-700 focus:border-cold-pineGreen-500 focus:ring-cold-pineGreen-500 dark:border-cold-pineGreen-400 dark:bg-cold-pineGreen-100 dark:focus:border-cold-pineGreen-500 dark:focus:ring-cold-pineGreen-500',
    },
    withShadow: {
      on: 'shadow-sm dark:shadow-sm-light',
      off: '',
    },
  },
  toggleSwitch: {
    root: {
      base: 'group relative flex items-center rounded-lg focus:outline-none',
      active: {
        on: 'cursor-pointer',
        off: 'cursor-not-allowed opacity-50',
      },
      label: 'ml-3 text-sm font-medium text-gray-900 dark:text-gray-300',
    },
    toggle: {
      ...theme.toggleSwitch.toggle,
      base: 'toggle-bg h-6 w-11 rounded-full border group-focus:ring-4 group-focus:ring-cold-skyBlue-500/25',
      checked: {
        on: 'after:translate-x-full after:border-white',
        off: 'border-gray-200 bg-gray-200 dark:border-gray-600 dark:bg-gray-700',
        color: {
          blue: ' bg-cold-skyBlue-700 border-cold-skyBlue-700',
          dark: 'bg-dark-700 border-dark-900',
          failure: 'bg-red-700 border-red-900',
          gray: 'bg-gray-500 border-gray-600',
          green: 'bg-cold-pineGreen-600 border-cold-pineGreen-700',
          light: 'bg-light-700 border-light-900',
          red: 'bg-red-700 border-red-900',
          purple: 'bg-purple-700 border-purple-900',
          success: 'bg-cold-pineGreen-500 border-cold-pineGreen-500',
          yellow: 'bg-yellow-400 border-yellow-400',
          warning: 'bg-yellow-600 border-yellow-600',
          cyan: 'bg-cyan-500 border-cyan-500',
          lime: 'bg-lime-400 border-lime-400',
          indigo: 'bg-indigo-400 border-indigo-400',
          teal: 'bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4',
          info: 'bg-cold-skyBlue-600 border-cold-skyBlue-600',
          pink: 'bg-pink-600 border-pink-600',
        },
      },
    },
  },
  sidebar: {
    root: {
      base: '',
      collapsed: {
        on: 'w-16',
        off: 'w-[208px] min-w-[208px]',
      },
      // The calculation here locking the sidebar height assumes the padding around the site remains at 40px
      inner:
        'h-[calc(100vh-80px)] w-[208px] min-w-[208px] py-6 flex flex-col gap-6 bg-bgc-elevated rounded-2xl border-2 border-gray-30 fixed overflow-y-auto overflow-x-visible scrollbar-hide',
    },
    collapse: {
      button: 'w-full flex items-center pl-4 py-3 pr-2 hover:bg-bgc-accent fill-white stroke-white text-tc-primary text-sm font-bold gap-x-2 transition duration-75',
      icon: {
        base: 'h-6 w-6 transition duration-75',
        open: {
          off: '',
          on: '',
        },
      },
      label: {
        base: 'flex-1 whitespace-nowrap text-left',
        icon: {
          base: 'h-6 w-6',
          open: {
            on: '',
            off: '',
          },
        },
      },
      list: 'py-2',
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
      base: 'flex items-center pl-4 py-3 pr-2 hover:bg-bgc-accent fill-white stroke-white text-tc-primary text-sm font-semibold gap-x-2',
      active: 'bg-gray-50 hover:bg-gray-60 border-l-2 border-l-primary w-[calc(100%+2px)] shrink-sidebar-item',
      collapsed: {
        insideCollapse: 'group font-normal text-tc-secondary w-full pl-12 transition duration-75',
        noIcon: 'font-bold',
      },
      content: {
        base: 'flex-1 whitespace-nowrap',
      },
      icon: {
        base: 'h-6 w-6 flex-shrink-0 transition duration-75',
        active: '',
      },
      label: '',
      listItem: '',
    },
    items: {
      base: '',
    },
    itemGroup: {
      base: '',
    },
    logo: {
      base: 'mb-5 flex items-center pl-2.5',
      collapsed: {
        on: 'hidden',
        off: 'self-center whitespace-nowrap text-xl font-semibold dark:text-white',
      },
      img: 'mr-3 h-6 sm:h-7',
    },
  },
  spinner: {
    base: 'inline animate-spin text-gray-200',
    color: {
      failure: 'fill-red-600',
      gray: 'fill-gray-600',
      info: 'fill-cold-skyBlue-600',
      pink: 'fill-pink-600',
      purple: 'fill-purple-600',
      success: 'fill-cold-pineGreen-500',
      warning: 'fill-yellow-400',
    },
    light: {
      off: {
        base: 'dark:text-gray-600',
        color: {
          failure: '',
          gray: 'dark:fill-gray-300',
          info: '',
          pink: '',
          purple: '',
          success: '',
          warning: '',
        },
      },
      on: {
        base: '',
        color: {
          failure: '',
          gray: '',
          info: '',
          pink: '',
          purple: '',
          success: '',
          warning: '',
        },
      },
    },
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-10 h-10',
    },
  },
  tabs: {
    base: 'flex flex-col gap-2',
    tablist: {
      base: 'flex text-center',
      styles: {
        default: 'flex-wrap border-b border-gray-200 dark:border-gray-700',
        underline: 'flex-wrap -mb-px border-b border-gray-200 dark:border-gray-700',
        pills: 'flex-wrap font-medium text-sm text-gray-500 dark:text-gray-400 space-x-2',
        fullWidth: 'w-full text-sm font-medium divide-x divide-gray-200 shadow grid grid-flow-col dark:divide-gray-700 dark:text-gray-400 rounded-none',
      },
      tabitem: {
        base: 'flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:ring-4 focus:ring-cyan-300 focus:outline-none',
        styles: {
          default: {
            base: 'rounded-t-lg',
            active: {
              on: 'bg-gray-100 text-cyan-600 dark:bg-gray-800 dark:text-cyan-500',
              off: 'text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800  dark:hover:text-gray-300',
            },
          },
          underline: {
            base: 'rounded-t-lg',
            active: {
              on: 'text-cyan-600 rounded-t-lg border-b-2 border-cyan-600 active dark:text-cyan-500 dark:border-cyan-500',
              off: 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300',
            },
          },
          pills: {
            base: '',
            active: {
              on: 'rounded-lg bg-cyan-600 text-white',
              off: 'rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white',
            },
          },
          fullWidth: {
            base: 'ml-0 first:ml-0 w-full rounded-none flex',
            active: {
              on: 'p-4 text-gray-900 bg-gray-100 active dark:bg-gray-700 dark:text-white rounded-none',
              off: 'bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-none',
            },
          },
        },
        icon: 'mr-2 h-5 w-5',
      },
    },
    tabitemcontainer: {
      base: '',
      styles: {
        default: '',
        underline: '',
        pills: '',
        fullWidth: '',
      },
    },
    tabpanel: 'py-3',
  },
  table: {
    root: {
      base: 'w-full text-left text-sm text-gray-500 dark:text-gray-400 border-1 border-cold-fadeAwayGray bg-white',
      shadow: 'absolute bg-white dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10',
      wrapper: 'relative',
    },
    body: {
      base: 'group/body',
      cell: {
        base: 'group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg',
      },
    },
    head: {
      base: 'group/head text-xs uppercase px-0 py-0s',
      cell: {
        base: 'group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg',
      },
    },
    row: {
      base: 'group/row',
      hovered: 'hover:bg-gray-50 dark:hover:bg-gray-600',
      striped: 'odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700',
    },
  },
  timeline: {
    root: {
      direction: {
        horizontal: 'items-base sm:flex',
        vertical: 'relative border-l border-gray-200 dark:border-gray-700',
      },
    },
    item: {
      root: {
        horizontal: 'relative mb-6 sm:mb-0',
        vertical: 'mb-10 ml-6',
      },
      content: {
        root: {
          base: 'mt-3 sm:pr-8',
        },
        body: {
          base: 'mb-4 text-base font-normal text-gray-500 dark:text-gray-400',
        },
        time: {
          base: 'mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500',
        },
        title: {
          base: 'text-lg font-semibold text-gray-900 dark:text-white',
        },
      },
      point: {
        horizontal: 'flex items-center',
        line: 'hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex',
        marker: {
          base: {
            horizontal: 'absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700',
            vertical: 'absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700',
          },
          icon: {
            base: 'h-3 w-3 text-cyan-600 dark:text-cyan-300',
            wrapper: 'absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-200 ring-8 ring-white dark:bg-cyan-900 dark:ring-gray-900',
          },
        },
        vertical: '',
      },
    },
  },
  toast: {
    root: {
      base: 'flex w-full max-w-md items-center rounded-lg p-4',
      closed: 'opacity-0 ease-out',
    },
    toggle: {
      base: '-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white',
      icon: 'h-5 w-5 shrink-0',
    },
  },
  tooltip: {
    target: 'w-full',
    animation: 'transition-opacity',
    arrow: {
      base: 'absolute z-10 h-2 w-2 rotate-45',
      style: {
        dark: 'bg-gray-900 dark:bg-gray-700',
        light: 'bg-white',
        auto: 'bg-white dark:bg-gray-700',
      },
      placement: '-4px',
    },
    base: 'absolute inline-block z-10 rounded-lg py-2 px-3 text-sm font-medium shadow-sm',
    hidden: 'invisible opacity-0',
    style: {
      dark: '',
      light: '',
      auto: 'border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white',
    },
    content: 'relative z-20',
  },
  datepicker: {
    root: {
      base: 'relative',
    },
    popup: {
      root: {
        base: 'absolute top-10 z-50 block',
        inline: 'relative top-0 z-auto',
        inner: 'inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700',
      },
      header: {
        base: '',
        title: 'px-2 py-3 text-center font-semibold text-gray-900 dark:text-white',
        selectors: {
          base: 'flex justify-between mb-2',
          button: {
            base: 'text-sm rounded-lg text-bgc-accent dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-bgc-accent hover:text-white dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch',
            prev: '',
            next: '',
            view: '',
          },
        },
      },
      view: {
        base: 'p-1',
      },
      footer: {
        base: 'flex mt-2 space-x-2',
        button: {
          base: 'w-full rounded-lg px-5 py-2 text-center text-sm font-medium',
          today: 'bg-primary text-white hover:bg-primary-200 dark:bg-cyan-600 dark:hover:bg-cyan-700',
          clear: 'border border-gray-300 bg-white text-gray-900 hover:bg-bgc-accent hover:text-white dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
        },
      },
    },
    views: {
      days: {
        header: {
          base: 'grid grid-cols-7 mb-1',
          title: 'dow h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400',
        },
        items: {
          base: 'grid w-64 grid-cols-7',
          item: {
            base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-primary-100 dark:text-white dark:hover:bg-gray-600 ',
            selected: 'bg-primary text-white hover:bg-primary-200',
            disabled: 'text-gray-500',
          },
        },
      },
      months: {
        items: {
          base: 'grid w-64 grid-cols-4',
          item: {
            base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-bgc-accent hover:text-white dark:text-white dark:hover:bg-gray-600',
            selected: 'bg-primary text-white hover:bg-primary-200',
            disabled: 'text-gray-500',
          },
        },
      },
      years: {
        items: {
          base: 'grid w-64 grid-cols-4',
          item: {
            base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 hover:bg-bgc-accent hover:text-white dark:text-white dark:hover:bg-gray-600 text-gray-900',
            selected: 'bg-primary text-white hover:primary-200',
            disabled: 'text-gray-500',
          },
        },
      },
      decades: {
        items: {
          base: 'grid w-64 grid-cols-4',
          item: {
            base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900',
            selected: 'bg-primary text-white hover:bg-primary-200',
            disabled: 'text-gray-500',
          },
        },
      },
    },
  },
};

export default flowbiteThemeOverride;
