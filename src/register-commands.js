require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "upcoming",
    description: "Replies with upcoming contests.",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.BOT_KEY);

(async () => {
  console.log("Registering Slash Commands... ^-^");
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.BOT_ID,
        process.env.SERVER_ID
      ),
      { body: commands }
    );

    console.log("Slash Commands registered successfully! :-)");
  } catch (err) {
    console.log(`Error Occurred ${err}`);
  }
})();
