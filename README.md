# Contributions prettier

The objective of this project is to re-create a contributions calendar, as GitHub one does, but use it as playground for draw forms over it. 

I will use this functionality to create an Electron app, where you can simulate this board into different ways and colors. Much more comes to my mind but let's see what happens. I use this project to learn and practice more, from algorithms to new enviroments such as Desktop apps.

**Progress demo**

![Progress demo](./src/images/progress-1.jpg)

This is a copy my contributions board status. 

**You can try it out by following bellow steps:**

1. Go to a GitHub profile page.
2. Open browser inspector by pressing `F12` in your keyboard, also using shortcuts such as `fn + F12` or `Ctrl + Shift + i`.
3. Copy/paste code below in the console. The object will be copied automatically.
4. Use object as second parameter for `GitHubCalendar` class instance, located in `main.js` file.

```JavaScript
    const calendar = document.querySelector(".js-calendar-graph-svg");
    const wrapper = calendar.children[0];
    const contributions = {};

    for(let i = 0; i < wrapper.children.length; i++) {
        const child = wrapper.children[i];
        
        if (child.tagName !== "g") continue;
        
        for(let j = 0; j < child.children.length; j++) {
            const date = child.children[j];
            const year = +date.getAttribute("data-date").split("-")[0];
            const month = +date.getAttribute("data-date").split("-")[1];
            const day = +date.getAttribute("data-date").split("-")[2];
            const formattedDate = new Date(year, month - 1, day);
            const level = +date.getAttribute("data-level");

            if (level === 0) continue;
            
            contributions[formattedDate.toLocaleDateString("EN")] = level;
        }
    }

    copy(JSON.stringify(contributions));
    console.warn("COPIED!");
```

**Project stack (What do I use?)**
- CSS Grid
- JavaScript

**Any feedback?? 🤔 (Create issues)** 😏 

I will appreciate any feedbacks you could give me. Thanks

