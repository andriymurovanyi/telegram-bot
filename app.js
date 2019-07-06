const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");

const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(config.telegram.bot_token, {polling: true});


bot.on('message', async msg => {
    const send_id = msg.chat.id;
    bot.sendMessage(send_id, "Fuck you, Suka!");
    console.log(send_id);
    const messages = await bot.getUpdates(offset = null);
    console.log(messages);
    console.log(messages.length);

});

bot.onText(/\/start/, async function (msg) {
    let send_id = msg.chat.id;

    // let promise = new Promise(resolve => {
    //
    // });
    await console.log(bot.getUpdates());
    const botName = getBotName();
    bot.sendMessage(send_id, `Hi, my name is ${botName}\nWhat you want to do ?`);
});


async function getBotName(){
    const botInfo = await bot.getMe();
    const botName = JSON.stringify(botInfo).username;
    console.log(botInfo);
    console.log(botName);
    return botName;
}


bot.onText(/\/parse/, function (msg) {
    let send_id = msg.chat.id;
    bot.sendMessage(send_id, 'Let\'s start to parse this shit!');
});


bot.onText(/\/help (.+)+/, (msg, match) => {
    let send_id = msg.chat.id;
    let response = match[1];
    bot.sendMessage(send_id, `As i see, you need help with ${response}`);
});








