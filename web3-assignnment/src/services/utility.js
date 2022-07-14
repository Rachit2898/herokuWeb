export default{
    timeDiff
}






function timeDiff(curr, prev) {
 
    if (curr < prev) return "0 secs ago";
    let ms_Min = 60 * 1000; // milliseconds in Minute
    let ms_Hour = ms_Min * 60; // milliseconds in Hour
    let ms_Day = ms_Hour * 24; // milliseconds in day
    let ms_Mon = ms_Day * 30; // milliseconds in Month
    let ms_Yr = ms_Day * 365; // milliseconds in Year
    let diff = curr - prev; //difference between dates.
    // If the diff is less then milliseconds in a minute
    if (diff < ms_Min) {
      return Math.abs(Math.round(diff / 1000)) + " secs ago";
  
      // If the diff is less then milliseconds in a Hour
    } else if (diff < ms_Hour && Math.abs(Math.round(diff / ms_Min)) === 1) {
      return Math.abs(Math.round(diff / ms_Mon)) + " min ago";
    } else if (diff < ms_Hour) {
      return Math.abs(Math.round(diff / ms_Min)) + " mins ago";
      // If the diff is less then milliseconds in a day
    } else if (diff < ms_Day && Math.abs(Math.round(diff / ms_Hour)) === 1) {
      return Math.abs(Math.round(diff / ms_Hour)) + " hr ago";
    } else if (diff < ms_Day) {
      return Math.abs(Math.round(diff / ms_Hour)) + " hrs ago";
  
      // If the diff is less then milliseconds in a Month
    } else if (diff < ms_Mon && Math.abs(Math.round(diff / ms_Day)) === 1) {
      return Math.abs(Math.round(diff / ms_Day)) + " day ago";
    } else if (diff < ms_Mon && Math.abs(Math.round(diff / ms_Day)) > 1) {
      return Math.abs(Math.round(diff / ms_Day)) + " days ago";
  
      // If the diff is less then milliseconds in a year
    } else if (diff < ms_Yr && Math.abs(Math.round(diff / ms_Mon)) === 1) {
      return Math.abs(Math.round(diff / ms_Mon)) + " month ago";
    } else if (diff < ms_Yr && Math.abs(Math.round(diff / ms_Mon)) > 1) {
      return Math.abs(Math.round(diff / ms_Mon)) + " months ago";
    }
   else if ( Math.abs(Math.round(diff / ms_Yr)) === 1) {
    return Math.abs(Math.round(diff / ms_Yr)) + " year";
  }  else {
      return Math.abs(Math.round(diff / ms_Yr)) + " years ago";
    }
  }