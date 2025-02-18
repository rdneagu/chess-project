import { Alert, Button, Card, colorsTuple, createTheme, InputWrapper, MantineColorsTuple, rem } from '@mantine/core';
import colors from 'tailwindcss/colors';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import alertClasses from './alert.module.css';
import buttonClasses from './button.module.css';
import cardClasses from './card.module.css';
import inputWrapperClasses from './input-wrapper.module.css';

const primary: MantineColorsTuple = ['#e1faff', '#cdf0ff', '#9fdefa', '#6dccf6', '#46bcf3', '#2cb2f1', '#17adf1', '#0098d7', '#0087c2', '#0075ac'];

export default createTheme({
  primaryColor: 'primary',
  colors: {
    primary,
    secondary: colorsTuple(colors.zinc['400']),
  },
  breakpoints: {
    xs: '576px', // 576px
    sm: '640px', // 640px
    md: '768px', // 768px
    lg: '1024px', // 1024px
    xl: '1280px', // 1280px
    '2xl': '1536px', // 1536px
  },
  fontSizes: {
    xs: rem(10),
    sm: rem(12),
    md: rem(14),
    lg: rem(16),
    xl: rem(20),
  },
  spacing: {
    nbsp: '0.25rem',
    'table-cell': '0.25rem',
    'details-gap': '0.25rem',
  },
  cursorType: 'pointer',
  components: {
    Alert: Alert.extend({ classNames: alertClasses }),
    Button: Button.extend({ classNames: buttonClasses }),
    Card: Card.extend({ classNames: cardClasses }),
    InputWrapper: InputWrapper.extend({ classNames: inputWrapperClasses }),
  },
  fontFamily: 'Poppins, sans-serif',
});
