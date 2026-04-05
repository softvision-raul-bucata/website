const menu = document.getElementById("menu");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelectorAll(".nav-links a");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
    menu.classList.remove("active");
  }
});
