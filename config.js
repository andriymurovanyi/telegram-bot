const config = {
    app:{
        port: 3000
    },

    telegram:{
        bot_token: "719697093:AAHe-2NB3ryxErWD0YtHtUGZqnJMwZBkToA",
        group_id: "-386361133"
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
