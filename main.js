const app = document.getElementById("app");

const table = render("div", app).css({
  display: "flex",
  flexFlow: "column",
});

const monthLabels = render("div", table).css({
  paddingLeft: "31px",
  display: "grid",
  gridTemplateColumns: "repeat(53, 12px)",
  gap: "5px",
  maxWidth: "896px",
});

const contentWrap = render("div", table).css({ display: "flex" });

const dayLabels = render("div", contentWrap).css({
  display: "grid",
  gridTemplateRows: "repeat(7, 12px)",
  gap: "5px",
  marginRight: "5px",
  fontSize: "13.5px",
});

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

weekDays.forEach(
  (l, i) =>
    (render("div", dayLabels).css({
      height: "100%",
      display: "flex",
      alignItems: "center",
    }).textContent = i % 2 === 1 ? l : "")
);

const grid = render("div", contentWrap).css({
  display: "grid",
  gridTemplateColumns: "repeat(53, 12px)",
  gap: "5px",
  height: "150px",
});

const setMOnthLabel = (label = false) => {
  if (!label) label = ".";

  let area = monthLabels.style.gridTemplateAreas || `"${label + " "}"`;

  monthLabels.style.gridTemplateAreas = area
    .replace('"', ",")
    .replace('"', `${" " + (area === '". "' ? "" : label)}"`)
    .replace(",", '"');

  if (label !== ".")
    render("div", monthLabels).css({
      gridArea: label,
    }).textContent = label;
};

const createWeek = () =>
  render("div", grid).css({
    display: "grid",
    gap: "5px",
    gridTemplateRows: "repeat(7, 12px)",
  });

const colors = [
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#16a085",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#ecf0f1",
  "#95a5a6",
  "#7f8c8d",
];

let currentYear = new Date().getFullYear() - 1;
let weekThrotle = 0;
let week = createWeek();

const currentMonth = new Date().getMonth();
const firstDate = firstSundayQuest(new Date(currentYear, currentMonth + 1, 1));
const firstMonth = firstDate.getMonth();
const limit = Math.abs(firstMonth - 12) + firstMonth * 2;

for (let month = firstMonth; month <= limit; month++) {
  const daysQty = new Date(currentYear, month + 1, 0).getDate();
  const firstDay = month === currentMonth ? firstDate.getDate() : 1;
  const realMonth = month % 12;
  const monthName = new Date(0, realMonth).toString().split(" ")[1];

  for (let day = firstDay; day <= daysQty; day++) {
    const date = new Date(currentYear, realMonth, day);

    render("div", week).css({
      backgroundColor: colors[realMonth],
      height: "100%",
      width: "100%",
      borderRadius: "3px",
    }).title = date.toDateString();

    if (
      firstDate.getFullYear() !== currentYear &&
      realMonth === currentMonth &&
      date.getDate() === new Date().getDate()
    )
      break;

    weekThrotle++;

    if (weekThrotle === 1 && day === 1) setMOnthLabel(monthName);
    if (weekThrotle === 1 && month === firstMonth && firstDay >= 7)
      setMOnthLabel();
    if (weekThrotle === 7) {
      week = createWeek();
      weekThrotle = 0;

      if (day < 7) setMOnthLabel(monthName);
      else if (day !== daysQty) setMOnthLabel();
    }
  }

  if (realMonth === 11) currentYear++;
}
