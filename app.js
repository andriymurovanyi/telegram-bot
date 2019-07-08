// Server
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const hbs = require("hbs");

const config = require("./config");
const bot = require("./bot-controller");

const app = express();
app.set("view-engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(__dirname + "/public"));

const urlencodedParser = bodyParser.urlencoded({extended: false});
const mongoClient = new MongoClient(config.db.connectionString, {
    useNewUrlParser: config.db.newUrlParser
});

let dbClient;

mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("telegram-db").collection("messages");
});

app.get("/", async (req, res) => {
    res.render('index.hbs');
});

app.get("/messages", (req, res) => {
    const collection = req.app.locals.collection;
    collection.find({}).toArray((err, messages) => {
        if (err) return console.log(err);
        res.send(messages);
    })
});

app.get("/messages/:username", (req, res) => {
    const collection = req.app.locals.collection;
    let username = req.params["username"];
    console.log(username);
    collection.find({"from.username": username}).toArray(function (err, data) {
        if (err) return console.log(err);
        res.send(data);
    })
});

app.post("/", urlencodedParser, async (req, res) => {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    bot.sendMessage(config.telegram.group_id, req.body.txt);
    res.sendStatus(200);
});

const port = config.app.port;
app.listen(port, console.log(`Server was started on ${port}`));

module.exports = app;