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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  await interaction.deferReply({ ephemeral: true });

  if (interaction.commandName === "upcoming") {
    const contests = await getContests();
    let reply = "";

    contests.forEach((c) => {
      reply += ", ";
      reply += c.name;
    });

    interaction.editReply({ content: reply });
  }
});
