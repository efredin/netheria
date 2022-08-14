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
      main: '#0180FF'
    },
    background: {
      default: '#f9f9f9'
    }
  },
  typography: {
    fontFamily: 'Inter'
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
    }
  }
} as any);

export const ThemeProvider = ({ children }: React.PropsWithChildren<unknown>) => (
  <MuiThemeProvider theme={theme}>
    {children}
  </MuiThemeProvider>
);
