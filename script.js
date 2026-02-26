document.addEventListener("DOMContentLoaded", () => {
  const pins = document.querySelectorAll(".pin");
  const modal = document.getElementById("modal");
  // Находим внутренний белый блок модалки для анимации "вырастания"
  const modalContent = modal.querySelector(".modal-content");
  const closeBtn = document.querySelector(".close-btn");

  const mImg = document.getElementById("m-img");
  const mTitle = document.getElementById("m-title");
  const mText = document.getElementById("m-text");
  const mBtn = document.getElementById("m-btn");

  let currentOriginalText = "";
  let currentAiText = "";
  let isOriginal = false;

  // 🔵 Плавное открытие модалки
  const openModal = () => {
    // 1. Сначала делаем блок видимым в DOM
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    // 2. Даем браузеру миллисекунду на отрисовку, затем запускаем анимацию CSS
    setTimeout(() => {
      modal.classList.remove("opacity-0"); // Проявляем темный фон
      modalContent.classList.remove("scale-95", "opacity-0");
      modalContent.classList.add("scale-100", "opacity-100"); // Увеличиваем карточку
    }, 10);
  };

  // 🔴 Плавное закрытие модалки
  const closeModal = () => {
    // 1. Запускаем обратную анимацию исчезновения
    modalContent.classList.remove("scale-100", "opacity-100");
    modalContent.classList.add("scale-95", "opacity-0");
    modal.classList.add("opacity-0");

    // 2. Ждем 300 миллисекунд (пока идет анимация duration-300 в CSS), затем скрываем из DOM
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }, 300);
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
        mImg.src = ""; // Очищаем src на всякий случай
      }

      // Текст (добавил немного стилей для заголовков внутри)
      mText.innerHTML = `<b class="text-gray-900 block mb-2">ИИ инструкция:</b>${currentAiText}`;

      isOriginal = false;
      // В новом дизайне у нас внутри кнопки SVG-иконка, давай сохраним ее при сбросе текста
      mBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clip-rule="evenodd" />
        </svg>
        Оригинальная инструкция
      `;

      openModal();
    });
  });

  // 🔁 Переключение текста
  mBtn.addEventListener("click", () => {
    if (!isOriginal) {
      mText.innerHTML = `<b class="text-gray-900 block mb-2">Оригинал:</b>${currentOriginalText}`;
      mBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
          <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.22-.53V2.929a.75.75 0 00-1.5 0v2.43l-.31-.31a7 7 0 00-11.712 3.138.75.75 0 001.449.39 5.5 5.5 0 019.201-2.466l.312.311h-2.433a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.22z" clip-rule="evenodd" />
        </svg>
        Вернуть ИИ версию
      `;
    } else {
      mText.innerHTML = `<b class="text-gray-900 block mb-2">ИИ инструкция:</b>${currentAiText}`;
      mBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clip-rule="evenodd" />
        </svg>
        Оригинальная инструкция
      `;
    }
    isOriginal = !isOriginal;
  });

  // ❌ Закрытие
  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    // Закрываем, только если кликнули по темному фону, а не по самой карточке
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
});
