const {
  Client,
  IntentsBitField,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const { getContests, createEmbed } = require("./codeforces");
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
  interaction.deferReply({ ephemeral: true });

  if (interaction.commandName === "upcoming") {
    const contests = await getContests();
    const embeds = contests.map((c) => createEmbed(c));
    const register = new ButtonBuilder()
      .setLabel("Register for Contests")
      .setStyle(ButtonStyle.Link)
      .setURL("https://codeforces.com/contests");

    const row = new ActionRowBuilder().addComponents(register);

    interaction.editReply({ embeds: embeds, components: [row] });
  }
});
