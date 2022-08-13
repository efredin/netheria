import React, { ReactElement } from 'React';
import { Box, Container, List, ListItemButton, ListItemIcon, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import * as Icons from '@mui/icons-material';
import OctoIcon from '../images/OctoML.png';
import { SvgIconComponent } from "@mui/icons-material";

interface Route {
  title: string;
  href: string;
  icon: ReactElement<SvgIconComponent>;
}

const routes: Route[] = [
  {
    title: 'Home',
    href: '/',
    icon: <Icons.Home />
  },
  {
    title: 'Octomize',
    href: '/octomize',
    icon: <Icons.BarChart />
  }
];

const Page = ({ children }: React.PropsWithChildren) => {
  return (
    <Box sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'auto'
      }}>
      <Paper square elevation={3}>
        <Box sx={{ my:2, mx: 'auto', width: '20px' }}>
          <Link to="/">
            <img src={OctoIcon} width="20px" />
          </Link>
        </Box>
        <List>
          {routes.map(({ title, href, icon }) => (
            <ListItemButton
              key={title}
              title={title}
              to={href}
              // use spread as workaround for broken typings https://github.com/mui/material-ui/issues/33799
              {...{component: Link}}
            >
              <ListItemIcon sx={{ my: 2, minWidth: 0 }}>
                {icon}
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Paper>
      <Container>
        {children}
      </Container>
    </Box>
  );
};

export default Page;
