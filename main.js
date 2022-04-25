const app = document.getElementById("app");
const table = render("div", app).css({ display: "flex" });

const dayLabels = render("div", table).css({ 
    display: "grid",
    gridTemplateRows: "repeat(7, 12px)",
    gap: "5px",
    marginRight: "5px",
    fontSize: "13.5px"
});

[ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
    .forEach((l, i) => {
        render("div", dayLabels)
            .css({ height: "100%", display: "flex", alignItems: "center" })
            .textContent = i%2 === 1 ? l : "";
    });

const grid = render("div", table).css({
    display: "grid",
    gridTemplateColumns: "repeat(53, 12px)",
    gap: "5px",
    height: "150px"
});

const month = new Date().getMonth();
const weekLength = 7;
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
    "#7f8c8d"
];

// [PENDING] Determine the correct sunday to start...

let currentYear = new Date().getFullYear() - 1;
let currentMonth = new Date().getMonth() + 1;
let day = new Date().getDate() + 1;
let weekThrotle = 1; 
let week;

for(let month = 0; month < 12; month++) {
    const daysQty = new Date(currentYear, month, 0).getDate();

    for(let day = 1; day <= daysQty; day++) {
        if (weekThrotle === 7) {
            week = render("div", grid).css({
                display: "grid", 
                gap: "5px",
                gridTemplateRows: "repeat(7, 12px)"
            });

            weekThrotle = 0;
        }

        const date = new Date(currentYear, currentMonth, day);

        render("div", week)
        .css({
            backgroundColor: colors[month],
            height: "100%",
            width: "100%",
            borderRadius: "3px"
        })
        .title = date.toLocaleString();

        weekThrotle++;
    }

    currentMonth++;

    if (currentMonth === 12) {
        currentMonth = 0;
        currentYear++;
    }
}
