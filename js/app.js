document.addEventListener("DOMContentLoaded", () => {

  // ===== MENU =====
  const menu = document.getElementById("menu");
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (menu && menuBtn) {
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
  }

  document.addEventListener("DOMContentLoaded", () => {

  const images = document.querySelectorAll(".scroll-gallery img");
  let currentIndex = 0;

  // LIGHTBOX
  const lightbox = document.createElement("div");
  lightbox.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.95);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    flex-direction: column;
  `;
  document.body.appendChild(lightbox);

  // IMAGE
  const img = document.createElement("img");
  img.style.cssText = `
    max-width: 90%;
    max-height: 80%;
    border-radius: 12px;
    transition: transform 0.25s ease, opacity 0.25s ease;
  `;
  lightbox.appendChild(img);

  // COUNTER
  const counter = document.createElement("div");
  counter.style.cssText = `
    color: white;
    margin-top: 10px;
    font-size: 14px;
    opacity: 0.8;
  `;
  lightbox.appendChild(counter);

  // NAV BUTTONS
  const prevBtn = document.createElement("div");
  const nextBtn = document.createElement("div");

  [prevBtn, nextBtn].forEach(btn => {
    btn.style.cssText = `
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 42px;
      color: white;
      cursor: pointer;
      user-select: none;
      padding: 10px;
    `;
    lightbox.appendChild(btn);
  });

  prevBtn.style.left = "20px";
  nextBtn.style.right = "20px";

  prevBtn.innerHTML = "‹";
  nextBtn.innerHTML = "›";

  // CLOSE BUTTON
  const closeBtn = document.createElement("div");
  closeBtn.innerHTML = "✕";
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 25px;
    font-size: 30px;
    color: white;
    cursor: pointer;
  `;
  lightbox.appendChild(closeBtn);

  // OPEN IMAGE
  function openImage(index) {
    currentIndex = index;

    img.style.opacity = 0;

    setTimeout(() => {
      img.src = images[index].src;
      img.style.opacity = 1;
      counter.textContent = `${index + 1} / ${images.length}`;
    }, 150);

    lightbox.style.display = "flex";
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    openImage(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openImage(currentIndex);
  }

  // CLICK IMAGE OPEN
  images.forEach((image, i) => {
    image.style.cursor = "pointer";
    image.addEventListener("click", () => openImage(i));
  });

  // BUTTONS
  nextBtn.addEventListener("click", nextImage);
  prevBtn.addEventListener("click", prevImage);
  closeBtn.addEventListener("click", () => lightbox.style.display = "none");

  // CLICK OUTSIDE CLOSE
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });

  // KEYBOARD
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display !== "flex") return;

    if (e.key === "Escape") lightbox.style.display = "none";
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });

  // SWIPE SUPPORT (MOBILE)
  let startX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) nextImage();
    if (endX - startX > 50) prevImage();
  });

  // ZOOM
  let zoomed = false;

  img.addEventListener("click", () => {
    zoomed = !zoomed;
    img.style.transform = zoomed ? "scale(1.6)" : "scale(1)";
  });

});
