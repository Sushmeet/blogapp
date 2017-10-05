'use strict';
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect("mongodb://localhost/restful_blog_app", {
  useMongoClient: true
});

// blog app will contain
// title , desc, image, created at date

// App Config
// middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose/Model config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  createdAt: { type: Date, default: Date.now },
});

var blog = mongoose.model("blog", blogSchema);

// blog.create(
//   {
//     title: "Test Blog",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE4bVLgh_5P8esGzn016ByN3IyjNSqmLalzVm2NXOq32FtMJy0Wg",
//     body: "This is a Blog Post"
//   },
//   (err, blogEntry) => {
//     console.log(blogEntry);
//   }
// );

// Resful Routes

app.get('', (req, res) => {
  res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
  blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render('index', { blogs: blogs });
    }
  })
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
