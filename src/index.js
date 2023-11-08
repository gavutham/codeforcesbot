require("dotenv").config();
const {
  Client,
  IntentsBitField,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");
const {
  getUpcomingContests,
  createEmbed,
  getTodayContests,
} = require("./codeforces");
const cron = require("node-cron");

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
    const contests = await getUpcomingContests();
    const embeds = contests.map((c) => createEmbed(c));
    const register = new ButtonBuilder()
      .setLabel("Register for Contests")
      .setStyle(ButtonStyle.Link)
      .setURL("https://codeforces.com/contests");

    const row = new ActionRowBuilder().addComponents(register);

    interaction.editReply({ embeds: embeds, components: [row] });
  }
});

cron.schedule("45 16 * * *", async () => {
  const channel = client.channels.cache.get(process.env.CONTEST_ALERT_ID);
  if (!channel) return;

  const contests = await getTodayContests();

  if (contests.length === 0) return;

  const embeds = contests.map((c) => createEmbed(c));
  const register = new ButtonBuilder()
    .setLabel("Go to Contests Page")
    .setStyle(ButtonStyle.Link)
    .setURL("https://codeforces.com/contests");

  const row = new ActionRowBuilder().addComponents(register);

  channel.send({
    content:
      "Checkout the contests in Codeforces that are happening TODAY !!\n",
    embeds: embeds,
    components: [row],
  });
});
