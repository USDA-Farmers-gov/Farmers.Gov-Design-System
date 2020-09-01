window.addEventListener("load", function () {
  const sideMenuLinks = document.querySelectorAll(".sidemenu-link");

  sideMenuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = event.target;
      const linksSection = target.getAttribute("data-mega-menu-section");
      const activeContainers = document.querySelectorAll(
        ".nav-mega-menu-links-container.active"
      );
      const activeLinks = document.querySelectorAll(".sidemenu-link.active");

      activeContainers.forEach((activeContainer) => {
        activeContainer.classList.remove("active");
      });
      activeLinks.forEach((activeLink) => {
        activeLink.classList.remove("active");
      });

      target.classList.add("active");
      const openSection = document.getElementById(linksSection);
      openSection.classList.add("active");
    });
  });
});
