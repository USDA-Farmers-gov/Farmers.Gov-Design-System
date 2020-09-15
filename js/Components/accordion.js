window.addEventListener("load", function () {
  function panelWidthFix(accordionBlock, accordionTarget) {
    if (!!accordionTarget) {
      const targetPanel = accordionTarget.nextSibling.nextElementSibling;
      const offset =
        (accordionTarget.parentElement.offsetLeft - accordionBlock.offsetLeft) *
          -1 +
        "px";

      targetPanel.style.marginLeft = offset;
      targetPanel.style.width = `${accordionBlock.offsetWidth - 20}px`;
    }
  }

  window.addEventListener("resize", function () {
    panelWidthFix();
  });

  setBoxAccordionTopHeight();

  Array.prototype.slice
    .call(document.querySelectorAll(".Accordion"))
    .forEach(function (accordion) {
      // Allow for multiple accordion sections to be expanded at the same time
      var allowMultiple = false; // we don't want multiple accordion sections to be expanded at the same time

      // Allow for each toggle to both open and close individually
      var allowToggle = accordion.hasAttribute("data-allow-toggle");

      // Create the array of toggle elements for the accordion group
      var triggers = [...accordion.querySelectorAll(".Accordion-trigger")];
      var panels = [...accordion.querySelectorAll(".Accordion-panel")];

      triggers.map((target) => {
        panelWidthFix(accordion, target);
      });

      accordion.addEventListener("click", function (event) {
        var target = event.target;
        target.parentElement.parentElement.classList.contains(
          "Accordion-trigger"
        )
          ? (target = target.parentElement.parentElement)
          : target.parentElement.classList.contains("Accordion-trigger")
          ? (target = target.parentElement)
          : ""; // Kind of a hack to set target element correctly

        if (target.classList.contains("Accordion-trigger")) {
          // Check if the current toggle is expanded.
          var isExpanded = target.getAttribute("aria-expanded") == "true";
          var active = accordion.querySelector('[aria-expanded="true"]');

          // without allowMultiple, close the open accordion
          if (!allowMultiple && active && active !== target) {
            // Set the expanded state on the triggering element
            active.setAttribute("aria-expanded", "false");
            // Hide the accordion sections, using aria-controls to specify the desired section
            document
              .getElementById(active.getAttribute("aria-controls"))
              .setAttribute("hidden", "");

            // When toggling is not allowed, clean up disabled state
            if (!allowToggle) {
              active.removeAttribute("aria-disabled");
            }
          }

          if (!isExpanded) {
            document
              .querySelectorAll(".box-accordion-top")
              .forEach((accordion) =>
                accordion.setAttribute("aria-expanded", false)
              );
            document
              .querySelectorAll(".Accordion-panel")
              .forEach((accordion) => accordion.setAttribute("hidden", true));

            // Set the expanded state on the triggering element
            target.setAttribute("aria-expanded", "true");

            // Hide the accordion sections, using aria-controls to specify the desired section
            document
              .getElementById(target.getAttribute("aria-controls"))
              .removeAttribute("hidden");

            // If toggling is not allowed, set disabled state on trigger
            if (!allowToggle) {
              target.setAttribute("aria-disabled", "true");
            }
          } else if (allowToggle && isExpanded) {
            // Set the expanded state on the triggering element
            target.setAttribute("aria-expanded", "false");
            // Hide the accordion sections, using aria-controls to specify the desired section
            document
              .getElementById(target.getAttribute("aria-controls"))
              .setAttribute("hidden", "");
          }

          event.preventDefault();
        }

        let activePanel = panels.filter((el) => !el.hasAttribute("hidden"))[0];
        activePanel
          ? activePanel.scrollIntoView({
              behavior: "smooth",
            })
          : "";
      });

      // Bind keyboard behaviors on the main accordion container
      accordion.addEventListener("keydown", function (event) {
        var target = event.target;
        var key = event.which.toString();

        var isExpanded = target.getAttribute("aria-expanded") == "true";
        var allowToggle = allowMultiple
          ? allowMultiple
          : accordion.hasAttribute("data-allow-toggle");

        // 33 = Page Up, 34 = Page Down
        var ctrlModifier = event.ctrlKey && key.match(/33|34/);

        // Is this coming from an accordion header?
        if (target.classList.contains("Accordion-trigger")) {
          // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
          // 38 = Up, 40 = Down
          if (key.match(/38|40/) || ctrlModifier) {
            var index = triggers.indexOf(target);
            var direction = key.match(/34|40/) ? 1 : -1;
            var length = triggers.length;
            var newIndex = (index + length + direction) % length;

            triggers[newIndex].focus();

            event.preventDefault();
          } else if (key.match(/35|36/)) {
            // 35 = End, 36 = Home keyboard operations
            switch (key) {
              // Go to first accordion
              case "36":
                triggers[0].focus();
                break;
              // Go to last accordion
              case "35":
                triggers[triggers.length - 1].focus();
                break;
            }
            event.preventDefault();
          } else if (key.match(/32|13/)) {
            // 13 = Enter, 32 = Space keyboard operations
            event.preventDefault();
            target.click();
          }
        }
      });

      // These are used to style the accordion when one of the buttons has focus
      accordion
        .querySelectorAll(".Accordion-trigger")
        .forEach(function (trigger) {
          trigger.addEventListener("focus", function (event) {
            // accordion.classList.add('focus');
            event.target.classList.add("focus");
          });

          trigger.addEventListener("blur", function (event) {
            accordion.classList.remove("focus");
            event.target.classList.remove("focus");
          });
        });

      // Minor setup: will set disabled state, via aria-disabled, to an
      // expanded/ active accordion which is not allowed to be toggled close
      if (!allowToggle) {
        // Get the first expanded/ active accordion
        var expanded = accordion.querySelector('[aria-expanded="true"]');

        // If an expanded/ active accordion is found, disable
        if (expanded) {
          expanded.setAttribute("aria-disabled", "true");
        }
      }
    });

  window.addEventListener("resize", () => {
    [...document.querySelectorAll(".Accordion")].map((accordion) => {
      [...accordion.querySelectorAll(".Accordion-trigger")].map((target) => {
        panelWidthFix(accordion, target);
      });
    });
    setBoxAccordionTopHeight();
  });

  let accordion_card_array = [...document.querySelectorAll(".Card-Accordion")];
  let accordion_card_content_links_array = [
    ...document.querySelectorAll(".card-accordion-content a"),
  ];

  accordion_card_content_links_array.map((link) => {
    link.setAttribute("tabindex", "-1");
  });

  accordion_card_array.map((cardAccordion) => {
    cardAccordion.addEventListener("click", (evt) => {
      toggleAccordion(evt, cardAccordion);
    });

    cardAccordion.addEventListener("keydown", (evt) => {
      if (evt.keyCode.match(/32|13/)) {
        evt.preventDefault();
        toggleAccordion(evt, cardAccordion);
      }
    });
  });

  function toggleAccordion(evt, cardAccordion) {
    var target = evt.target;
    target.parentElement.parentElement.parentElement.classList.contains(
      "Card-Accordion"
    )
      ? (target = target.parentElement.parentElement.parentElement)
      : target.parentElement.parentElement.classList.contains("Card-Accordion")
      ? (target = target.parentElement.parentElement)
      : target.parentElement.classList.contains("Card-Accordion")
      ? (target = target.parentElement)
      : "";

    if (target.querySelector(".card-accordion-content")) {
      let content_links = cardAccordion.querySelectorAll(
        ".card-accordion-content a"
      );

      target
        .querySelector(".Card-Accordion .card-accordion")
        .classList.toggle("show");
      target
        .querySelector(".card-accordion-toggle > a")
        .classList.toggle("card-accordion-show-less");

      if (
        target
          .querySelector(".Card-Accordion .card-accordion")
          .classList.contains("show")
      ) {
        for (let i = 0; i < content_links.length; i++)
          content_links[i].setAttribute("tabindex", "0");

        target.scrollIntoView({
          behavior: "smooth",
        });
        target.querySelector(".card-accordion-toggle > a").innerHTML =
          "Show Less";
      } else {
        for (let i = 0; i < content_links.length; i++)
          content_links[i].setAttribute("tabindex", "-1");
        target.querySelector(".card-accordion-toggle > a").innerHTML =
          "Show More";
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }
  function setBoxAccordionTopHeight() {
    Array.prototype.slice
      .call(document.querySelectorAll(".box-accordion-top"))
      .forEach(function (boxAccordion) {
        setTimeout(setHeight, 100);

        function setHeight() {
          let height = boxAccordion.getBoundingClientRect().height;
          boxAccordion.style.height =
            window.innerWidth >= 760 ? height + "px" : null;
        }
      });
  }
});
