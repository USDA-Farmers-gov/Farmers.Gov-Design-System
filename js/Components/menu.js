window.addEventListener('load', function(){
    let boolStrMap = { }

    let megamenuButtons = document.querySelectorAll('.accordion-button.nav-link');
    if(megamenuButtons) {
        [...megamenuButtons].map( elm => {

            let submenu = elm.nextElementSibling;

            elm.addEventListener('click', (evt) => {
                evt.preventDefault();
                let elmExpanded = elm.getAttribute('aria-expanded');
                let submenuHidden = submenu.getAttribute('aria-hidden');
                elm.classList.toggle('submenu-item-active');

                if (elmExpanded == 'false') {
                    elm.setAttribute('aria-expanded', 'true');
                    submenu.setAttribute('aria-hidden','false');
                } else {
                    elm.setAttribute('aria-expanded', 'false');
                    submenu.setAttribute('aria-hidden','true');
                }
            })
        })
    }

    let submenuItems = document.querySelectorAll('.nav-submenu > .has-submenu');
    if(submenuItems) {
        [...submenuItems].map( elm => {
            elm.addEventListener('click', (evt) => {
                evt.preventDefault();
                [...submenuItems].map( elm2 => {
                    elm2.classList.remove('submenu-item-active');
                })
                elm.classList.toggle('submenu-item-active');
            })
        })
    }

    let govBannerButton = document.querySelector('button.usa-accordion-button.usa-banner-button');
    if (govBannerButton) {
        govBannerButton.addEventListener('click', function (evt) {
          var ariaVal = govBannerButton.getAttribute('aria-expanded');
          var banner = document.querySelector('#usa-gov-web-banner #gov-banner');
          var newVal = ariaVal === 'true' ? 'false' : 'true';
          var hideContainer = newVal === 'false' ? 'true' : 'false';
          govBannerButton.setAttribute('aria-expanded', newVal);
          banner.setAttribute('aria-hidden', hideContainer);
        });
    }
})