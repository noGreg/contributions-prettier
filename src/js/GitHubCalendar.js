class GitHubCalendar {
  constructor(parent, contributions) {
    this.parent = parent;
    this.contributions = contributions;

    this.config = {
      weeks: 53 * 2
    }
  }

  init() {
    this.parent.innerHTML = "";

    const table = render("div", this.parent).css({
      display: "flex",
      width: "890px",
      border: "1px solid #30363d",
      borderRadius: "5px",
      padding: "10px 0 0 10px",
    });

    const dayLabels = render("div", table).css({
      display: "grid",
      gridTemplateRows: "repeat(7, 12px)",
      gap: "4px",
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

    const rightContentWrapper = render("div", table).css({
      // display: "flex",
      overflowX: "auto"
    });

    const contentWrap = render("div", rightContentWrapper).css({ 
      display: "flex",
      flexFlow: "column"
    });

    this.monthLabelsWrap = render("div", contentWrap).css({
      display: "grid",
      gridTemplateColumns: `repeat(${this.config.weeks}, 12px)`,
      gap: "4px",
      maxWidth: "896px",
      marginBottom: "5px",
    });


    this.gridWrapper = render("div", contentWrap).css({
      display: "grid",
      gridTemplateColumns: `repeat(${this.config.weeks}, 12px)`,
      gap: "4px",
      height: "130px",
    });

    this.renderBoard();
  }

  renderBoard() {
    let currentYear = new Date().getFullYear() - 1;

    const currentMonth = new Date().getMonth();
    const firstDate = this.firstSundayQuest(
      new Date(currentYear, currentMonth, new Date().getDate() + 1)
    );
    const firstMonth = firstDate.getMonth();
    const monthsLength = 24;
    const weekIncrement = this.config.weeks / monthsLength;

    let weekWrapper = this.createWeek();
    let month = firstMonth;
    let weekThrotle = 0;

    for (
      let currentWeek = 0;
      currentWeek <= this.config.weeks;
      currentWeek += weekIncrement
    ) {
      const daysQty = new Date(currentYear, month + 1, 0).getDate();
      const firstDay = month === currentMonth ? firstDate.getDate() : 1;
      const realMonth = month % 12;
      const monthName = new Date(0, realMonth).toString().split(" ")[1];

      for (let day = firstDay; day <= daysQty; day++) {
        const date = new Date(currentYear, realMonth, day);

        this.setDay({ date, parent: weekWrapper });

        if (
          (firstDate.getFullYear() + 2) === currentYear &&
          realMonth === currentMonth &&
          date.getDate() === new Date().getDate()
        )
          {
            console.log(firstDate.getFullYear(), currentYear);
            break;
          }

        weekThrotle++;

        if (weekThrotle === 1) {
          if (day === 1) this.setMonthLabel(monthName, month);
          if (day <= daysQty - 14 && firstMonth === date.getMonth()) this.setMonthLabel(monthName, month);
        }

        if (weekThrotle === 7) {
          weekWrapper = this.createWeek();
          weekThrotle = 0;

          if (day <= 7) this.setMonthLabel(monthName, month);
          else if (day !== daysQty && firstMonth !== date.getMonth())
            this.setMonthLabel();
          else if (
            day !== daysQty &&
            day > 22 &&
            firstMonth === date.getMonth()
          )
            this.setMonthLabel();
        }

        day === daysQty && month++;
      }

      realMonth === 11 && currentYear++;
    }
  }

  setDay({ date, parent }) {
    const contribution = this.contributions[date.toLocaleDateString("EN")];

    const levels = {
      0: "#161b22",
      1: "#0e4429",
      2: "#006d32",
      3: "#26a641",
      4: "#39d353",
    };

    render("div", parent).css({
      backgroundColor: contribution ? levels[contribution] : levels[0],
      height: "100%",
      width: "100%",
      borderRadius: "2px",
    }).title = date.toDateString();
  }

  createWeek() {
    return render("div", this.gridWrapper).css({
      display: "grid",
      gap: "5px",
      gridTemplateRows: "repeat(7, 12px)",
    });
  }

  setMonthLabel(label = false, month = 0) {
    let gridName = !label ? "." : label + month;

    let area =
      this.monthLabelsWrap.style.gridTemplateAreas || `"${gridName + " "}"`;

    this.monthLabelsWrap.style.gridTemplateAreas = area
      .replace('"', ",")
      .replace('"', `${" " + gridName}"`)
      .replace(",", '"');

    if (gridName !== ".")
      render("div", this.monthLabelsWrap).css({
        gridArea: gridName,
      }).textContent = label;
  }

  firstSundayQuest(date) {
    const dayName = date.toString().split(" ")[0];

    if (dayName === "Sun") return date;

    return this.firstSundayQuest(
      new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
    );
  }

  setContributions(contributions) {
    this.contributions = contributions;
    this.init();
  }
}
