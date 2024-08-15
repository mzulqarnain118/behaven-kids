import { Drawer, Typography, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MuiIcon from "./MuiIcon";

export default function SidePanel({
  width,
  title,
  children,
  openPanel,
  anchor,
  setPanel,
}: any) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const drawerPaperStyles = {
    width: isMobile ? "100vw" : width || "30.71vw",
    padding: "2.4rem 2.5rem",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Dark black shadow
  };

  return (
    <Drawer
      anchor={anchor ?? "right"}
      open={openPanel}
      onClose={() => {
        setPanel(!openPanel);
      }}
      PaperProps={{ style: drawerPaperStyles }} // Pass styles directly to PaperProps
      ModalProps={{
        keepMounted: true,
      }}
      variant={isMobile ? "temporary" : "persistent"}
    >
      <div className="row-end" style={{ position: "relative" }}>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <MuiIcon
          onClick={() => {
            setPanel && setPanel(!openPanel);
          }}
          name="Close"
        />
      </div>
      <Box>{children}</Box>
    </Drawer>
  );
}
