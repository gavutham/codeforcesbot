const { EmbedBuilder } = require("discord.js");

const secondsToHMS = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const s = String(remainingSeconds).padStart(2, "0");

  return `${h}:${m}:${s}`;
};

const getContests = async () => {
  try {
    const res = await fetch("https://codeforces.com/api/contest.list");

    if (res.status === 200) {
      const contests = (await res.json()).result;
      return contests.filter((ele) => ele.phase === "BEFORE");
    }
  } catch (error) {
    console.log(error);
  }
};

const createEmbed = (contest) => {
  const fields = [];
  const embed = new EmbedBuilder()
    .setTitle(contest.name)
    .setColor("Random")
    .setDescription(contest.description ?? null);

  contest.startTimeSeconds &&
    fields.push({
      name: "Date & Time: ",
      value: new Date(contest.startTimeSeconds * 1000).toLocaleString(),
      inline: true,
    });
  contest.durationSeconds &&
    fields.push({
      name: "Duration: ",
      value: secondsToHMS(contest.durationSeconds),
      inline: true,
    });

  embed.setFields(fields);
  return embed;
};

module.exports = { getContests, createEmbed };
