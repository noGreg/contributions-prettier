const app = document.getElementById("app");
const [calendarWrapper, optionsBar] = render(["div", 2], app);

const contributions = {
  "6/5/2021": 3,
  "6/6/2021": 2,
  "6/7/2021": 1,
  "6/8/2021": 1,
  "6/10/2021": 1,
  "6/12/2021": 1,
  "6/13/2021": 2,
  "7/1/2021": 1,
  "7/8/2021": 3,
  "7/9/2021": 2,
  "8/19/2021": 1,
  "12/21/2021": 2,
  "2/24/2022": 2,
  "2/25/2022": 4,
  "2/28/2022": 2,
  "3/2/2022": 2,
  "3/3/2022": 1,
  "3/4/2022": 2,
  "3/7/2022": 1,
  "3/8/2022": 2,
  "3/9/2022": 2,
  "4/17/2022": 3,
  "4/25/2022": 4,
  "4/27/2022": 1,
  "4/28/2022": 1,
  "4/30/2022": 3,
  "5/1/2022": 2,
  "5/6/2022": 2,
  "5/8/2022": 1,
  "5/15/2022": 4,
  "5/16/2022": 1,
  "5/18/2022": 1,
  "6/2/2022": 1,
};

const calendar = new GitHubCalendar(calendarWrapper, contributions);

calendar.init();

/**
 * Action Buttons
 */

optionsBar.css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "1px solid rgb(48, 54, 61)",
  padding: "10px 0"
});

const pencilButton = render("div", optionsBar).css({
  height: "40px",
  width: "40px",
  borderRadius: "50%",
  backgroundColor: "#0d1117",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "25px",
  border: "5px solid rgb(48, 54, 61)",
  cursor: "pointer"
});

pencilButton.textContent = "🖋";

pencilButton.onclick = () => {
  if (calendar.config.editMode) { 
    calendar.setEditModeOff();
    pencilButton.css({ backgroundColor: "#0d1117" });
  } else {
    calendar.setEditModeOn();
    pencilButton.css({ backgroundColor: "#e67e22" });
  }
}
