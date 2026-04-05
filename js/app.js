document.addEventListener("DOMContentLoaded", () => {

  // ===== MENU =====
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

  // ===== GALLERY LIGHTBOX =====
  const images = document.querySelectorAll(".scroll-gallery img");

  console.log("Gallery images found:", images.length);

  const lightbox = document.createElement("div");
  lightbox.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.9);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;
  document.body.appendChild(lightbox);

  const img = document.createElement("img");
  img.style.cssText = `
    max-width: 90%;
    max-height: 80%;
  `;
  lightbox.appendChild(img);

  function open(src) {
    img.src = src;
    lightbox.style.display = "flex";
  }

  images.forEach((image) => {
    image.style.cursor = "pointer";

    image.addEventListener("click", () => {
      open(image.src);
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

});
