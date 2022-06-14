class Bar {
    constructor(parent, config) {
        this.parent = parent;
        this.config = config;
    }

    load() {
        this.parent.css({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "1px solid rgb(48, 54, 61)",
            padding: "10px 0"
        });

        this.config.buttons.map(btn => this.renderButton(btn));        
    }

    renderButton(btn) {
        const pencilButton = render("div", this.parent).css({
            height: "40px",
            width: "40px",
            borderRadius: "50%",
            backgroundColor: btn.background,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "25px",
            border: "5px solid rgb(48, 54, 61)",
            cursor: "context-menu"
        });
        
        pencilButton.textContent = btn.icon;
        pencilButton.onclick = () => btn.onclick(pencilButton);
    }
}