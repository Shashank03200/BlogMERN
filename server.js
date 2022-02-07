require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("./helpers/init_mongoose");
require("./helpers/redis_init");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/comments", commentRouter);

// Error logger middleware

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      success: err.status === 200,
      msg: err.message,
      data: undefined,
    },
  });
});

app.listen(PORT, () => {
  console.log("Server started on port : ", PORT);
});
