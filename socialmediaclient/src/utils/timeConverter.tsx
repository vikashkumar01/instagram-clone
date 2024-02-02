export const timeAgo = (dateString:Date)=> {
  const currentDate:Date = new Date();
  const givenDate:Date = new Date(dateString);

  const seconds = Math.floor((currentDate.getTime() - givenDate.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return seconds + " sec ago";
  } else if (minutes < 60) {
    return minutes + " min ago";
  } else if (hours < 24) {
    return hours + " hr ago";
  } else if (days < 365) {
    return days + " day ago";
  } else {
    return years + " year ago";
  }
}