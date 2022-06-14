const app = document.getElementById("app");
const [calendarWrapper, optionsBar, infoContainer] = render(["div", 3], app);

/**
 * Calendar instance setup
 */

const calendar = new GitHubCalendar(calendarWrapper, contributions);

calendar.init();

/*
 * Bar instance setup
 */

const bar = new Bar(optionsBar, {
  buttons: [
    {
      icon: "🖋", 
      background: "#0d1117",
      title: "Edit mode",
      onclick: (btn) => {
        if (calendar.config.editMode) { 
          calendar.setEditModeOff();
          btn.css({ backgroundColor: "#0d1117" });
        } else {
          calendar.setEditModeOn();
          btn.css({ backgroundColor: "#e67e22" });
        }
      }
    }
  ]
});

bar.load();

/**
 * Info section
 */

infoContainer.css({ 
  display: "flex", 
  flexFlow: "column",
  padding: "20px",
  fontSize: "initial"
});

const [first, second] = render(["div", 2],  infoContainer);

first.textContent = "* Use left click to draw points";
second.textContent = "* Use right click to erase";