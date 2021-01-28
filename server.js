const express = require("express");
const { read } = require("fs");
const app = express();
const port = 8080;
const path = require("path");
const dataendpoint = "/data";
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    //res.sendFile(path.join(__dirname + "/dinopage.html"));
    res.send("test");
});
app.get(dataendpoint, function (req, res) {
    res.send("Got a GET: " + req.query.getfield);
});
app.post(dataendpoint, function (req, res) {
    res.send("Got a POST request: " + req.body.postfield);
});
app.put(dataendpoint, function (req, res) {
    res.send("Got a PUT request: " + req.query.putfield);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}​​​​​`);
});