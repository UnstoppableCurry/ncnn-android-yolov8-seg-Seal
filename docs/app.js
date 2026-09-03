(function () {
  "use strict";

  var buttons = document.querySelectorAll(".gif-trigger");

  function markLoaded(button) {
    var frame = button.closest("[data-gif-frame]");
    if (frame) {
      frame.classList.add("is-loaded");
    }
    button.setAttribute("hidden", "");
  }

  function loadGif(button) {
    var img = document.getElementById(button.getAttribute("data-target"));
    var src = button.getAttribute("data-gif");
    var label = button.getAttribute("data-label") || "真机录屏";

    if (!img || !src || button.getAttribute("data-busy") === "1") {
      return;
    }

    button.setAttribute("data-busy", "1");
    button.setAttribute("aria-busy", "true");
    button.firstChild.textContent = "正在加载…";

    var request = new Image();
    request.onload = function () {
      img.src = src;
      img.removeAttribute("width");
      img.removeAttribute("height");
      img.alt = label + "循环播放。手持 Android 手机拍摄显示器上的印章，应用叠加检测框与分割掩膜。";
      markLoaded(button);
    };
    request.onerror = function () {
      button.removeAttribute("data-busy");
      button.removeAttribute("aria-busy");
      button.firstChild.textContent = "加载失败，打开原文件";
      button.onclick = function () {
        window.location.href = src;
      };
    };
    request.src = src;
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      loadGif(button);
    });
  });
})();
