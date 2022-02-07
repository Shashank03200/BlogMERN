import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function SideDrawer(props) {
  const categoriesList = props.categories;

  return (
    <Drawer
      anchor="left"
      open={props.open}
      onClose={props.handleClose}
      sx={{
        display: { xs: "block", md: "none" },
      }}
    >
      <Box
        sx={{
          width: 300,
        }}
      >
        <List>
          {categoriesList.map((category, index) => {
            return (
              <ListItem button key={category}>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary={category} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}

export default SideDrawer;
