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
  document.addEventListener("DOMContentLoaded", () => {

  const images = Array.from(document.querySelectorAll(".scroll-gallery img"));
  const videos = Array.from(document.querySelectorAll(".scroll-gallery video"));

  // BUILD UNIFIED MEDIA LIST
  const media = [
    ...images.map(el => ({ type: "img", src: el.src })),
    ...videos.map(el => ({ type: "video", src: el.querySelector("source").src }))
  ];

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
    flex-direction: column;
    z-index: 9999;
  `;
  document.body.appendChild(lightbox);

  // MEDIA CONTAINER
  const container = document.createElement("div");
  container.style.cssText = `
    max-width: 90%;
    max-height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  lightbox.appendChild(container);

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

  // CLOSE
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

  let currentVideo = null;

  // OPEN MEDIA
  function openMedia(index) {
    currentIndex = index;

    container.innerHTML = "";

    const item = media[index];

    counter.textContent = `${index + 1} / ${media.length}`;

    if (item.type === "img") {
      const img = document.createElement("img");
      img.src = item.src;
      img.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        border-radius: 12px;
      `;
      container.appendChild(img);
    }

    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.controls = true;
      video.autoplay = true;
      video.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        border-radius: 12px;
      `;
      container.appendChild(video);
      currentVideo = video;
    }

    lightbox.style.display = "flex";
  }

  function nextMedia() {
    stopVideo();
    currentIndex = (currentIndex + 1) % media.length;
    openMedia(currentIndex);
  }

  function prevMedia() {
    stopVideo();
    currentIndex = (currentIndex - 1 + media.length) % media.length;
    openMedia(currentIndex);
  }

  function stopVideo() {
    if (currentVideo) {
      currentVideo.pause();
      currentVideo = null;
    }
  }

  // CLICK EVENTS
  images.forEach((el, i) => {
    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
      const index = media.findIndex(m => m.type === "img" && m.src === el.src);
      openMedia(index);
    });
  });

  videos.forEach((el, i) => {
    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
      const src = el.querySelector("source").src;
      const index = media.findIndex(m => m.type === "video" && m.src === src);
      openMedia(index);
    });
  });

  nextBtn.addEventListener("click", nextMedia);
  prevBtn.addEventListener("click", prevMedia);

  closeBtn.addEventListener("click", () => {
    stopVideo();
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      stopVideo();
      lightbox.style.display = "none";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display !== "flex") return;

    if (e.key === "Escape") {
      stopVideo();
      lightbox.style.display = "none";
    }
    if (e.key === "ArrowRight") nextMedia();
    if (e.key === "ArrowLeft") prevMedia();
  });

  // SWIPE
  let startX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) nextMedia();
    if (endX - startX > 50) prevMedia();
  });

});
