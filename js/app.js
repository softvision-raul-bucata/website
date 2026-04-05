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

// create lightbox
const lightbox = document.createElement("div");
lightbox.style.position = "fixed";
lightbox.style.top = "0";
lightbox.style.left = "0";
lightbox.style.width = "100%";
lightbox.style.height = "100%";
lightbox.style.background = "rgba(0,0,0,0.9)";
lightbox.style.display = "none";
lightbox.style.alignItems = "center";
lightbox.style.justifyContent = "center";
lightbox.style.zIndex = "9999";
document.body.appendChild(lightbox);

const img = document.createElement("img");
img.style.maxWidth = "90%";
img.style.maxHeight = "90%";
img.style.borderRadius = "12px";
lightbox.appendChild(img);

  // click any image
images.forEach(image => {
  image.style.cursor = "pointer";

  image.addEventListener("click", () => {
    img.src = image.src;
    lightbox.style.display = "flex";
    });
  });

  // close on click
lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
  });
});
