var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");

//var indexRouter = require("./routes/index");
//var usersRouter = require("./routes/users");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let userArray = [];
let commentArray = [];
const dinos = [
  "Barosaurus",
  "Ceratopsia",
  "Diplodocus",
  "Allosaurus",
  "Carnotaurus",
  "Deinonychus",
  "Abrictosaurus",
  "Ajacingenie",
  "Gallimimus"
];

function countFavoriteSite(site, userId) {
  const userIndex = userArray
    .map(function (e) {
      return e.userId;
    })
    .indexOf(userId);
  if (userIndex !== -1) {
    switch (site) {
      case "main":
        userArray[userIndex].mostVisitedContent.main++;
        break;
      case "dinolist":
        userArray[userIndex].mostVisitedContent.dinolist++;
        break;
      case "period":
        userArray[userIndex].mostVisitedContent.period++;
        break;
      case "forum":
        userArray[userIndex].mostVisitedContent.forum++;
        break;
      default:
        break;
    }
  }
}

function setCookieIfNotAlreadySet(req, res) {
  const userId = req.cookies.userId;
  if (!userId) {
    const newUserId = uuidv4();
    var farFuture = new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 10
    ); // ~10y
    res.cookie("userId", newUserId, { expires: farFuture });
    userArray.push({
      userId: newUserId,
      mostVisitedContent: { main: 0, dinolist: 0, period: 0, forum: 0 },
      favorites: []
    });
  } else {
    const userIndex = findUserIndex(userId);
    if (userIndex === -1) {
      userArray.push({
        userId: userId,
        mostVisitedContent: { main: 0, dinolist: 0, period: 0, forum: 0 },
        favorites: []
      });
    }
  }
}

function findUserIndex(userId) {
  return userArray
    .map(function (e) {
      return e.userId;
    })
    .indexOf(userId);
}

app.get("/", function (req, res) {
  setCookieIfNotAlreadySet(req, res);
  const userId = req.cookies.userId;
  countFavoriteSite("main", userId);
  res.sendFile(path.join(__dirname + "/frontend/public/index.html"));
});

app.get("/user", function (req, res) {
  const userId = req.cookies.userId;
  const userIndex = findUserIndex(userId);
  res.send(userArray[userIndex]);
});

app.get("/getAllComments", function (req, res) {
  res.send(commentArray);
});

app.post("/comment", function (request, response) {
  commentArray.push({
    userId: request.body.userId,
    comment: request.body.comment
  });
});

app.post("/setFavourite", function (req, res) {
  setCookieIfNotAlreadySet(req, res);
  console.log("Value: " + req.body.value);
  console.log("Index: " + req.body.index);

  userArray[findUserIndex(req.cookies.userId)].favorites[req.body.index] =
    req.body.value;
  console.log(userArray[findUserIndex(req.cookies.userId)]);
});

app.get("/getFavoritesForUser", function (req, res) {
  const userId = req.cookies.userId;
  const userIndex = findUserIndex(userId);
  res.send(userArray[userIndex].favorites);
});

app.get("/index.html", function (req, res) {
  res.redirect("/");
});

app.get("/dinolist.html", function (req, res) {
  res.sendFile(path.join(__dirname + "/frontend/public/dinolist.html"));
  setCookieIfNotAlreadySet(req, res);
  const userId = req.cookies.userId;
  countFavoriteSite("dinolist", userId);
});

app.get("/period.html", function (req, res) {
  res.sendFile(path.join(__dirname + "/frontend/public/period.html"));
  setCookieIfNotAlreadySet(req, res);
  const userId = req.cookies.userId;
  countFavoriteSite("period", userId);
});

app.get("/forum.html", function (req, res) {
  res.sendFile(path.join(__dirname + "/frontend/public/forum.html"));
  setCookieIfNotAlreadySet(req, res);
  const userId = req.cookies.userId;
  countFavoriteSite("forum", userId);
});

app.use(express.static(path.join(__dirname, "frontend/public")));

var listener = app.listen(8080, () => {
  console.log("Listening on port " + listener.address().port);
});
