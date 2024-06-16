import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '/anstimmen-tutor-logo.svg';
import { appName, pages } from './constants.ts';

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar sx={{ backgroundColor: 'grey' }} position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* pop up menu for small screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <RouterLink key={page.title} to={page.path}>
                    {page.title}
                  </RouterLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* title */}
          <Link href="https://pibebtol.github.io/cicd-react-test/">
            <Box
              component="img"
              sx={{
                display: { xs: 'flex', md: 'flex' },
                height: '60px',
                width: '60px',
              }}
              alt="logo"
              src={logo}
            />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="https://pibebtol.github.io/cicd-react-test/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              '&:hover': { color: 'white' },
              textDecoration: 'none',
            }}
          >
            {appName}
          </Typography>

          {/* nav bar items for normal screens */}
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'end',
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {pages.map((page) => (
              <RouterLink key={page.title} to={page.path}>
                <Typography
                  component="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'flex' },
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: 'white',
                    '&:hover': { color: 'white' },
                    textDecoration: 'none',
                  }}
                >
                  {page.title}
                </Typography>
              </RouterLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
