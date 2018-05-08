const jiraToReport = require("./../jira-reports-file.json");
const { getColombiaHolidaysByYear } = require('colombia-holidays');

const currentDate = new Date();

const possibleWork = require("./../possible-work.json");

const weekdays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday"
];

const getWeekNumber = () => {
  const startingDate = getStartDateFromJiraFile();
  let diff =(new Date().getTime() - startingDate.getTime()) / 1000;
  let weekDiff = diff / (60 * 60 * 24 * 7);
  let weekNumber = Math.abs(Math.ceil(weekDiff));
  let sprintWeek = getSprintWeek(weekNumber);
  return 'week' + sprintWeek;
};

const getSprintWeek = (weekNumber) => {
  let totalWeeks = getNumberOfWeeksInSprint();
  for (let i = totalWeeks; i > 0 ; i--) {
    if ((weekNumber % i) === 0) {
      return i;
    }
  }
};

const getStartDateFromJiraFile = () => {
  let splitDates = jiraToReport.firstDayToReportAt.split("/");
  const day = Number(splitDates[0]);
  const month = Number(splitDates[1]) - 1;
  const year = Number(splitDates[2]);
  return new Date(year, month, day);
};

const getTimeToReportAt = (time) => {
  const hour = Number(time.split("h")[0]);
  const minutesInString = time.split("h ")[1];
  const minutes = Number(minutesInString.split("m")[0]);
  return currentDate.setHours(hour, minutes);
};

const getNumberOfWeeksInSprint = () => {
  const jiraFileProperties = Object.getOwnPropertyNames(jiraToReport);
  let totalWeeks = 0;

  jiraFileProperties.forEach((propertie) => {
    if (propertie.includes("week")){ totalWeeks++ };
  });
  return totalWeeks;
};

const getIssues = () => {
  const issues = [];
  let jiraIssue;

  for (issue in jiraToReport[week][today])
  {
    jiraIssue = jiraToReport[week][today][issue];
    if (jiraIssue.timeSpentJIRA !== "" && jiraIssue.timeSpentJIRA !== undefined){
      possibleWork[issue].timeSpentJIRA = jiraIssue.timeSpentJIRA;

      if (jiraIssue.comment !== "" && jiraIssue.comment !== undefined){
        possibleWork[issue].comment = jiraIssue.comment;

        if (jiraIssue.hasOwnProperty("startTime")){
          possibleWork[issue].startDate = getTimeToReportAt(jiraIssue.startTime);
        }
        else {
          possibleWork[issue].startDate = currentDate.setHours(8, 0);
        }
        possibleWork[issue].project = jiraToReport.project;
        issues.push(possibleWork[issue]);
      }
    }
  }
  return issues;
};

const isWorkingDay = () => {
  if (currentDate.getDay() === 6) {
      return false
  }
  if (currentDate.getDay() === 0) {
      return false
  }
  const isHoliday = getColombiaHolidaysByYear(currentDate.getFullYear())
      .map(holiday => holiday.holiday)
      .includes(currentDate.toISOString().split('T')[0]);
  return !isHoliday;
}

const today = weekdays[currentDate.getDay() - 1];
const week = getWeekNumber();

module.exports = {
  getIssues,
  isWorkingDay
};
