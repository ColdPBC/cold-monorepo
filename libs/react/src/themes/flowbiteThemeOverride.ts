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
        text: 'font-medium text-white',
        base: 'inline-flex overflow-hidden relative justify-center items-center bg-black',
      },
    },
    group: {
      base: 'flex -space-x-4',
    },
    groupCounter: {
      base: 'relative flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full ring-2 ring-gray-300 hover:bg-gray-600 dark:ring-gray-500',
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
  spinner: {
    base: 'inline animate-spin text-gray-200',
    color: {
      failure: 'fill-red-600',
      gray: 'fill-gray-600',
      info: 'fill-cyan-600',
      pink: 'fill-pink-600',
      purple: 'fill-purple-600',
      success: 'fill-green-500',
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
      base: 'w-full text-left text-sm text-gray-500 dark:text-gray-400 border-1 border-gray bg-white',
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
