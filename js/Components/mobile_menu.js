
jQuery(function($){
  $(document).ready(function(){
    var is_iPad = navigator.userAgent.match(/iPad/i) != null;

    var isMobile = false; //initialize as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
      isMobile = true;
    }

      // TODO: check if the Math bit here is needed.
    // if (!is_iPad && Math.abs(window.orientation) === 90) {
    if (!is_iPad && isMobile) {
      // This is a bandaid to change the submenu right arrows
      if ((is_iPad && !Math.abs(window.orientation) === 90) || !is_iPad) {
        $('.has-child-arrow').attr('src', '/farmers/img/arrow-right-white.svg').addClass('white-svg');
      }

      // This is a hack to change the mobile menu close icon
      $('.nav-close > img').attr('src', '/farmers/img/close.svg');

      // *********************************
      // Mobile Nav level 2 click handler
      // *********************************
      $('button[aria-controls|=megamenu]').click(function(e){
        console.log(e);
        e.stopPropagation();
        e.preventDefault();
        $(this).attr('aria-expanded', 'true');
        var submenu_clone = $(this).parent().find('.nav-submenu').clone();

        if (!!$('.nav-inner.mobile-nav-lvl-3').length) {

          submenu_clone.attr('aria-hidden', "false");
          $(this).parent().find('.nav-submenu').remove();
          $('.nav-inner.mobile-nav-lvl-3').append(submenu_clone);

        } else {
          $(this).parent().find('.nav-submenu').attr('aria-hidden', "true");
          var parent_menu = $(this).parent().parent().parent().clone();

          $(this).parent().find('.nav-submenu').remove();
          parent_menu.find('.utility-nav, .primary-nav, .search, .callout-button').remove();
          parent_menu.addClass('mobile-nav-lvl-3');
          parent_menu.prepend('<span>Back</span>');
          submenu_clone.attr('aria-hidden', "false");
          parent_menu.append(submenu_clone);
          $('nav.nav.is-visible').append(parent_menu);
        }
        if (!!$('.nav-inner.mobile-nav-lvl-4').length) {
          $(this).parent().parent().parent().css('margin-left', '3rem');
        } else {
          $(this).parent().parent().parent().css('margin-left', '-24rem');
        }

        // $(e.target).trigger(e.type);
      })

      // *********************************
      // Mobile Nav level 3 click handler
      // *********************************
      $(document).on('click', '.nav-submenu li, .nav-submenu li a',function(e){
        if (!!$(this).find('.nav-submenu-submenu').length) {
          e.preventDefault();
          e.stopPropagation();
          $('.nav').addClass('is-visible');
          $('.overlay').addClass('is-visible');

          if (!!$('.nav-inner.mobile-nav-lvl-4').length) {
            $('.nav-inner.mobile-nav-lvl-4').find('.nav-submenu-submenu').remove();
            var submenu_submenu = $(this).find('.nav-submenu-submenu').clone();
            submenu_submenu.show();
            $('.nav-inner.mobile-nav-lvl-4').append(submenu_submenu);
          } else {
            var submenu_clone = $(this).parent().parent().clone();
            submenu_clone.find('.nav-submenu').remove();
            var submenu_submenu = $(this).find('.nav-submenu-submenu').clone();
            submenu_submenu.show();
            submenu_clone.append(submenu_submenu);
            submenu_clone.removeClass('mobile-nav-lvl-3').addClass('mobile-nav-lvl-4');
            $('nav.nav.is-visible').append(submenu_clone);
          }

          $('.nav-inner').first().css('margin-left', '-53rem');
        }
      });

      // *********************************
      // Level 3 back button click handler
      // *********************************
      $(document).on('click', '.nav-inner.mobile-nav-lvl-3 > span', function(e){
        $('.nav-inner button[aria-expanded="true"]').find('.nav-submenu').remove();
        var submenu_clone = $(e.target).parent().find('.nav-submenu');
        submenu_clone.attr('aria-hidden', 'true');
        $('.nav-inner button[aria-expanded="true"]').append(submenu_clone);

        $('.nav-inner button[aria-expanded="true"]').attr('aria-expanded', 'false');
        if (!!$('.nav-inner.mobile-nav-lvl-4').length) {
          $('.nav-inner').first().css('margin-left', '59rem');
        } else {
          $('.nav-inner').first().css('margin-left', '31rem');
        }
      })

      // *********************************
      // Level 4 back button click handler
      // *********************************
      $(document).on('click', '.nav-inner.mobile-nav-lvl-4 > span', function(e){
        $('.nav-inner').first().css('margin-left', '3rem');
      })

      // *********************************
      // 'X' button click handler
      // *********************************
      $(document).on('click', '.menu-btn', function(e){
        // $('.mobile_nav-active').removeClass('mobile_nav-active');
        // $('.overlay').removeClass('is-visible');
        $('.nav').addClass('is-visible');
      })

      $(document).on('click', '.nav-close', function(e){
        // $('.mobile_nav-active').removeClass('mobile_nav-active');
        // $('.overlay').removeClass('is-visible');
        $('.nav').removeClass('is-visible');
      })
    }
  });
});
