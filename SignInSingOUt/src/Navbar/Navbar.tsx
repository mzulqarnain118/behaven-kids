import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Refresh as RefreshIcon,
  EscalatorWarningOutlined,
  NaturePeopleOutlined,
  ChecklistRtlOutlined,
  Groups2Outlined,
  MeetingRoomOutlined,
  LinkOutlined,
  PeopleOutlined,
  SupervisedUserCircleOutlined,
  Fullscreen as FullscreenIcon,
  ExitToApp as LogoutIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import BehavenLogo from "../assets/BehavenLogo.jpg";
import Controls from "../Components/common";

interface DecodedToken {
  role: string;
}

interface NavItem {
  text: string;
  path: string;
  icon: React.ReactElement;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    text: "Refresh",
    path: "/PhoneNumber",
    icon: <RefreshIcon />,
    roles: ["parent", "floor", "rbt", "tor"],
  },
  {
    text: "Add New Parent",
    path: "/AddParentInfo",
    icon: <EscalatorWarningOutlined />,
    roles: ["admin"],
  },
  {
    text: "Make Clients Active",
    path: "/MakeClientCurrent",
    icon: <NaturePeopleOutlined />,
    roles: ["admin"],
  },
  {
    text: "Connect Parents To Client(s)",
    path: "/ConnectParentAndChildTogeter",
    icon: <LinkOutlined />,
    roles: ["admin"],
  },
  {
    text: "Client In/Out/No show",
    path: "/ClientInOutNoShow",
    icon: <MeetingRoomOutlined />,
    roles: ["admin"],
  },
  {
    text: "SDP Panel",
    path: "/SdpPanel",
    icon: <RefreshIcon />,
    roles: ["admin"],
  },
  {
    text: "ABA Panel",
    path: "/AbaPanel",
    icon: <RefreshIcon />,
    roles: ["admin"],
  },
  {
    text: "CMS",
    path: "/cms",
    icon: <SupervisedUserCircleOutlined />,
    roles: ["admin"],
  },
  {
    text: "Staff",
    path: "/staff",
    icon: <Groups2Outlined />,
    roles: ["admin"],
  },
  {
    text: "Check Parents Temporary Pin",
    path: "/ReceptionistGivesTemporaryPinToParent",
    icon: <ChecklistRtlOutlined />,
    roles: ["admin", "secretary"],
  },
  {
    text: "Sign In/Out Management",
    path: "/EditChildTime",
    icon: <PeopleOutlined />,
    roles: ["admin", "secretary"],
  },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showNavbar, setShowNavbar] = useState(true);
  const [role, setRole] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const setRoleFromToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token) as DecodedToken;
      setRole(decoded.role);
    } else {
      console.log("Token not found");
    }
  }, []);

  useEffect(() => {
    setRoleFromToken();
  }, [setRoleFromToken]);

  const handleNavigation = useCallback(
    (path: string) => {
      navigate(path);
      setIsDrawerOpen(false);
    },
    [navigate]
  );

  const handleSignOut = useCallback(() => {
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));

    navigate("/login");
  }, [handleNavigation]);

  const handleGoFullScreen = useCallback(() => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
      setShowNavbar(false);
    }
    setIsDrawerOpen(false);
  }, []);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };

  const renderNavItems = () => {
    return navItems
      .filter((item) => item.roles.includes(role))
      .map((item, index) => (
        <ListItem
          button
          key={index}
          onClick={() => handleNavigation(item.path)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ));
  };

  const renderBackButton = () => {
    const backPaths = [
      "ParentsPin",
      "ChooseWhichChildren",
      "ValidateEmailAddress",
      "ValidateTemporaryPin",
      "ResetPin",
      "ssnpin",
    ];
    if (backPaths.some((path) => location.pathname.includes(path))) {
      return (
        <IconButton
          edge="start"
          color="inherit"
          onClick={() =>
            handleNavigation(
              role === "parent" ? "/PhoneNumber" : "/timeoutselectaclient"
            )
          }
        >
          <ArrowBackIcon />
        </IconButton>
      );
    }
    return null;
  };

  if (!showNavbar) return null;

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
      <Toolbar>
        {renderBackButton()}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Behaven Kids
        </Typography>
        {!isMobile && (
          <img
            src={BehavenLogo}
            alt="Behaven Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
        )}
      </Toolbar>
      <Drawer
        anchor={isMobile ? "top" : "left"}
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <div
          className="row-end"
          style={{ position: "relative", padding: "1rem" }}
        >
          <Typography
            variant="h6"
            component="div"
            style={{ flexGrow: 1 }}
          ></Typography>
          <Controls.MuiIcon
            onClick={() => setIsDrawerOpen(false)}
            name="Close"
          />
        </div>
        <List>
          {renderNavItems()}
          <ListItem button onClick={handleGoFullScreen}>
            <ListItemIcon>
              <FullscreenIcon />
            </ListItemIcon>
            <ListItemText primary="Full Screen" />
          </ListItem>
          <ListItem button onClick={handleSignOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
