const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ],
});

client.once("ready", () => {
  console.log(`🌙 Nocthera is awake as ${client.user.tag}`);
  client.user.setPresence({
    activities: [{ name: "over Nocthera 🌙" }],
    status: "online",
  });
});

client.on("guildMemberAdd", async (member) => {
  const channelName = process.env.WELCOME_CHANNEL || "welcome";
  const channel = member.guild.channels.cache.find(ch => ch.name === channelName);

  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor(0x6b3fa0)
    .setTitle("🌙 Welcome to Nocthera")
    .setDescription(`Welcome ${member}, you have entered the realm where night never ends.`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: "Nocthera • BonitaBala" });

  channel.send({ embeds: [embed] });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("🌙 Nocthera is online.");
  }

  if (interaction.commandName === "tarot") {
    const cards = [
      "The Moon — secrets, intuition, hidden truth.",
      "The Sun — clarity, joy, victory.",
      "Death — transformation, ending, rebirth.",
      "The Star — hope, healing, guidance.",
      "The High Priestess — mystery, silence, inner knowing.",
      "The Tower — sudden change, chaos, awakening."
    ];
    const card = cards[Math.floor(Math.random() * cards.length)];
    await interaction.reply(`🃏 **Your Nocthera card:** ${card}`);
  }

  if (interaction.commandName === "cat") {
    await interaction.reply("🐈‍⬛ The black cat watches from the shadows.");
  }

  if (interaction.commandName === "help") {
    const embed = new EmbedBuilder()
      .setColor(0x6b3fa0)
      .setTitle("🌙 Nocthera Commands")
      .setDescription("Available commands:")
      .addFields(
        { name: "/ping", value: "Check if the bot is online." },
        { name: "/tarot", value: "Draw a mysterious tarot card." },
        { name: "/cat", value: "Summon the Nocthera black cat." },
        { name: "/help", value: "Show this help menu." }
      )
      .setFooter({ text: "Nocthera • BonitaBala" });

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.DISCORD_TOKEN);
