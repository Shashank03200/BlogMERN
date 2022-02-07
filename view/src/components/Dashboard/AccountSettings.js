import ChangePassword from "./ChangePassword";
import { Box } from "@mui/system";
import DeleteAccount from "./DeleteAccount";
import { Typography } from "@mui/material";

function AccountSettings() {
  return (
    <Box
      sx={{
        padding: "4px",
        marginY: "18px",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "24px" }}>
        Security
      </Typography>
      <Box>
        <ChangePassword />
        <DeleteAccount />
      </Box>
    </Box>
  );
}

export default AccountSettings;
