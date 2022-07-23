const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./route/users/usersRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const postRoute = require("./route/posts/postRoute");
const commentRoutes = require("./route/comments/commentRoute");
const emailMsgRoute = require("./route/emailMsg/emailMsgRoute");
const categoryRoute = require("./route/category/categoryRoute");

const path = require ('path')

const app = express();
//DB
dbConnect();

// app.get("/", (req, res) => {
//   res.json({ msg: "API for blog Application..." });
// });
//Middleware
app.use(express.json());
//cors
app.use(cors());
//Users route
app.use("/api/users", userRoutes);
//Post route
app.use("/api/posts", postRoute);
//comment routes
app.use("/api/comments", commentRoutes);
//email msg
app.use("/api/email", emailMsgRoute);
//category route
app.use("/api/category", categoryRoute);

// ---------------------Deployment-------------------------- //

// preparing for deployment

// // a solution for using dirname when using es modules in nodeJS
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


if (process.env.NODE_ENV === 'production'){
app.use(express.static(path.join(__dirname, "../frontend/build")))

app.get("*", (req,res)=>{
  res.sendFile(path.resolve(__dirname,"..","frontend","build","index.html"))
})

}else{
  app.get("/", async (req, res) => {
    res.send("Hello from server side :D"); // just as a test for backend
  });
}




//err handler
app.use(notFound);
app.use(errorHandler);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running ${PORT}`));

//
