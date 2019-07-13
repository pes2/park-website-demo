const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
const PORT = 3000;

let blogPosts = [];

app.set("view engine", "ejs");

app.use("/", express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/blog", (req, res) => {
  fs.readFile("./blog-posts.txt", "utf-8", (err, file) => {
    if (err) console.log(err);
    else {
      blogPosts = JSON.parse(file);
    }

    res.render("blog", {
      posts: blogPosts
    });
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.blogTitle,
    content: req.body.blogBody,
    comments: []
  };

  blogPosts.push(post);

  saveBlogPosts();

  res.redirect("/blog");
});

app.get("/posts/:postName", function(req, res) {
  const requestedTitle = req.params.postName;

  blogPosts.forEach(function(post) {
    if (_.lowerCase(post.title) === _.lowerCase(requestedTitle)) {
      res.render("post", {
        title: post.title,
        content: post.content,
        comments: post.comments
      });
    }
  });
});

app.post("/posts/:postName", function(req, res) {
  const requestedTitle = req.params.postName;
  const comment = req.body.comment;

  blogPosts.forEach(function(post) {
    if (_.lowerCase(post.title) === _.lowerCase(requestedTitle)) {
      post.comments.push(comment);
    }
  });

  saveBlogPosts();
  res.redirect("/posts/" + requestedTitle);
});

app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
});

function saveBlogPosts() {
  let jsonData = JSON.stringify(blogPosts);

  fs.writeFile("blog-posts.txt", jsonData, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

// function htmlEscape(str) {
// 	return String(str)
// 		.replace(/&/g, '&amp;')
// 		.replace(/"/g, '&quot;')
// 		.replace(/'/g, '&#39;')
// 		.replace(/</g, '&lt;')
// 		.replace(/>/g, '&gt;');
// }
