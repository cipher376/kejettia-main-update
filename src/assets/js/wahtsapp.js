$(document).on("click", "#whatsapp-popup", function () {
    $(".whatsapp-wrapper").toggleClass("hide-whatsapp show-whatsapp");
    setTimeout(function () {
        $(".loading-animation").hide();
        $(".whatsapp-message-wrapper").css("display", "flex").hide().fadeIn("slow");
    }, 1000);
});

$(document).on("click", ".close_whatsapp", function () {
    $("#whatsapp-chat");
    $(".whatsapp-wrapper").toggleClass("hide-whatsapp show-whatsapp");
});

