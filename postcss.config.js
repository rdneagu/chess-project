export default {
  plugins: {
    'postcss-nesting': {},
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '576px',
        'mantine-breakpoint-sm': '640px',
        'mantine-breakpoint-md': '768px',
        'mantine-breakpoint-lg': '1024px',
        'mantine-breakpoint-xl': '1280px',
        'mantine-breakpoint-2xl': '1536px',
      },
    },
  },
};
