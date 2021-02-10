const constantsModule = require("./constants.js");

const monthsMMMFormat = constantsModule.MMMFormat;
const monthsMMMMFormat = constantsModule.MMMMFormat;

/** Detect if the amount in hours or in days to add it on a date object. */
String.prototype.hoursOrDays = function () {
  const amount = this;
  if (amount[amount.length - 1].toUpperCase() == "D") {
    return "day";
  } else if (amount[amount.length - 1] == "H") {
    return "hour";
  } else {
    return new Error("Invalid Input");
  }
};

/**
 * convert date as string into date object.
 * @param {string} format - The date as string wants to convert it.
 */
String.prototype.formatDate = function (format) {
  const arrOfTermsDateKeys = format.split(/[:/-\s]/);
  const arrOfTermsDateValues = this.split(/[:/-\s]/);
  let hashTable = {
    year: 1,
    month: 1,
    days: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  let termDateFormat;
  for (let pointer in arrOfTermsDateKeys) {
    termDateFormat = arrOfTermsDateKeys[pointer];
    switch (termDateFormat) {
      case "Y":
      case "y":
      case "YY":
      case "yy":
        hashTable.year = arrOfTermsDateValues[pointer];
        break;
      case "M":
      case "MM":
        hashTable.month = arrOfTermsDateValues[pointer];
        break;
      case "MMM":
        hashTable.month =
          monthsMMMFormat.indexOf(arrOfTermsDateValues[pointer]) + 1;
        break;
      case "MMMM":
        hashTable.month =
          monthsMMMMFormat.indexOf(arrOfTermsDateValues[pointer]) + 1;
        break;
      case "D":
      case "d":
      case "DD":
      case "dd":
        hashTable.days = arrOfTermsDateValues[pointer];
        break;
      case "H":
      case "HH":
        hashTable.hours = arrOfTermsDateValues[pointer];
        break;
      case "m":
      case "mm":
        hashTable.minutes = arrOfTermsDateValues[pointer];
        break;
      case "s":
      case "S":
      case "ss":
      case "SS":
        hashTable.seconds = arrOfTermsDateValues[pointer];
        break;
      case "a":
      case "aa":
      case "A":
      case "AA":
        if (
          (arrOfTermsDateValues[pointer] == "p" ||
            arrOfTermsDateValues[pointer] == "P" ||
            arrOfTermsDateValues[pointer] == "pm" ||
            arrOfTermsDateValues[pointer] == "PM") &&
          hashTable.hours != 12
        ) {
          hashTable.hours = parseInt(hashTable.hours) + 12;
        } else if (
          (arrOfTermsDateValues[pointer] == "a" ||
            arrOfTermsDateValues[pointer] == "A" ||
            arrOfTermsDateValues[pointer] == "am" ||
            arrOfTermsDateValues[pointer] == "AM") &&
          hashTable.hours == 12
        ) {
          hashTable.hours = 0;
        }
        break;
      default:
        return new Error("Invalid Input");
    }
  }
  return (
    hashTable.month +
    "/" +
    hashTable.days +
    "/" +
    hashTable.year +
    " " +
    hashTable.hours +
    ":" +
    hashTable.minutes +
    ":" +
    hashTable.seconds
  );
};

/**
 * return the characters on a string based on a specific pattern.
 * @param {string} str - The string contains characters that we need to find it t add it on a string date.
 * @param {object} pattern - The object contains the chars that we want to extract it
 * @param {string} modifier  - Modifiers are used to perform case-insensitive and global searches
 */
const findSeparators = (str, pattern, modifier) => {
  const regularExpression = new RegExp(pattern, modifier);
  return str.match(regularExpression);
};

/**
 * @param {object} termsDate - Contains the terms of the date
 * check if the format date contains Meridiem
 * */
const ifMeridiemExist = (termsDate) => {
  return (
    termsDate.includes("a") ||
    termsDate.includes("A") ||
    termsDate.includes("aa") ||
    termsDate.includes("AA")
  );
};

/**
 * Convert date object to a string based on a specific format.
 * @param {string} str - The format of the date.
 */
Date.prototype.format = function (str) {
  const date = this;
  let finalValue = "";
  let index = 0;
  let hour;
  let mon;
  let min;
  let sec;
  let day;

  /** Update the pointers on the array of separators and array of terms date */
  const updateIndexers = () => {
    if (index < sizeSeparators) {
      finalValue += separators[index];
      index++;
    }
  };

  /** Complete the time after find the hours based on the format that specified in the str param */
  const completeTime = () => {
    if (arrOfTermsDate.includes("m")) {
      finalValue += ":";
      finalValue += date.getMinutes();
    } else if (arrOfTermsDate.includes("mm")) {
      min = date.getMinutes();
      if (min < 10) {
        min = "0" + min;
      }
      finalValue += ":";
      finalValue += min;
    }
    if (arrOfTermsDate.includes("s") || arrOfTermsDate.includes("S")) {
      finalValue += ":";
      finalValue += date.getSeconds();
    } else if (arrOfTermsDate.includes("ss") || arrOfTermsDate.includes("SS")) {
      sec = date.getSeconds();
      if (sec < 10) {
        sec = "0" + sec;
      }
      finalValue += ":";
      finalValue += sec;
    }
    if (arrOfTermsDate.includes("a")) {
      finalValue += " ";
      if (date.getHours() >= 12) {
        finalValue += "p";
      } else {
        finalValue += "a";
      }
    } else if (arrOfTermsDate.includes("A")) {
      finalValue += " ";
      if (date.getHours() >= 12) {
        finalValue += "P";
      } else {
        finalValue += "A";
      }
    } else if (arrOfTermsDate.includes("aa")) {
      finalValue += " ";
      if (date.getHours() >= 12) {
        finalValue += "pm";
      } else {
        finalValue += "am";
      }
    } else if (arrOfTermsDate.includes("AA")) {
      finalValue += " ";
      if (date.getHours() >= 12) {
        finalValue += "PM";
      } else {
        finalValue += "AM";
      }
    }
  };
  const separators = findSeparators(str, /[:\,/-\s]/, "g");
  let sizeSeparators = 0;
  if (separators != null) {
    sizeSeparators = separators.length;
  }
  const arrOfTermsDate = str.split(/[.\-_\s,:/]/);
  let termDateFormat;
  for (let i in arrOfTermsDate) {
    termDateFormat = arrOfTermsDate[i];
    switch (termDateFormat) {
      case "Y":
      case "y":
        finalValue += date.getFullYear().toString();
        updateIndexers();
        break;
      case "YY":
      case "yy":
        finalValue += (date.getYear() % 100).toString();
        updateIndexers();
        break;
      case "M":
        finalValue += (date.getMonth() + 1).toString();
        updateIndexers();
        break;
      case "MM":
        mon = date.getMonth() + 1;
        if (mon < 10) {
          mon = "0" + mon;
        }
        finalValue += mon.toString();
        updateIndexers();
        break;
      case "MMM":
        finalValue += monthsMMMFormat[date.getMonth()];
        updateIndexers();
        break;
      case "MMMM":
        finalValue += monthsMMMMFormat[date.getMonth()];
        updateIndexers();
        break;
      case "d":
      case "D":
        finalValue += date.getDate().toString();
        updateIndexers();
        break;
      case "DD":
      case "dd":
        day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        finalValue += day.toString();
        updateIndexers();
        break;
      case "H":
        if (ifMeridiemExist(arrOfTermsDate) == true) {
          hour = date.getHours();
          hour = hour % 12;
          hour = hour == 0 ? 12 : hour;
          finalValue += hour;
        } else {
          finalValue += date.getHours();
        }
        completeTime();
        index++;
        finalValue += " ";
        break;
      case "HH":
        hour = date.getHours();

        if (ifMeridiemExist(arrOfTermsDate) == true) {
          hour = hour % 12;
          hour = hour == 0 ? 12 : hour;
          if (hour < 10) {
            hour = "0" + hour;
          }
          finalValue += hour;
        } else {
          if (hour < 10) {
            hour = "0" + hour;
          }
          finalValue += hour;
        }
        completeTime();
        finalValue += " ";
        index++;
        break;
      case "S":
      case "SS":
      case "s":
      case "ss":
      case "mm":
      case "m":
      case "a":
      case "A":
      case "aa":
      case "AA":
        index++;
        break;
      default:
        return new Error("Invalid Format");
    }
  }
  return finalValue.trim();
};

/**
 * convert a date object to a string with a specific format.
 * @param {Date} date - Date object.
 * @param {string} format - The format that we want the date show as it.
 */
const dateToString = (date, format) => {
  return date.format(format);
};

/**
 * convert a string as date to object date.
 * @param {string} date - string represent a date.
 * @param {string} format - The format that the date follow it.
 */
const stringToDate = (date, format) => {
  return new Date(date.formatDate(format));
};

/**
 * add days or hours on a date object.
 * @param {Date} date - Date object that we want to add hours or days on it.
 * @param {string} amount - The amount that we want to add it.
 */
const add = (date, amount) => {
  let str;
  if (amount.hoursOrDays() == "day") {
    str = amount.slice(0, amount.length - 1);
    date.setDate(date.getDate() + parseInt(str));
    return date;
  } else if (amount.hoursOrDays() == "hour") {
    str = amount.slice(0, amount.length - 1);
    date.setHours(date.getHours() + parseInt(str));
    return date;
  } else {
    return new Error("Invalid amount");
  }
};

module.exports = { dateToString, add, stringToDate };

