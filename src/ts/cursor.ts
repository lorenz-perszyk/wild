// Custom mouse functionality
document.documentElement.addEventListener("mousemove", (e) => {
  const cursor = document.getElementById("cursor")!;
  cursor.style.setProperty("left", e.clientX + window.scrollX + "px");
  cursor.style.setProperty("top", e.clientY + window.scrollY + "px");
});

// Hide cursor when leaving window
document.documentElement.addEventListener("mouseleave", () => {
  const cursor = document.getElementById("cursor")!;
  // cursor.classList.add("hidden");
  cursor.style.opacity = "0";
  cursor.style.scale = "0";
});
// Show cursor when leaving window
document.documentElement.addEventListener("mouseenter", () => {
  const cursor = document.getElementById("cursor")!;
  // cursor.classList.remove("hidden");
  cursor.style.opacity = "1";
  cursor.style.scale = "1";
});

// Add cursor hover effect on images
// const images = document.getElementsByClassName("image");
// console.log(document.getElementsByName("image"));
// console.log(document.getElementById("image-next"));
// ReactDOM.findDOMNode(<Slider>).getElementsByClassName('image');

/* images.forEach((image) => {
  return image.addEventListener("mouseenter", (e: MouseEvent) => {
    e.preventDefault();
    const cursor = document.getElementById("cursor")!;
    cursor.style.width = "40px";
    cursor.style.height = "40px";
  });
}); */

export {};
