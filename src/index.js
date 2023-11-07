const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const { getContests } = require("./codeforces");
require("dotenv").config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.login(process.env.BOT_KEY);

client.on("ready", async (c) => {
  console.log(`This is ${c.user.username}, On your command...`);
});
