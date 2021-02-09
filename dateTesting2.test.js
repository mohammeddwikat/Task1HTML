const myModule = require("./dateTesting.js");

const stringToDate = myModule.stringToDate;

test("Should return date object with the first day in a year in Y format ", () => {
  expect(stringToDate("1999", "Y").getTime()).toBe(
    new Date("1999 00:00:00").getTime()
  );
});
test("Should return date object with the first day in a year in YY format ", () => {
  expect(stringToDate("99", "YY").getTime()).toBe(
    new Date("99 00:00:00").getTime()
  );
});
test("Should return date object with the first day in a year in any format with specific month with M format ", () => {
  expect(stringToDate("1999/3", "Y/M").getTime()).toBe(
    new Date("03/01/1999 00:00:00").getTime()
  );
});
test("Should return date object with the first day in a year in any format with specific month with MM format ", () => {
  expect(stringToDate("1999/03", "Y/MM").getTime()).toBe(
    new Date("03/01/1999 00:00:00").getTime()
  );
});
test("Should return date object with the first day in a year in any format with specific month with MMM format ", () => {
  expect(stringToDate("1999/Jan", "Y/MMM").getTime()).toBe(
    new Date("01/01/1999 00:00:00").getTime()
  );
});
test("Should return date object with the first day in a year in any format with specific month with MMMM format ", () => {
  expect(stringToDate("1999/March", "Y/MMMM").getTime()).toBe(
    new Date("03/01/1999 00:00:00").getTime()
  );
});
test("Should return date object with the first day in a year and month with any format ", () => {
  expect(stringToDate("March/1999", "MMMM/Y").getTime()).toBe(
    new Date("03/01/1999 00:00:00").getTime()
  );
});
test("Should return date object with the first day in a year and month with any format with - separator", () => {
  expect(stringToDate("March-1999", "MMMM-Y").getTime()).toBe(
    new Date("03/01/1999 00:00:00").getTime()
  );
});
test("Should return date object with the first day in a year and month with any format with ' ' separator", () => {
  expect(stringToDate("March 1999", "MMMM Y").getTime()).toBe(
    new Date("03/01/1999 00:00:00").getTime()
  );
});
test("Should return date object with specific day with D format in a year and month with any format", () => {
  expect(stringToDate("2021/23/02", "Y/D/MM").getTime()).toBe(
    new Date("02/23/2021 00:00:00").getTime()
  );
});
test("Should return date object with specific year, day and the first Month", () => {
  expect(stringToDate("2021/23", "Y/D").getTime()).toBe(
    new Date("01/23/2021 00:00:00").getTime()
  );
});
test("Should return date object with specific day with DD format in a year and month with any format", () => {
  expect(stringToDate("2021/05/02", "Y/DD/MM").getTime()).toBe(
    new Date("02/05/2021 00:00:00").getTime()
  );
});
test("Should return date object Year, Month and Day in any format with [- -] separators", () => {
  expect(stringToDate("2021-05-02", "Y-DD-MM").getTime()).toBe(
    new Date("02/05/2021 00:00:00").getTime()
  );
});
test("Should return date object Year, Month and Day in any format with [- /] separators", () => {
  expect(stringToDate("2021-05/02", "Y-DD/MM").getTime()).toBe(
    new Date("02/05/2021 00:00:00").getTime()
  );
});
test("Should return date object Year, Month and Day in any format with [' ' -] separators", () => {
  expect(stringToDate("2021 05-02", "Y DD-MM").getTime()).toBe(
    new Date("02/05/2021 00:00:00").getTime()
  );
});
test("Should return date object Year, Month and Day in any format with [' ' ' '] separators", () => {
  expect(stringToDate("2021 05 02", "Y DD MM").getTime()).toBe(
    new Date("02/05/2021 00:00:00").getTime()
  );
});
test("Should return date object Year, Month and Day in any format with [' ' /] separators", () => {
  expect(stringToDate("2021 05/02", "Y DD/MM").getTime()).toBe(
    new Date("02/05/2021 00:00:00").getTime()
  );
});
test("Should return date object Year, Month and Day in any format with hours in H format", () => {
  expect(stringToDate("2021 05/02 3", "Y DD/MM H").getTime()).toBe(
    new Date("02/05/2021 3:00:00").getTime()
  );
});
test("Should return date object Year, Month and Day in any format with hours in HH format", () => {
  expect(stringToDate("2021 05/02 05", "Y DD/MM HH").getTime()).toBe(
    new Date("02/05/2021 05:00:00").getTime()
  );
});
test("Should return date object Year, Month, Day and hours in any format with minuets in m format", () => {
  expect(stringToDate("2021 05/02 05:3", "Y DD/MM HH:mm").getTime()).toBe(
    new Date("02/05/2021 05:03:00").getTime()
  );
});
test("Should return date object Year, Month, Day and hours in any format with minuets in mm format", () => {
  expect(stringToDate("2021 05/02 05:55", "Y DD/MM HH:mm").getTime()).toBe(
    new Date("02/05/2021 05:55:00").getTime()
  );
});
test("Should return date object Year, Month, Day, hours in any format with seconds in s format", () => {
  expect(stringToDate("2021 05/02 05:55:3", "Y DD/MM HH:mm:s").getTime()).toBe(
    new Date("02/05/2021 05:55:03").getTime()
  );
});
test("Should return date object Year, Month, Day, hours in any format with seconds in ss format", () => {
  expect(
    stringToDate("2021 05/02 05:55:03", "Y DD/MM HH:mm:ss").getTime()
  ).toBe(new Date("02/05/2021 05:55:03").getTime());
});
test("Should return date object Year, Month, Day, hours and seconds in any format with Meridiem in a format and the time is after midday at 12", () => {
  expect(
    stringToDate("2021 05/02 12:25:13 p", "Y DD/MM HH:mm:ss a").getTime()
  ).toBe(new Date("02/05/2021 12:25:13").getTime());
});
test("Should return date object Year, Month, Day, hours and seconds in any format with Meridiem in a format and the time is after midday", () => {
  expect(
    stringToDate("2021 05/02 2:25:13 p", "Y DD/MM HH:mm:ss a").getTime()
  ).toBe(new Date("02/05/2021 14:25:13").getTime());
});
test("Should return date object Year, Month, Day, hours and seconds in any format with Meridiem in a format and the time is before midday at 12", () => {
  expect(
    stringToDate("2021 05/02 12:25:13 a", "Y DD/MM HH:mm:ss a").getTime()
  ).toBe(new Date("02/05/2021 00:25:13").getTime());
});
test("Should return date object Year, Month, Day, hours and seconds in any format with Meridiem in a format and the time is before midday", () => {
  expect(
    stringToDate("2021 05/02 7:25:13 a", "Y DD/MM HH:mm:ss a").getTime()
  ).toBe(new Date("02/05/2021 7:25:13").getTime());
});
test("Should return date object Year, Month, Day, hours and seconds in any format with Meridiem in A format and the time is after midday at 12", () => {
  expect(
    stringToDate("2021 05/02 12:25:13 P", "Y DD/MM HH:mm:ss A").getTime()
  ).toBe(new Date("02/05/2021 12:25:13").getTime());
});
test("Should return date object Year, Month, Day, hours and seconds in any format with Meridiem in A format and the time is after midday", () => {
  expect(
    stringToDate("2021 05/02 2:25:13 P", "Y DD/MM HH:mm:ss A").getTime()
  ).toBe(new Date("02/05/2021 14:25:13").getTime());
});
test("Should return date object Year, Month, Day, hours and seconds in any format with Meridiem in A format and the time is before midday at 12", () => {
  expect(
    stringToDate("2021 05/02 12:25:13 A", "Y DD/MM HH:mm:ss A").getTime()
  ).toBe(new Date("02/05/2021 00:25:13").getTime());
});
test("Should return date object Year, Month, Day, hours and seconds in any format with Meridiem in A format and the time is before midday", () => {
  expect(
    stringToDate("2021 05/02 7:25:13 A", "Y DD/MM HH:mm:ss A").getTime()
  ).toBe(new Date("02/05/2021 7:25:13").getTime());
});
test("Should return date object Year, Month, Day, hours and seconds in any format with Meridiem in aa format and the time is after midday at 12", () => {
  expect(
    stringToDate("2021 05/02 12:25:13 pm", "Y DD/MM HH:mm:ss aa").getTime()
  ).toBe(new Date("02/05/2021 12:25:13").getTime());
});
test("Should return date object Year, Month, Day, hours and seconds in any format with Meridiem in aa format and the time is after midday", () => {
  expect(
    stringToDate("2021 05/02 2:25:13 pm", "Y DD/MM HH:mm:ss aa").getTime()
  ).toBe(new Date("02/05/2021 14:25:13").getTime());
});
test("Should return date object Year, Month, Day, hours and seconds in any format with Meridiem in aa format and the time is before midday at 12", () => {
  expect(
    stringToDate("2021 05/02 12:25:13 am", "Y DD/MM HH:mm:ss aa").getTime()
  ).toBe(new Date("02/05/2021 00:25:13").getTime());
});
test("Should return date object Year, Month, Day, hours and seconds in any format with Meridiem in aa format and the time is before midday", () => {
  expect(
    stringToDate("2021 05/02 7:25:13 am", "Y DD/MM HH:mm:ss aa").getTime()
  ).toBe(new Date("02/05/2021 7:25:13").getTime());
});
test("Should return date object Year, Month, Day, hours and seconds in any format with Meridiem in AA format and the time is after midday at 12", () => {
  expect(
    stringToDate("2021 05/02 12:25:13 AM", "Y DD/MM HH:mm:ss AA").getTime()
  ).toBe(new Date("02/05/2021 00:25:13").getTime());
});
test("Should return date object Year, Month, Day, hours and seconds in any format with Meridiem in AA format and the time is after midday", () => {
  expect(
    stringToDate("2021 05/02 2:25:13 PM", "Y DD/MM HH:mm:ss AA").getTime()
  ).toBe(new Date("02/05/2021 14:25:13").getTime());
});
test("Should return date object Year, Month, Day, hours and seconds in any format with Meridiem in AA format and the time is before midday at 12", () => {
  expect(
    stringToDate("2021 05/02 12:25:13 AM", "Y DD/MM HH:mm:ss AA").getTime()
  ).toBe(new Date("02/05/2021 00:25:13").getTime());
});
test("Should return date object Year, Month, Day, hours and seconds in any format with Meridiem in AA format and the time is before midday", () => {
  expect(
    stringToDate("2021 05/02 7:25:13 AM", "Y DD/MM HH:mm:ss AA").getTime()
  ).toBe(new Date("02/05/2021 7:25:13").getTime());
});
