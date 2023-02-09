// Custom mouse functionality

document.body.onmousemove = function (e) {
  document.getElementById("cursor")!.style.setProperty("left", e.clientX + window.scrollX + "px");
  document.getElementById("cursor")!.style.setProperty("top", e.clientY + window.scrollY + "px");
};

export {};
