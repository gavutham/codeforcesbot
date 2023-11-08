const { EmbedBuilder } = require("discord.js");
const { secondsToHMS, isSameDay } = require("../utils/time");

const getUpcomingContests = async () => {
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

const getTodayContests = async () => {
  try {
    const res = await fetch("https://codeforces.com/api/contest.list");

    if (res.status === 200) {
      const contests = (await res.json()).result;
      return contests.filter(
        (contest) =>
          contest.phase === "BEFORE" &&
          isSameDay(contest.startTimeSeconds * 1000)
      );
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

module.exports = { getUpcomingContests, getTodayContests, createEmbed };
