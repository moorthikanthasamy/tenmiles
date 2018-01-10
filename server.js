const express = require("express");
const morgon = require("morgan");
const path = require("path")
const bodyParser = require("body-parser")
const router = require("./app/routers/routes")
var app = express();


const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, './app/client')))
app.use(express.static(path.join(__dirname)))
app.set('views', path.join(__dirname, './app/views'))
app.set("view engine", "ejs")
app.use(router);
app.use(morgon("dev"));


app.get('/*', (req, res) => res.render("index"))

app.listen(PORT, () => console.log(`Node Server Running at ${PORT}`))