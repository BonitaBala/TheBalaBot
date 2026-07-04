const { REST, Routes, SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check if Nocthera is online."),
  new SlashCommandBuilder()
    .setName("tarot")
    .setDescription("Draw a mysterious tarot card."),
  new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Summon the Nocthera black cat."),
  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show Nocthera commands."),
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("🌙 Registering Nocthera slash commands...");

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log("✅ Slash commands registered.");
  } catch (error) {
    console.error(error);
  }
})();
