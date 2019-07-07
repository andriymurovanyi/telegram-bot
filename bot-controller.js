// Bot controller.
const fs = require("fs");
const TelegramBot = require("node-telegram-bot-api");
const config = require("./config");
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient(config.db.connectionString, {
    useNewUrlParser: config.db.newUrlParser
});

const bot = new TelegramBot(config.telegram.bot_token, {polling: true});

bot.on('message', async msg => {
    const send_id = msg.chat.id;

    let log_content = "[ID]: " + send_id;
    let logger = fs.createWriteStream("log.txt", {
        flags: "a"
    });
    logger.write("\n" + log_content );
    logger.end();

    if (msg.text === "/start"){
        console.log(send_id);
        bot.sendMessage(send_id, `Hi, my name is TScrapperBot\nWhat you want to do ?`);
    }

    else if (msg.text === "/help"){
        bot.sendMessage(send_id, `As i see, you need help with something`);
    }

    else if (msg.text === "/settings"){
        bot.sendMessage(send_id, "You're in setting section now")
    }

    else if (msg.text === "/parse"){
        bot.sendMessage(send_id, 'Let\'s start to parse this chat!');
    }
    else{
        bot.sendMessage(send_id, "I'm alive now!");
    }

    const messages = await bot.getUpdates(); // Get new messages from chat

    let data = [];

    for (let i = 0; i < messages.length; i++){
        console.log(messages[i].date);
        messages[i].message.date = new Date(
            messages[i].message.date * 1000)
            .toLocaleString()
            .split(" ");

        data.push(messages[i].message);
        console.log(messages[i].message.photo[0]);
    }

    mongoClient.connect(function(err, client){
        const collection = client.db("telegram-db").collection("messages");

        if(err) return console.log(err);

        collection.insertMany(data, (err, result) => {
            if (err) return console.log(err);
            console.log(result);
        })
    });
});
module.exports = bot;
