const app = document.getElementById("app");

const contributions = {
  "4/25/2021": 4,
  "4/28/2021": 1,
  "4/29/2021": 2,
  "5/1/2021": 1,
  "5/2/2021": 1,
  "5/3/2021": 2,
  "5/18/2021": 1,
  "5/19/2021": 2,
  "5/20/2021": 4,
  "5/27/2021": 3,
  "6/5/2021": 2,
  "6/6/2021": 1,
  "6/7/2021": 1,
  "6/8/2021": 1,
  "6/10/2021": 1,
  "6/12/2021": 1,
  "6/13/2021": 1,
  "7/1/2021": 1,
  "7/8/2021": 3,
  "7/9/2021": 1,
  "8/19/2021": 1,
  "12/21/2021": 1,
  "2/24/2022": 2,
  "2/25/2022": 4,
  "2/28/2022": 1,
  "3/2/2022": 1,
  "3/3/2022": 1,
  "3/4/2022": 2,
  "3/7/2022": 1,
  "3/8/2022": 2,
  "3/9/2022": 2,
  "4/17/2022": 3,
  "4/25/2022": 3,
  "4/27/2022": 1,
  "4/28/2022": 1,
};

const calendar = new GitHubCalendar(app, contributions);

calendar.init();
