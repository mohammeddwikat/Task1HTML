const myModule = require("./dateTesting.js");

const dateToString = myModule.dateToString;
const add = myModule.add;

let date = new Date("1/5/2021");

test("Should return year only in YY format", () => {
  expect(dateToString(date, "YY")).toBe("21");
});
test("Should return year only in Y format", () => {
  expect(dateToString(date, "Y")).toBe("2021");
});
test("Should return Month only in M format", () => {
  expect(dateToString(date, "M")).toBe("1");
});
test("Should return Month only in MM format", () => {
  expect(dateToString(date, "MM")).toBe("01");
});
test("Should return Month only in MMM format", () => {
  expect(dateToString(date, "MMM")).toBe("Jan");
});
test("Should return Month only in MMMM format", () => {
  expect(dateToString(date, "MMMM")).toBe("January");
});

test("Should return day only in D format", () => {
  date.setDate(5);
  expect(dateToString(date, "D")).toBe("5");
});
test("Should return day only in DD format", () => {
  expect(dateToString(date, "DD")).toBe("05");
});
test("Should return Year and month only in any format with '/' separator", () => {
  expect(dateToString(date, "Y/MMMM")).toBe("2021/January");
});
test("Should return Year and month only in any format with '-' separator", () => {
  expect(dateToString(date, "Y-MMM")).toBe("2021-Jan");
});
test("Should return Year and month only in any format with ' ' separator", () => {
  expect(dateToString(date, "YY MMM")).toBe("21 Jan");
});
test("Should return Year and day only in any format with ' ' separator", () => {
  expect(dateToString(date, "Y DD")).toBe("2021 05");
});
test("Should return Year and day only in any format with '-' separator", () => {
  expect(dateToString(date, "Y-D")).toBe("2021-5");
});
test("Should return Year and day only in any format with '/' separator", () => {
  expect(dateToString(date, "Y/DD")).toBe("2021/05");
});
test("Should return Month and Day only in any format with ' ' separator", () => {
  expect(dateToString(date, "MMMM DD")).toBe("January 05");
});
test("Should return Month and Day only in any format with '-' separator", () => {
  expect(dateToString(date, "MMMM-DD")).toBe("January-05");
});
test("Should return Month and Day only in any format with '/' separator", () => {
  expect(dateToString(date, "MMMM/DD")).toBe("January/05");
});
test("Should return Year, Month and Day only in any format with [- -] separators", () => {
  expect(dateToString(date, "Y-MM-DD")).toBe("2021-01-05");
});
test("Should return Year, Day and Month only in any format with [- /] separator", () => {
  expect(dateToString(date, "Y-MM/DD")).toBe("2021-01/05");
});
test("Should return Day, Year and Month only in any format with [/ /] separator", () => {
  expect(dateToString(date, "D-YY/M")).toBe("5-21/1");
});
test("Should return Day, Month and Year only in any format with [' ' ' '] separator", () => {
  expect(dateToString(date, "DD MM Y")).toBe("05 01 2021");
});
test("Should return Month, Day and Year only in any format with [' ' /] separator", () => {
  expect(dateToString(date, "MMM D/Y")).toBe("Jan 5/2021");
});
test("Should return Month, Year and Day only in any format with [- ' '] separator", () => {
  expect(dateToString(date, "MMMM-Y DD")).toBe("January-2021 05");
});
test("Should return Hour only in H format", () => {
  date.setHours(3);
  expect(dateToString(date, "HH")).toBe("03");
});
test("Should return Hour only in HH format", () => {
  expect(dateToString(date, "H")).toBe("3");
});
test("Should return Hour and minutes only in m format the hour in any format", () => {
  date.setMinutes(33);
  expect(dateToString(date, "HH:m")).toBe("03:33");
});
test("Should return Hour and minutes only in mm format the hour in any format", () => {
  date.setMinutes(9);
  expect(dateToString(date, "HH:mm")).toBe("03:09");
});
test("Should return Hour and seconds only in S format the hour in any format", () => {
  date.setSeconds(45);
  expect(dateToString(date, "HH:s")).toBe("03:45");
});
test("Should return Hour and Seconds only in SS format the hour in any format", () => {
  date.setSeconds(5);
  expect(dateToString(date, "HH:ss")).toBe("03:05");
});
test("Should return Hour and minutes with seconds in any format", () => {
  expect(dateToString(date, "HH:mm:ss")).toBe("03:09:05");
});
test("Should return Hour and minutes with seconds in any format with Meridiem in a format before midday ", () => {
  expect(dateToString(date, "HH:mm:ss a")).toBe("03:09:05 a");
});
test("Should return Hour and minutes with seconds in any format with Meridiem in a format after midday ", () => {
  date.setHours(16);
  expect(dateToString(date, "HH:mm:ss a")).toBe("04:09:05 p");
});
test("Should return Hour and minutes with seconds in any format with Meridiem in A format after midday ", () => {
  expect(dateToString(date, "HH:mm:ss A")).toBe("04:09:05 P");
});
test("Should return Hour and minutes with seconds in any format with Meridiem in A format before midday ", () => {
  date.setHours(4);
  expect(dateToString(date, "HH:mm:ss A")).toBe("04:09:05 A");
});
test("Should return Hour and minutes with seconds in any format with Meridiem in aa format after midday ", () => {
  date.setHours(15);
  expect(dateToString(date, "HH:mm:ss aa")).toBe("03:09:05 pm");
});
test("Should return Hour and minutes with seconds in any format with Meridiem in aa format before midday ", () => {
  date.setHours(1);
  expect(dateToString(date, "HH:mm:ss aa")).toBe("01:09:05 am");
});
test("Should return Hour and minutes with seconds in any format with Meridiem in AA format before midday ", () => {
  expect(dateToString(date, "HH:mm:ss AA")).toBe("01:09:05 AM");
});
test("Should return Hour and minutes with seconds in any format with Meridiem in AA format after midday ", () => {
  date.setHours(13);
  expect(dateToString(date, "HH:mm:ss AA")).toBe("01:09:05 PM");
});
test("Should return the full date and time", () => {
  date.setHours(13);
  expect(dateToString(date, "MM/DD/Y HH:mm:ss AA")).toBe(
    "01/05/2021 01:09:05 PM"
  );
});
test("Should return full time and the full date with any format for both", () => {
  expect(dateToString(date, "HH:mm:ss AA MM/DD/Y")).toBe(
    "01:09:05 PM 01/05/2021"
  );
});
test("Should return the full date and time with [-] separator between them", () => {
  expect(dateToString(date, "MM/DD/Y-HH:mm:ss AA")).toBe(
    "01/05/2021-01:09:05 PM"
  );
});
test("Should return the full date and time with [/] separator between them", () => {
  expect(dateToString(date, "MM/DD/Y/HH:mm:ss AA")).toBe(
    "01/05/2021/01:09:05 PM"
  );
});

let date2 = new Date("02/21/2021 00:00:00");

test("Should add days on the date object date", () => {
  expect(add(date2, "5d").getTime()).toBe(new Date("02/26/2021 00:00:00").getTime());
});
test("Should add days on the date object date", () => {
  expect(add(date2, "5D").getTime()).toBe(new Date("03/03/2021").getTime());
});
test("Should add days on the date object date", () => {
  expect(add(date2, "5H").getTime()).toBe(
    new Date("03/03/2021 05:00:00").getTime()
  );
});
test("Should add days on the date object date", () => {
  expect(add(date2, "10H").getTime()).toBe(
    new Date("03/03/2021 15:00:00").getTime()
  );
});

/*
npm -s run test
---------
year only : 2 formats YY and Y  **
month only : 4 formats M MM MMM MMMM ***
days only : two formats D DD ***
Years and Month only: using any format with the separators '-' '/' ' ' ***
Years and days only: using any format with the separators '-' '/' ' ' ***
Month and days only: using any format with the separators '-' '/' ' ' ***
Years, Month and days only: using any format by changing the positions 6 testCases ****

separators between Date's components:
    Years, Month and days only: using any format with '/' separator ***
    Years, Month and days only: using any format with ' ' separator ***
    Years, Month and days only: using any format with '-' separator ****

    Years, Month and days only: using any format with '-' and '/' separators ***
    Years, Month and days only: using any format with '/' and ' ' separators ***
    Years, Month and days only: using any format with ' ' and '-' separators ***

Hours only: two formats H HH ***
Hours and Minuets only: two formats m mm ****
Hours and seconds only: two formats s ss ****
Hours, Minuets and seconds only: with any format ***

Hours, Minuets and seconds with meridiem: 4 formats a A aa AA and the two states after and before midday : 8tc's ***
Date with time (Years, months, days, hours, minuets, seconds and meridiem): 2 tc's ** 

separators between Date and time:
Date with time (Years, months, days, hours, minuets, seconds and meridiem): separator '-' ***
Date with time (Years, months, days, hours, minuets, seconds and meridiem): separator ' ' ***
Date with time (Years, months, days, hours, minuets, seconds and meridiem): separator '/' ***

42 test cases
------------------------------------------

add function:
add days when d small and capital letter : 2tc's
add hour: 1tc's 
*/
