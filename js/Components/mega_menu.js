window.addEventListener("load", function () {
  const sideMenuLinks = document.querySelectorAll(".sidemenu-link");
  const activeClass = "active";

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
      const openSection = document.getElementById(linksSection);
      openSection.classList.add(activeClass);
    });
  });
});
