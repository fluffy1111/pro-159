AFRAME.registerComponent("cursor-listener", {
    schema: {
      selectedItemId: { default: "", type: "string" },
    },
    init: function () {
      this.handleMouseEnterEvents();
      this.handleMouseLeaveEvents();
    },
    handleMouseEnterEvents: function () {
      //Cursor 'mouseenter' Events
      this.el.addEventListener("mouseenter", () => {
      const id = this.el.getAttribute("id");
      const comicId = ["superman", "spiderman", "captain-aero", "outer-space"];
      if (comicId.includes(id)) {
        const comicContainer = document.querySelector("#places-container");
        comicContainer.setAttribute("cursor-listener", {
          selectedItemId: id,
        });
        this.el.setAttribute("meterial", {
            color: "#1565c0"
        })
        }
      });
    },
    handleMouseLeaveEvents: function () {
      //Cursor 'mouseleave' Events
      this.el.addEventListener("mouseleave", () => {
        const { selectedItemId } = this.data;
        if (selectedItemId) {
          const el = document.querySelector(`#${selectedItemId}`);
          const id = el.getAttribute("id");
          if (id == selectedItemId) {
            el.setAttribute("material", {
              color: "#0077CC",
              opacity: 1,
            });
          }
        }
      });
    },
    handleMouseClickEvents: function () {
      if (selectedItemId) {
        fadeBackgroundEl.setAttribute("visible", true);
        fadeBackgroundEl.setAttribute("info-banner", {
          comicId: selectedItemId,
        });
        titleEl.setAttribute("visible", false);
        cursorEl.setAttribute("position", { x: 0, y: 0, z: -1});
        cursorEl.setAttribute("geometry", {
          radiusInner: 0.03,
          radiusOuter: 0.04,
        });
      } else {
        fadeBackgroundEl.setAttribute("visible", false);
        titleEl.setAttribute("visible", true);
        cursorEl.setAttribute("position", { x: 0, y: 0, z: -3});
        cursorEl.setAttribute("geometry", {
          radiusInner: 0.08,
          radiusOuter: 0.12,
        });
      }
    },
    update: function () {
        const fadeBackgroundEl = document.querySelector("#fadeBackground");

        c = fadeBackgroundEl.children;
        if (c.length > 0) {
            var i;
            for (i =0; i <= c.length; i++) {
                fadeBackgroundEl.removeChild(c[i]);
            }
        } else {
            this.handleMouseClickEvents();
        }
    },
  });