import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    List,
    
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Drawer,
    Divider,
    styled,
    Collapse,
    ListSubheader,
    
  } from "@mui/material";
  
  import MenuIcon from "@mui/icons-material/Menu";
  import { useState } from "react";
  import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
  import MopedIcon from "@mui/icons-material/Moped";
  import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
  import ExpandLessIcon from "@mui/icons-material/ExpandLess";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import HomeIcon from '@mui/icons-material/Home';
  import CategoryIcon from '@mui/icons-material/Category';
  import ListIcon from '@mui/icons-material/List';
  
  function NavBarComponent() {
    const [open, setOpen] = useState(false);
    const [collapsed, setCollpased] = useState(false);
    const toggleDrawer = (newOpen) => () => {
      console.log(newOpen);
      setOpen(newOpen);
    };
    const DrawerHeader = styled("div")(({ theme }) => ({
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      background: "#3F51B5",
      color: "#000",
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-start",
    }));
    const handleClick = () => {
      setCollpased(!collapsed);
    };
  
    return (
      <>
        <Box sx={{ p: 0, m: 0 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 1, p: 0, mt: 0, mb: 0 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                APSS RectJS Client
              </Typography>
              <Button href="/" color="inherit">
                Home
              </Button>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Box role="presentation" sx={{ width: 256 }}>
            {
              <DrawerHeader color="primary">
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, color: "white" }}
                >
                  APSS Menu
                </Typography>
              </DrawerHeader>
            }
            <Divider />
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="Parts & Service"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Nested List Items
                </ListSubheader>
              }
            >
              <ListItemButton component='a' href="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
              <ListItemButton component='a' href="/ServiceRequests">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="ServiceRequest" />
              </ListItemButton>
              <ListItemButton component='a' href="/OrderList">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Order" />
              </ListItemButton>
              <ListItemButton component='a' href="/Categories" >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Product Category" />
              </ListItemButton>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <DirectionsBikeIcon />
                </ListItemIcon>
                <ListItemText primary="Bikes" />
                {collapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>
              <Collapse in={collapsed} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} href="/Bikes">
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Part List" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <MopedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Parts" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </Box>
        </Drawer>
      </>
    );
  }
  
  export default NavBarComponent;
  