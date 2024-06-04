import { Telegraf, Markup } from "telegraf";

const token = '7247039495:AAHn1hqM1Ykj1hzmQZgMS8rh5uB638kAWNU';
const bot = new Telegraf(token);
const web_link = "https://splendid-wisp-7896ac.netlify.app/";

bot.start(async (ctx) => {
  ctx.reply(`Welcome! Here are your options:`, {
    reply_markup: {
      inline_keyboard: [
        /* Inline buttons. 2 side-by-side */
        [{ text: "Start Mini App", web_app: { url: web_link } }],
        [{ text: "Invite Friends", url: `https://t.me/share/url?url=https://t.me/lovedlydtoday_bot` }],
      ]
    },
  });
});

bot.launch();