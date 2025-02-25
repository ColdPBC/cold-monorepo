const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { themeColors, fontSizes } = require('../../libs/react/src/themes');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'), ...createGlobPatternsForDependencies(__dirname)],
	theme: {
		extend: {
			colors: {
				...themeColors(),
			},
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
			},
			fontSize: {
				...fontSizes(),
			},
			screens: {
				shortScreen: { raw: '(max-height: 1200px)' },
				shortWideScreen: {
					raw: '(max-height: 1200px) and (min-width: 1800px)',
				},
			},
			typography: {
				DEFAULT: {
					css: {
						h1: {
							fontSize: fontSizes().h1[0],
							lineHeight: fontSizes().h1[1].lineHeight,
							fontWeight: fontSizes().h1[1].fontWeight,
						},
						h2: {
							fontSize: fontSizes().h2[0],
							lineHeight: fontSizes().h2[1].lineHeight,
							fontWeight: fontSizes().h2[1].fontWeight,
						},
						h3: {
							fontSize: fontSizes().h3[0],
							lineHeight: fontSizes().h3[1].lineHeight,
							fontWeight: fontSizes().h3[1].fontWeight,
						},
						h4: {
							fontSize: fontSizes().h4[0],
							lineHeight: fontSizes().h4[1].lineHeight,
							fontWeight: fontSizes().h4[1].fontWeight,
						},
						h5: {
							fontSize: fontSizes().h5[0],
							lineHeight: fontSizes().h5[1].lineHeight,
							fontWeight: fontSizes().h5[1].fontWeight,
						},
						p: {
							fontSize: fontSizes().body[0],
							lineHeight: fontSizes().body[1].lineHeight,
							fontWeight: fontSizes().body[1].fontWeight,
              marginTop: '0',
              marginBottom: '0',
            },
            div: {
              fontSize: fontSizes().body[0],
              lineHeight: fontSizes().body[1].lineHeight,
              fontWeight: fontSizes().body[1].fontWeight,
              marginTop: '0',
              marginBottom: '0',
            },
            span: {
              fontSize: fontSizes().body[0],
              lineHeight: fontSizes().body[1].lineHeight,
              fontWeight: fontSizes().body[1].fontWeight,
            },
						strong: {
							fontSize: fontSizes().body[0],
							lineHeight: fontSizes().body[1].lineHeight,
						},
						a: {
							fontSize: fontSizes().body[0],
							lineHeight: fontSizes().body[1].lineHeight,
							fontWeight: fontSizes().body[1].fontWeight,
						},
						li: {
							fontSize: fontSizes().body[0],
							lineHeight: fontSizes().body[1].lineHeight,
							fontWeight: fontSizes().body[1].fontWeight,
              marginTop: '0 !important',
              marginBottom: '0 !important',
            },
            // Remove top margin from the first <p> in <li> elements
            'ol > li > p:first-child': {
              marginTop: '0',
            },
            // Optionally, adjust the bottom margin
            'ol > li > p:last-child': {
              marginBottom: '0',
            },
            // Repeat for unordered lists if needed
            'ul > li > p:first-child': {
              marginTop: '0',
            },
            'ul > li > p:last-child': {
              marginBottom: '0',
            },
            'ol, ul': {
              marginTop: '0 !important',
              marginBottom: '0 !important',
            },
            maxWidth: '100%',
						'--tw-prose-body': themeColors().tc.primary,
						'--tw-prose-headings': themeColors().tc.primary,
						'--tw-prose-lead': themeColors().tc.primary,
						'--tw-prose-links': themeColors().tc.primary,
						'--tw-prose-bold': themeColors().tc.primary,
						'--tw-prose-counters': themeColors().tc.primary,
						'--tw-prose-bullets': themeColors().tc.primary,
						'--tw-prose-hr': themeColors().tc.primary,
						'--tw-prose-quotes': themeColors().tc.primary,
						'--tw-prose-quote-borders': themeColors().tc.primary,
						'--tw-prose-captions': themeColors().tc.primary,
						'--tw-prose-code': themeColors().tc.primary,
						'--tw-prose-pre-code': themeColors().tc.primary,
						'--tw-prose-pre-bg': themeColors().tc.primary,
						'--tw-prose-th-borders': themeColors().tc.primary,
						'--tw-prose-td-borders': themeColors().tc.primary,
						'--tw-prose-invert-body': themeColors().tc.primary,
						'--tw-prose-invert-headings': themeColors().tc.primary,
						'--tw-prose-invert-lead': themeColors().tc.primary,
						'--tw-prose-invert-links': themeColors().tc.primary,
						'--tw-prose-invert-bold': themeColors().tc.primary,
						'--tw-prose-invert-counters': themeColors().tc.primary,
						'--tw-prose-invert-bullets': themeColors().tc.primary,
						'--tw-prose-invert-hr': themeColors().tc.primary,
						'--tw-prose-invert-quotes': themeColors().tc.primary,
						'--tw-prose-invert-quote-borders': themeColors().tc.primary,
						'--tw-prose-invert-captions': themeColors().tc.primary,
						'--tw-prose-invert-code': themeColors().tc.primary,
						'--tw-prose-invert-pre-code': themeColors().tc.primary,
						'--tw-prose-invert-pre-bg': themeColors().tc.primary,
						'--tw-prose-invert-th-borders': themeColors().tc.primary,
						'--tw-prose-invert-td-borders': themeColors().tc.primary,
					},
				},
				sm: {
					css: {
						p: {
							fontSize: fontSizes().caption[0],
							lineHeight: fontSizes().caption[1].lineHeight,
							fontWeight: fontSizes().caption[1].fontWeight,
						},
						li: {
							fontSize: fontSizes().caption[0],
							lineHeight: fontSizes().caption[1].lineHeight,
							fontWeight: fontSizes().caption[1].fontWeight,
						},
						strong: {
							fontSize: fontSizes().caption[0],
							lineHeight: fontSizes().caption[1].lineHeight,
						},
						a: {
							fontSize: fontSizes().caption[0],
							lineHeight: fontSizes().caption[1].lineHeight,
							fontWeight: fontSizes().caption[1].fontWeight,
						},
					},
				},
			},
			keyframes: {
				progressBar: {
					'0%': { width: '0%' },
					'50%': { width: '50%' },
					'100%': { width: '100%' },
				},
				pulsate: {
					// use opacity ahd brightness
					'0%': { opacity: '1', filter: 'brightness(100%)' },
					'50%': { opacity: '0.5', filter: 'brightness(150%)' },
					'100%': { opacity: '1', filter: 'brightness(100%)' },
				},
        'bounce-gradient': {
          '0%, 100%': {
            transform: 'translateY(-50%)',
            'background-position': '0% 50%',
          },
          '50%': {
            transform: 'translateY(0)',
            'background-position': '100% 50%',
          },
        },
      },
			animation: {
				progressBar: 'progressBar 2s linear infinite',
				pulsate: 'pulsate 2s linear infinite',
        'bounce-gradient': 'bounce-gradient 1.5s infinite',
      },
      backgroundSize: {
        '200%': '200%',
      },
    },
		minHeight: theme => ({
			...theme('spacing'),
		}),
		minWidth: theme => ({
			...theme('spacing'),
		}),
		transitionProperty: {
			height: 'height',
			width: 'width',
		},
	},
	plugins: [require('flowbite/plugin'), require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
