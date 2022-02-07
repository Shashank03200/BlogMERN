const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

const tokens = {
  accessToken,
  refreshToken,
};

export default tokens;
