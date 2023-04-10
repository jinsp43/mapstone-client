// // Dynamic Timestamp
const calcTime = (timestamp) => {
  // Date.now() returns current time as ms since epoch
  // 1000 * 60 * 60 * 24 = 86400000
  let daysSince = Math.floor((Date.now() - timestamp) / 86400000);

  if (daysSince < 365) {
    if (daysSince === 0) {
      return "Today";
    } else if (daysSince === 1) {
      return `${daysSince} day ago`;
    }

    return `${daysSince} days ago`;
  } else {
    return `${timestamp.toLocaleDateString("en-GB")}`;
  }
};

export default calcTime;
