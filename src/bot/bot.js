const TelegramBot = require('node-telegram-bot-api');
const token = '7145340904:AAEy5C5TRAJShs_sLRqOkjo24p0sQv9FVyw';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const webAppUrl = 'https://main.d25x2ut3bje9wu.amplifyapp.com/';

    const options = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Open Web App', url: webAppUrl }]
            ]
        })
    };

    bot.sendMessage(chatId, 'Click below to open the web app:', options);
});
