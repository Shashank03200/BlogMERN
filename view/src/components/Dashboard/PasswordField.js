import { IconButton, InputAdornment, TextField } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
function PasswordField(props) {
  console.log(props);

  return (
    <TextField
      variant="outlined"
      size={props.size}
      placeholder={props.placeholder}
      name={props.name}
      type={props.showPassword ? "text" : "password"}
      required
      fullWidth
      margin="dense"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={props.onPasswordVisibilityToggle}
              onMouseDown={props.onPasswordVisibilityToggle}
              edge="end"
            >
              {props.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordField;
