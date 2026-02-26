document.addEventListener("DOMContentLoaded", () => {
  const pins = document.querySelectorAll(".pin");
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close-btn");

  const mImg = document.getElementById("m-img");
  const mTitle = document.getElementById("m-title");
  const mText = document.getElementById("m-text");
  const mBtn = document.getElementById("m-btn");

  let currentOriginalText = "";
  let currentAiText = "";
  let isOriginal = false;

  // 🔵 Открытие модалки
  const openModal = () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  };

  // 🔴 Закрытие модалки
  const closeModal = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };

  pins.forEach((pin) => {
    pin.addEventListener("click", () => {
      currentAiText = pin.dataset.ai || "";
      currentOriginalText = pin.dataset.original || "";

      mTitle.textContent = pin.dataset.title || "";

      // Картинка
      if (pin.dataset.img) {
        mImg.src = pin.dataset.img;
        mImg.classList.remove("hidden");
      } else {
        mImg.classList.add("hidden");
      }

      // Текст
      mText.innerHTML = `<b>ИИ инструкция:</b><br>${currentAiText}`;

      isOriginal = false;
      mBtn.textContent = "Оригинальная инструкция";

      openModal();
    });
  });

  // 🔁 Переключение текста
  mBtn.addEventListener("click", () => {
    if (!isOriginal) {
      mText.innerHTML = `<b>Оригинал:</b><br>${currentOriginalText}`;
      mBtn.textContent = "Вернуть ИИ версию";
    } else {
      mText.innerHTML = `<b>ИИ инструкция:</b><br>${currentAiText}`;
      mBtn.textContent = "Оригинальная инструкция";
    }
    isOriginal = !isOriginal;
  });

  // ❌ Закрытие
  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
