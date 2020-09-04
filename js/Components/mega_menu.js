window.addEventListener("load", function () {
  const main = document.querySelector(".primary-nav-wrap.megamenu");
  if (!!main) {
    mainNav(main);
    sideMenu();
  }
});

function mainNav(main) {
  const links = main.querySelectorAll(".nav-link");
  const activeClass = "active";

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const megaMenuId = event.currentTarget.getAttribute("aria-controls");
      const activePanel = document.querySelector(
        `.nav-mega-menu[aria-controls=${megaMenuId}]`
      );

      const allPanels = document.querySelectorAll(
        ".nav-mega-menu-links-container"
      );
      const sideMenuLinks = activePanel.querySelectorAll(".sidemenu li a");

      allPanels.forEach((panel) => {
        panel.classList.remove(activeClass);
      });

      activePanel
        .querySelector(".nav-mega-menu-links-container")
        .classList.add(activeClass);

      if (sideMenuLinks) {
        sideMenuLinks.forEach((link, index) => {
          index === 0
            ? link.classList.add(activeClass)
            : link.classList.remove(activeClass);
        });
      }
    });
  });
}

function sideMenu() {
  const sideMenuLinks = document.querySelectorAll(".sidemenu-link");
  const activeClass = "active";

  if (sideMenuLinks) {
    sideMenuLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = event.target;
        const linksSection = target.getAttribute("data-mega-menu-section");

        const activeContainers = document.querySelectorAll(
          `.nav-mega-menu-links-container.${activeClass}`
        );
        const activeLinks = document.querySelectorAll(
          `.sidemenu-link.${activeClass}`
        );

        activeContainers.forEach((activeContainer) => {
          activeContainer.classList.remove(activeClass);
        });
        activeLinks.forEach((activeLink) => {
          activeLink.classList.remove(activeClass);
        });

        target.classList.add(activeClass);
        document.getElementById(linksSection).classList.add(activeClass);
      });
    });
  }
}
