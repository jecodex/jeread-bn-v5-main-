// timeUtils.js
import moment from "moment"; // Using moment.js

export const formatTimeToBangla = (timestamp) => {
  // Set locale to English (default)
  moment.locale('en');
  
  const now = moment();
  const messageTime = moment(timestamp);
  const diffInSeconds = now.diff(messageTime, "seconds");

  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return messageTime.format("LL"); // English date format
  }
};