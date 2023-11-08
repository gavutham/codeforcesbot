const isSameDay = (ms) => {
  const date1 = new Date(ms);
  const date2 = new Date();
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const secondsToHMS = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const s = String(remainingSeconds).padStart(2, "0");

  return `${h}:${m}:${s}`;
};

module.exports = { isSameDay, secondsToHMS };
