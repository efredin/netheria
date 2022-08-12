import React from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Link, LinkProps } from 'react-router-dom';
import { green, grey } from '@mui/material/colors';

const LinkBehavior = React.forwardRef<any, Omit<LinkProps, 'to'> & { href: LinkProps['to'] }>((props, ref) => {
  const { href, ...other } = props;
  return <Link ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: green[700]
    },
    secondary: {
      main: grey[50]
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior // type defs fail here
      }
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: (props: any) => ({
          position: 'relative',
          transform: 'none',
          marginBottom: props.theme.spacing(0.5),
          fontSize: props.theme.typography.fontSize + 1,
          fontWeight: 700
        })
      }
    }
  }
} as any);

const ThemeProvider = ({ children }: React.PropsWithChildren<unknown>) => (
  <MuiThemeProvider theme={theme}>
    {children}
  </MuiThemeProvider>
);

export default ThemeProvider;
