var initSideNav = function() {
  function pinSideNav() {
    $(".micro-sidenav-toggler").addClass("active");
    $(".micro-sidenav-toggler").data("action", "micro-sidenav-unpin");
    $("body")
      .removeClass("g-micro-sidenav-hidden")
      .addClass("g-micro-sidenav-show g-micro-sidenav-pinned");
    $("body").append(
      '<div class="backdrop d-xl-none" data-action="micro-sidenav-unpin" data-target=' +
        $("#micro-sidenav-main").data("target") +
        " />"
    );
    Cookies.set("micro-sidenav-state", "pinned");
  }

  function unpinSideNav() {
    $(".micro-sidenav-toggler").removeClass("active");
    $(".micro-sidenav-toggler").data("action", "micro-sidenav-pin");
    $("body")
      .removeClass("g-micro-sidenav-pinned")
      .removeClass("g-micro-sidenav-show")
      .addClass("g-micro-sidenav-hidden");

    $("body")
      .find(".backdrop")
      .remove();
    Cookies.set("micro-sidenav-state", "unpinned");
  }

  var currSideNavState = Cookies.get("micro-sidenav-state")
    ? Cookies.get("micro-sidenav-state")
    : "pinned";

  if ($(window).width() > 1200) {
    if ("pinned" == currSideNavState) {
      pinSideNav();
    } else if ("unpinned" == Cookies.get("micro-sidenav-state")) {
      unpinSideNav();
    }
  }

  $("body").on("click", "[data-action]", function(event) {
    event.preventDefault();

    var self = $(this);
    var i = self.data("action");

    self.data("target");

    switch (i) {
      case "micro-sidenav-pin":
        pinSideNav();
        break;
      case "micro-sidenav-unpin":
        unpinSideNav();
        break;
    }
  });

  $(window).on("load resize", function() {
    if ($("body").height() < 800) {
      $("body").css("min-height", "100vh");
      $("#footer-main").addClass("footer-auto-bottom");
    }
  });
};

initSideNav();
