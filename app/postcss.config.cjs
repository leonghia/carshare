module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '23.375em', // 374px
        'mantine-breakpoint-sm': '39.9375em', // 639px
        'mantine-breakpoint-md': '47.9375em', // 767px
        'mantine-breakpoint-lg': '63.9375em', // 1023px
        'mantine-breakpoint-xl': '79.9375em', // 1279px
        'mantine-breakpoint-2xl': '95.9375em', // 1535px
      },
    },
  },
};
