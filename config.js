const config = {
    app:{
        port: 3000
    },

    telegram:{
        bot_token: "YOUR-BOT-TOKEN-HERE",
        group_id: "YOUR-GROUP-ID-HERE" // can be found in log.txt
    },

    db:{
        host: "localhost",
        port: "27017",
        name: "test",
        connectionString: "mongodb://localhost:27017/",
        newUrlParser: true
    }
};

module.exports = config;
