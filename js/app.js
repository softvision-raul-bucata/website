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
  let touchStartX = 0;
  let touchEndX = 0;

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
      pointer-events: none;
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
        transition: background 0.2s;
      `;
      btn.addEventListener("mouseenter", () => {
        btn.style.background = "rgba(255,255,255,0.25)";
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.background = "rgba(255,255,255,0.1)";
      });
      lightbox.appendChild(btn);
      return btn;
    }

    const prev = makeBtn("&#8249;", "left");
    const next = makeBtn("&#8250;", "right");

    const closeImg = document.createElement("div");
    closeImg.innerHTML = "&#10005;";
    closeImg.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 30px;
      color: white;
      cursor: pointer;
      z-index: 999999;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
      transition: background 0.2s;
    `;
    closeImg.addEventListener("mouseenter", () => {
      closeImg.style.background = "rgba(255,255,255,0.25)";
    });
    closeImg.addEventListener("mouseleave", () => {
      closeImg.style.background = "rgba(255,255,255,0.1)";
    });
    lightbox.appendChild(closeImg);

    function openImage(i) {
      currentIndex = i;
      img.src = images[i].src;
      counter.textContent = `${i + 1} / ${images.length}`;
      lightbox.style.display = "flex";
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.style.display = "none";
      document.body.style.overflow = "";
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

    next.addEventListener("click", (e) => {
      e.stopPropagation();
      nextImage();
    });

    prev.addEventListener("click", (e) => {
      e.stopPropagation();
      prevImage();
    });

    closeImg.addEventListener("click", (e) => {
      e.stopPropagation();
      closeLightbox();
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Touch/swipe support
    lightbox.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextImage();
        } else {
          prevImage();
        }
      }
    }, { passive: true });

    // Keyboard support
    document.addEventListener("keydown", (e) => {
      if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closeLightbox();
      }
    });
  }

  // =========================
// VIDEO LIGHTBOX (UPDATED)
// =========================
const videos = document.querySelectorAll(".scroll-gallery video");

let currentVideoIndex = 0;

if (videos.length > 0) {

  const vLightbox = document.createElement("div");
  vLightbox.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.95);
    display: none;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 99999;
  `;
  document.body.appendChild(vLightbox);

  const container = document.createElement("div");
  container.style.cssText = `
    position: relative;
    max-width: 90%;
    max-height: 80%;
  `;
  vLightbox.appendChild(container);

  // Counter
  const counter = document.createElement("div");
  counter.style.cssText = `
    color: white;
    margin-top: 10px;
    font-size: 14px;
  `;
  vLightbox.appendChild(counter);

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
      background: rgba(255,255,255,0.1);
      width: 55px;
      height: 55px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    `;
    vLightbox.appendChild(btn);
    return btn;
  }

  const prev = makeBtn("&#8249;", "left");
  const next = makeBtn("&#8250;", "right");

  // Close button
  const closeVid = document.createElement("div");
  closeVid.innerHTML = "&#10005;";
  closeVid.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 30px;
    color: white;
    cursor: pointer;
    z-index: 999999;
  `;
  vLightbox.appendChild(closeVid);

  function getVideoSrc(videoEl) {
    const sourceEl = videoEl.querySelector("source");
    return sourceEl
      ? sourceEl.getAttribute("src")
      : videoEl.getAttribute("src");
  }

  function openVideo(index) {
    currentVideoIndex = index;

    container.innerHTML = "";

    const video = document.createElement("video");
    video.src = getVideoSrc(videos[index]);
    video.controls = true;
    video.autoplay = true;
    video.style.cssText = `
      width: 100%;
      max-height: 80vh;
      border-radius: 12px;
    `;

    container.appendChild(video);

    counter.textContent = `${index + 1} / ${videos.length}`;

    vLightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeVideoLightbox() {
    vLightbox.style.display = "none";
    container.innerHTML = "";
    document.body.style.overflow = "";
  }

  function nextVideo() {
    openVideo((currentVideoIndex + 1) % videos.length);
  }

  function prevVideo() {
    openVideo((currentVideoIndex - 1 + videos.length) % videos.length);
  }

  videos.forEach((v, i) => {
    v.controls = false;
    v.style.cursor = "pointer";

    v.addEventListener("click", (e) => {
      e.preventDefault();
      v.pause();
      openVideo(i);
    });
  });

  next.addEventListener("click", (e) => {
    e.stopPropagation();
    nextVideo();
  });

  prev.addEventListener("click", (e) => {
    e.stopPropagation();
    prevVideo();
  });

  closeVid.addEventListener("click", (e) => {
    e.stopPropagation();
    closeVideoLightbox();
  });

  vLightbox.addEventListener("click", (e) => {
    if (e.target === vLightbox) {
      closeVideoLightbox();
    }
  });

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (vLightbox.style.display === "flex") {
      if (e.key === "ArrowRight") nextVideo();
      if (e.key === "ArrowLeft") prevVideo();
      if (e.key === "Escape") closeVideoLightbox();
    }
  });
}

});
