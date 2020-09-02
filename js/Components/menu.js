window.addEventListener("load", function () {
    const helper = (element, className) => {
        if (!!element) {
            if (element.classList.contains(className)) {
                return element;
            } else {
                return helper(element.parentElement, className);
            }
        }
    };

    let submenuButtons = document.querySelectorAll(
        ".accordion-button.nav-link"
    );
    if (submenuButtons) {
        [...submenuButtons].map((elm) => {
            let submenu = elm.nextElementSibling;

            elm.addEventListener("click", (evt) => {
                evt.preventDefault();
                let elmExpanded = elm.getAttribute("aria-expanded");
                let submenuHidden = submenu.getAttribute("aria-hidden");

                //remove existing submenus
                let openSubmenus = document.querySelectorAll(
                    ".submenu-item-active"
                );
                [...openSubmenus].map((el) => {
                    el.setAttribute("aria-expanded", false);
                    el.classList.remove("submenu-item-active");
                });

                // reveal appropriate submenu
                if (elmExpanded == "false") {
                    elm.classList.add("submenu-item-active");
                    elm.setAttribute("aria-expanded", "true");
                    submenu.setAttribute("aria-hidden", "false");
                } else {
                    elm.classList.remove("submenu-item-active");
                    elm.setAttribute("aria-expanded", "false");
                    submenu.setAttribute("aria-hidden", "true");
                }
            });

            elm.addEventListener("keyup", (event) => {
                if (event.key == " " || event.key == "Enter") {
                    event.preventDefault();
                    elm.click();
                }
            });
        });
    }

    let submenuItems = document.querySelectorAll(".nav-submenu > .has-submenu");
    if (submenuItems) {
        [...submenuItems].map((elm) => {
            elm.addEventListener("click", (evt) => {
                evt.preventDefault();
                [...submenuItems].map((elm2) => {
                    elm2.classList.remove("submenu-item-active");
                });
                elm.classList.toggle("submenu-item-active");
            });
        });
    }

    let govBannerButtons = document.querySelectorAll(
        "button.usa-accordion-button.usa-banner-button"
    );
    if (govBannerButtons) {
        [...govBannerButtons].map((item) => {
            item.addEventListener("click", (evt) => {
                evt.preventDefault();
                evt.stopPropagation();

                let ariaVal = item.getAttribute("aria-expanded");
                let banner = helper(
                    item.parentElement,
                    "usa-accordion"
                ).querySelector('div[id^="gov-banner"]');
                let newVal = ariaVal == "true" ? "false" : "true";
                let hideContainer = newVal == "false" ? "true" : "false";

                helper(item.parentElement, "usa-accordion")
                    .querySelector(".usa-banner-header")
                    .classList.toggle("usa-banner-header-expanded");

                item.setAttribute("aria-expanded", newVal);
                banner.setAttribute("aria-hidden", hideContainer);
            });
        });
    }
});
