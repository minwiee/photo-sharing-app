const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const session = require('express-session');
const Photo = require("./db/photoModel");
// const CommentRouter = require("./routes/CommentRouter");

dbConnect();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // replace with the origin of your client app
  credentials: true,
}));
app.use(cookieParser("keyboard cat"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      maxAge: 60 * 30, 
    },
  })
);

app.use("/api/user", UserRouter);
app.use("/api/photo", PhotoRouter);
app.use("/api/comment/commentsOfPhoto/:id", async (request, response) => {
  // console.log(request.session.user)
  try {
    const id = request.params.id;
    const comments = await Photo.find({ _id: id }).populate("comments.user_id");
    response.send(comments);
  } catch (error) {
    response.status(500).send({ error });
  }

});

app.get("/", (request, response) => {
  response.send({ message: "Hello from photo-sharing app API!" });
});
// console.log(app.session.user);
app.listen(8081, () => {
  console.log("server listening on port 8081");
});
