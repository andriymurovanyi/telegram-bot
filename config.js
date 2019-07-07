const config = {
    app:{
        port: 3000
    },

    telegram:{
        bot_token: "YOUR-BOT-TOKEN-HERE",
        group_id: "YOUR-GROP-ID-HERE"
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
