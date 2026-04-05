document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // BURGER MENU
  // =========================
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

  // =========================
  // IMAGE LIGHTBOX
  // =========================
  const images = document.querySelectorAll(".scroll-gallery img");
  let currentIndex = 0;

  if (images.length > 0) {

    const lightbox = document.createElement("div");
    lightbox.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.95);
      display: none;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      z-index: 99999;
    `;
    document.body.appendChild(lightbox);

    const img = document.createElement("img");
    img.style.cssText = `
      max-width: 90%;
      max-height: 80%;
      border-radius: 12px;
      position: relative;
      z-index: 2;
    `;
    lightbox.appendChild(img);

    const counter = document.createElement("div");
    counter.style.cssText = `
      color: white;
      margin-top: 10px;
      font-size: 14px;
      z-index: 2;
    `;
    lightbox.appendChild(counter);

    function makeBtn(text, side) {
      const btn = document.createElement("div");
      btn.innerHTML = text;
      btn.style.cssText = `
        position: absolute;
        top: 50%;
        ${side}: 20px;
        transform: translateY(-50%);
        font-size: 45px;
        color: white;
        cursor: pointer;
        z-index: 999999;
        user-select: none;
        background: rgba(255,255,255,0.1);
        width: 55px;
        height: 55px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      `;
      lightbox.appendChild(btn);
      return btn;
    }

    const prev = makeBtn("‹", "left");
    const next = makeBtn("›", "right");

    const close = document.createElement("div");
    close.innerHTML = "✕";
    close.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 30px;
      color: white;
      cursor: pointer;
      z-index: 999999;
    `;
    lightbox.appendChild(close);

    function openImage(i) {
      currentIndex = i;
      img.src = images[i].src;
      counter.textContent = `${i + 1} / ${images.length}`;
      lightbox.style.display = "flex";
    }

    function nextImage() {
      openImage((currentIndex + 1) % images.length);
    }

    function prevImage() {
      openImage((currentIndex - 1 + images.length) % images.length);
    }

    images.forEach((image, i) => {
      image.style.cursor = "pointer";
      image.addEventListener("click", () => openImage(i));
    });

    next.addEventListener("click", nextImage);
    prev.addEventListener("click", prevImage);

    close.addEventListener("click", () => {
      lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  }

  // =========================
  // VIDEO LIGHTBOX
  // =========================
  const videos = document.querySelectorAll(".scroll-gallery video");

  if (videos.length > 0) {

    const vLightbox = document.createElement("div");
    vLightbox.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.95);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 99999;
    `;
    document.body.appendChild(vLightbox);

    const container = document.createElement("div");
    container.style.cssText = `
      max-width: 90%;
      max-height: 80%;
    `;
    vLightbox.appendChild(container);

    function openVideo(src) {
      container.innerHTML = "";

      const video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.style.cssText = `
        width: 100%;
        max-height: 80vh;
        border-radius: 12px;
      `;

      container.appendChild(video);
      vLightbox.style.display = "flex";
    }

    videos.forEach(v => {
      v.style.cursor = "pointer";

      v.addEventListener("click", () => {
        const src = v.querySelector("source")?.src;
        if (src) openVideo(src);
      });
    });

    vLightbox.addEventListener("click", (e) => {
      if (e.target === vLightbox) {
        vLightbox.style.display = "none";
        container.innerHTML = "";
      }
    });
  }

});
