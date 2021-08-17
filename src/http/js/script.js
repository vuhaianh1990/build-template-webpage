$(document).ready(function () {
  // Top Header fixed
  var header = document.getElementsByTagName("header")[0];
  window.onscroll = function (e) {
    if (header) header.style.left = -window.pageXOffset + "px";
  };

  var swiper_homepage = new Swiper(".swiper-homepage", {
    direction: "horizontal",
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var thumb_tienich = new Swiper(".thumb-tienich", {
    spaceBetween: 10,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });

  var swiper_tienich = new Swiper(".swiper-tienich", {
    direction: "horizontal",
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: thumb_tienich,
    },
  });

  var thumb_thuvien = new Swiper(".thumb-thuvien", {
    direction: "vertical",
    loop: true,
    spaceBetween: 5,
    slidesPerView: 2,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    loopAdditionalSlides: 0,
    initialSlide: 2,
    //- centeredSlides: true,
    slideToClickedSlide: true,
    speed: 500,
    spaceBetween: 20,
  });

  var menu_thuvien = ["Broshure", "Hình ảnh dự án", "Video"];
  var swiper_thuvien = new Swiper(".swiper-thuvien", {
    direction: "vertical",
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<p class="' + className + '">' + menu_thuvien[index] + "</p>";
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: thumb_thuvien,
    },
  });

  var swiper_tintuc = new Swiper(".swiper-tintuc", {
    direction: "horizontal",
    loop: true,
    // effect: "fade",
    spaceBetween: 6,
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    breakpoints: {
      769: {
        spaceBetween: 12,
        slidesPerView: 3,
      },
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var swiper_detail = new Swiper(".swiper-detail", {
    direction: "horizontal",
    loop: true,
    effect: "fade",
    // spaceBetween: 6,
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


  $(".lst-appartment > li").click(function(e) {
    var index = $(this).index();
    $(".matbang__item").removeClass("active");
    $(".lst-appartment > li").removeClass("active");
    $(".matbang__item:eq("+ index +")").addClass("active")
    $(".lst-appartment > li:eq("+ index +")").addClass("active")
  });



});
