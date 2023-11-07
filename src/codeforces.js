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

module.exports = { getContests };
