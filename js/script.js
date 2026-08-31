// ===== ДЕМОНСТРАЦИОННЫЕ ДАННЫЕ =====
const DATA = {
  events: [
    {
      id: 1,
      title: 'Открытие сезона "Игра Первых"',
      date: "2026-09-15",
      format: "Офлайн",
      location: "Москва, ВДНХ",
      desc: "Торжественное открытие нового сезона с участием известных спортсменов и интерактивными зонами.",
      type: "Спорт",
    },
    {
      id: 2,
      title: "Кибертурнир по Dota 2",
      date: "2026-09-22",
      format: "Онлайн",
      location: "Платформа CyberArena",
      desc: "Командный турнир среди школьников. Призовой фонд — 100 000 руб.",
      type: "Киберспорт",
    },
    {
      id: 3,
      title: "Мастер-класс по разработке игр",
      date: "2026-10-05",
      format: "Офлайн",
      location: "Казань, IT-парк",
      desc: "Воркшоп по созданию 2D-игр на Unity для начинающих.",
      type: "Образование",
    },
    {
      id: 4,
      title: 'Квиз "Игровая вселенная"',
      date: "2026-10-20",
      format: "Онлайн",
      location: "Zoom-конференция",
      desc: "Интеллектуальная игра по мотивам популярных видеоигр.",
      type: "Интеллект",
    },
  ],
  news: [
    {
      id: 1,
      title: "Старт регистрации на новый сезон",
      date: "2026-08-28",
      preview:
        "Открыта регистрация для участников 14–25 лет. Ждём команды со всей страны!",
    },
    {
      id: 2,
      title: "Партнёрство с VK Play",
      date: "2026-08-20",
      preview:
        "VK Play стал официальным партнёром проекта, предоставит призы и платформу для турниров.",
    },
    {
      id: 3,
      title: "Обновление сайта Игра Первых",
      date: "2026-08-15",
      preview:
        "В мобильном приложении появился раздел с ежедневными заданиями и рейтингом.",
    },
  ],
  library: [
    {
      id: 1,
      title: "Методическое пособие по организации игр",
      type: "pdf",
      desc: "Пошаговое руководство для организаторов мероприятий.",
    },
    {
      id: 2,
      title: "Видео-урок: основы геймдизайна",
      type: "video",
      desc: "Лекция от эксперта индустрии о ключевых принципах проектирования игр.",
    },
    {
      id: 3,
      title: "Шаблон сценария игрового события",
      type: "doc",
      desc: "Готовый шаблон для заполнения при планировании мероприятий.",
    },
    {
      id: 4,
      title: 'Инфографика "История видеоигр"',
      type: "image",
      desc: "Краткая история развития игр в наглядной форме.",
    },
  ],
  feedback: [
    {
      id: 1,
      author: "Алексей",
      text: "Отличный проект! Участвовал в прошлом сезоне, получил море эмоций и новых друзей.",
      date: "2026-08-25",
    },
    {
      id: 2,
      author: "Мария",
      text: "Очень понравился мастер-класс по VR. Хотелось бы больше таких мероприятий в регионах.",
      date: "2026-08-22",
    },
  ],
  partners: [
    { id: 1, name: "VK Play", desc: "Платформа для киберспорта и стриминга" },
    {
      id: 2,
      name: "Российский университет спорта",
      desc: "Образовательный партнёр",
    },
    { id: 3, name: "Сбер", desc: "Технологический партнёр" },
    { id: 4, name: "Движение Первых", desc: "Генеральный партнёр" },
  ],
};

// ===== СОСТОЯНИЕ =====
let state = {
  role: "user", // 'user' или 'admin'
  currentPage: "about",
  events: [...DATA.events],
  news: [...DATA.news],
  library: [...DATA.library],
  feedback: [...DATA.feedback],
  partners: [...DATA.partners],
  nextId: 100,
};

// ===== DOM-ссылки =====
const mainEl = document.getElementById("mainContent");
const modalOverlay = document.getElementById("modalOverlay");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const navLinks = document.querySelectorAll(".nav__link");
const roleUserBtn = document.getElementById("roleUser");
const roleAdminBtn = document.getElementById("roleAdmin");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const nav = document.getElementById("mainNav");

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function generateId() {
  return state.nextId++;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function openModal(html) {
  modalBody.innerHTML = html;
  modalOverlay.classList.add("modal--open");
}

function closeModal() {
  modalOverlay.classList.remove("modal--open");
}

// ===== ОТРИСОВКА СТРАНИЦ =====

function renderPage(pageName) {
  mainEl.innerHTML = "";
  switch (pageName) {
    case "about":
      renderAbout();
      break;
    case "gameplay":
      renderGameplay();
      break;
    case "events":
      renderEvents();
      break;
    case "news":
      renderNews();
      break;
    case "library":
      renderLibrary();
      break;
    case "feedback":
      renderFeedback();
      break;
    case "partners":
      renderPartners();
      break;
    default:
      renderAbout();
  }
}

// ------ О проекте ------
function renderAbout() {
  const html = `
    <div class="page">
      <div class="hero">
        <h1>Игра Первых</h1>
        <p>Всероссийский проект, объединяющий молодёжь через спорт, интеллект и технологии. Создавай, играй, побеждай!</p>
      </div>
      <h2 class="page-title">Наши ценности</h2>
      <div class="feature-grid">
        <div class="feature-item"><img src="img/icons/star.png" alt="Команда" class="custom-icon"><h4>Команда</h4><p>Дружба и взаимопомощь</p></div>
        <div class="feature-item"><img src="img/icons/lightning.png" alt="Творчество" class="custom-icon"><h4>Творчество</h4><p>Создавай новые игры</p></div>
        <div class="feature-item"><img src="img/icons/trophy.png" alt="Победа" class="custom-icon"><h4>Победа</h4><p>Стремление к лучшему</p></div>
        <div class="feature-item"><img src="img/icons/target.png" alt="Развитие" class="custom-icon"><h4>Развитие</h4><p>Технологии будущего</p></div>
      </div>
      <p style="max-width:700px;">Проект «Игра Первых» — это платформа для реализации талантов молодёжи в сфере игровой индустрии, спорта и цифровых технологий. Ежегодно мы проводим десятки мероприятий по всей России.</p>
    </div>
  `;
  mainEl.innerHTML = html;
}

// ------ Игровой процесс ------
function renderGameplay() {
  const html = `
    <div class="page">
      <h2 class="page-title">Игровой процесс</h2>
      <p style="max-width:700px; margin-bottom:20px;">Приложение «Игра Первых» предлагает уникальный игровой опыт, объединяющий соревнования, обучение и социальное взаимодействие.</p>
      <div class="card-grid">
        <div class="card"><div class="card__title">🎮 Онбординг</div><div class="card__desc">После регистрации пользователь проходит интерактивное обучение, создаёт аватар и выбирает направление (спорт, киберспорт, интеллект).</div></div>
        <div class="card"><div class="card__title">🏆 Игровые механики</div><div class="card__desc">Выполняй задания, зарабатывай очки, участвуй в турнирах и поднимайся в рейтинге. Есть PvP и PvE-режимы.</div></div>
        <div class="card"><div class="card__title">📅 Путь игрока</div><div class="card__desc">От новичка до чемпиона: выполняй миссии, открывай достижения, получай награды и приглашения на офлайн-ивенты.</div></div>
        <div class="card"><div class="card__title">📱 Мобильное приложение</div><div class="card__desc">Полноценное приложение для iOS и Android с синхронизацией прогресса, чатами и уведомлениями.</div></div>
      </div>
    </div>
  `;
  mainEl.innerHTML = html;
}

// ------ Мероприятия (с фильтром) ------
function renderEvents() {
  const filterHTML = `
    <div class="filter-bar">
      <label for="eventFilter">Фильтр по формату:</label>
      <select id="eventFilter">
        <option value="all">Все</option>
        <option value="Онлайн">Онлайн</option>
        <option value="Офлайн">Офлайн</option>
      </select>
      <label for="eventSearch">Поиск:</label>
      <input type="text" id="eventSearch" placeholder="Название...">
    </div>
  `;
  mainEl.innerHTML = `<div class="page"><h2 class="page-title">Мероприятия</h2>${filterHTML}<div id="eventList" class="card-grid"></div></div>`;
  applyEventFilters();

  document
    .getElementById("eventFilter")
    .addEventListener("change", applyEventFilters);
  document
    .getElementById("eventSearch")
    .addEventListener("input", applyEventFilters);
}

function applyEventFilters() {
  const filterVal = document.getElementById("eventFilter").value;
  const searchVal = document
    .getElementById("eventSearch")
    .value.toLowerCase()
    .trim();
  let filtered = state.events;
  if (filterVal !== "all") {
    filtered = filtered.filter((e) => e.format === filterVal);
  }
  if (searchVal) {
    filtered = filtered.filter((e) =>
      e.title.toLowerCase().includes(searchVal),
    );
  }
  renderEventCards(filtered);
}

function renderEventCards(events) {
  const container = document.getElementById("eventList");
  if (!container) return;
  if (events.length === 0) {
    container.innerHTML =
      '<p style="grid-column:1/-1; text-align:center;">Мероприятий не найдено</p>';
    return;
  }
  let html = "";
  events.forEach((e) => {
    html += `
      <div class="card">
        <img src="img/icons/calendar.png" alt="Мероприятие" class="custom-icon">
        <div class="card__title">${e.title}</div>
        <div class="card__meta">${formatDate(e.date)} • ${e.format} • ${e.location}</div>
        <div class="card__desc">${e.desc}</div>
        <span class="card__tag">${e.type}</span>
        ${
          state.role === "admin"
            ? `
          <div class="card__actions">
            <button class="btn btn--admin" onclick="editEvent('${e.id}')"><i class="fas fa-edit"></i> Редактировать</button>
            <button class="btn btn--danger" onclick="deleteEvent('${e.id}')"><i class="fas fa-trash"></i></button>
          </div>
        `
            : ""
        }
      </div>
    `;
  });
  container.innerHTML = html;
}
// ------ Новости ------
function renderNews() {
  let html = `<div class="page"><h2 class="page-title">Новости</h2><div class="card-grid">`;
  state.news.forEach((n) => {
    html += `
      <div class="card">
        <img src="img/icons/bell.png" alt="Новость" class="custom-icon">
        <div class="card__title">${n.title}</div>
        <div class="card__meta">📆 ${formatDate(n.date)}</div>
        <div class="card__desc">${n.preview}</div>
        ${
          state.role === "admin"
            ? `
          <div class="card__actions">
            <button class="btn btn--danger" onclick="deleteNews('${n.id}')"><i class="fas fa-trash"></i></button>
          </div>
        `
            : ""
        }
      </div>
    `;
  });
  html += `</div>`;
  if (state.role === "admin") {
    html += `<button class="btn btn--admin" style="margin-top:20px;" onclick="showAddNewsForm()"><i class="fas fa-plus"></i> Добавить новость</button>`;
  }
  html += `</div>`;
  mainEl.innerHTML = html;
}

// ------ Библиотека ------
function renderLibrary() {
  let html = `<div class="page"><h2 class="page-title">Библиотека материалов</h2><div class="library-list">`;
  state.library.forEach((item) => {
    html += `
      <div class="library-item">
        <img src="img/icons/book.png" alt="Материал" class="custom-icon">
        <div class="library-item__info">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
        ${state.role === "admin" ? `<button class="btn btn--danger" onclick="deleteLibrary('${item.id}')"><i class="fas fa-trash"></i></button>` : ""}
      </div>
    `;
  });
  html += `</div>`;
  if (state.role === "admin") {
    html += `<button class="btn btn--admin" style="margin-top:20px;" onclick="showAddLibraryForm()"><i class="fas fa-plus"></i> Добавить материал</button>`;
  }
  html += `</div>`;
  mainEl.innerHTML = html;
}

// ------ Обратная связь ------
function renderFeedback() {
  let html = `<div class="page"><h2 class="page-title">Обратная связь</h2><div class="feedback-list">`;
  state.feedback.forEach((f) => {
    html += `
      <div class="feedback-item">
        <div class="feedback-item__header">
          <span>${f.author}</span>
          <span>${formatDate(f.date)}</span>
        </div>
        <div class="feedback-item__text">${f.text}</div>
        ${state.role === "admin" ? `<button class="btn btn--danger" onclick="deleteFeedback('${f.id}')"><i class="fas fa-trash"></i></button>` : ""}
      </div>
    `;
  });
  html += `</div>`;
  // Форма отправки отзыва (доступна всем)
  html += `
    <div style="margin-top:30px; background:white; padding:20px; border-radius:var(--border-radius); box-shadow:var(--shadow);">
      <h4>Оставить отзыв</h4>
      <form id="feedbackForm">
        <div class="form-group">
          <label>Ваше имя</label>
          <input type="text" id="fbAuthor" placeholder="Иван" required>
        </div>
        <div class="form-group">
          <label>Текст отзыва</label>
          <textarea id="fbText" rows="3" placeholder="Поделитесь впечатлениями..." required></textarea>
        </div>
        <button type="submit" class="btn btn--secondary">Отправить</button>
      </form>
    </div>
  `;
  html += `</div>`;
  mainEl.innerHTML = html;

  document
    .getElementById("feedbackForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const author = document.getElementById("fbAuthor").value.trim();
      const text = document.getElementById("fbText").value.trim();
      if (!author || !text) return;
      state.feedback.push({
        id: generateId(),
        author: author,
        text: text,
        date: new Date().toISOString().slice(0, 10),
      });
      renderPage("feedback");
    });
}

// ------ Партнёры ------
function renderPartners() {
  let html = `
    <div class="page">
      <!-- Заголовок слева (над чёрточкой) -->
      <h2 class="page-title">Партнёры</h2>
      
      <!-- Контейнер для карточек -->
      <div style="display: flex; flex-direction: row; justify-content: flex-start; flex-wrap: wrap; gap: 20px; width: 100%; margin-top: 20px;">`;
      
  state.partners.forEach(p => {
    html += `
      <div style="flex: 1 1 220px; max-width: 300px; background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); text-align: center; display: flex; flex-direction: column; align-items: center;">
        <img src="img/icons/coin.png" alt="Партнёр" class="custom-icon" style="width: 72px; height: 72px; object-fit: contain; margin-bottom: 15px;">
        <h4 style="margin: 0 0 10px 0; font-size: 1.2rem;">${p.name}</h4>
        <p style="font-size: 0.95rem; color: #666; flex-grow: 1; margin: 0 0 15px 0;">${p.desc}</p>
        ${state.role === 'admin' ? `<button class="btn btn--danger" onclick="deletePartner('${p.id}')"><i class="fas fa-trash"></i></button>` : ''}
      </div>
    `;
  });
  
  html += `</div>`;
  
  if (state.role === 'admin') {
    html += `<div style="margin-top: 30px;"><button class="btn btn--admin" onclick="showAddPartnerForm()"><i class="fas fa-plus"></i> Добавить партнёра</button></div>`;
  }
  
  html += `</div>`;
  mainEl.innerHTML = html;
}

// ===== АДМИН-ФУНКЦИИ (CRUD) =====

window.editEvent = function (id) {
  const event = state.events.find((e) => e.id == id);
  if (!event) return;
  openModal(`
    <h3>Редактировать мероприятие</h3>
    <form id="editEventForm">
      <div class="form-group"><label>Название</label><input type="text" id="eeTitle" value="${event.title}" required></div>
      <div class="form-group"><label>Дата</label><input type="date" id="eeDate" value="${event.date}" required></div>
      <div class="form-group"><label>Формат</label><select id="eeFormat"><option value="Онлайн" ${event.format === "Онлайн" ? "selected" : ""}>Онлайн</option><option value="Офлайн" ${event.format === "Офлайн" ? "selected" : ""}>Офлайн</option></select></div>
      <div class="form-group"><label>Место</label><input type="text" id="eeLocation" value="${event.location}"></div>
      <div class="form-group"><label>Описание</label><textarea id="eeDesc" rows="3">${event.desc}</textarea></div>
      <div class="form-group"><label>Тип</label><input type="text" id="eeType" value="${event.type}"></div>
      <div class="form-actions">
        <button type="submit" class="btn">Сохранить</button>
        <button type="button" class="btn btn--outline" onclick="closeModal()">Отмена</button>
      </div>
    </form>
  `);
  document
    .getElementById("editEventForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const updated = {
        id: event.id,
        title: document.getElementById("eeTitle").value,
        date: document.getElementById("eeDate").value,
        format: document.getElementById("eeFormat").value,
        location: document.getElementById("eeLocation").value,
        desc: document.getElementById("eeDesc").value,
        type: document.getElementById("eeType").value,
      };
      const idx = state.events.findIndex((e) => e.id == event.id);
      state.events[idx] = updated;
      closeModal();
      renderPage("events");
    });
};

window.deleteEvent = function (id) {
  if (confirm("Удалить мероприятие?")) {
    state.events = state.events.filter((e) => e.id != id);
    renderPage("events");
  }
};

window.deleteNews = function (id) {
  if (confirm("Удалить новость?")) {
    state.news = state.news.filter((n) => n.id != id);
    renderPage("news");
  }
};

window.deleteLibrary = function (id) {
  if (confirm("Удалить материал?")) {
    state.library = state.library.filter((l) => l.id != id);
    renderPage("library");
  }
};

window.deleteFeedback = function (id) {
  if (confirm("Удалить отзыв?")) {
    state.feedback = state.feedback.filter((f) => f.id != id);
    renderPage("feedback");
  }
};

window.deletePartner = function (id) {
  if (confirm("Удалить партнёра?")) {
    state.partners = state.partners.filter((p) => p.id != id);
    renderPage("partners");
  }
};

// Формы добавления
window.showAddNewsForm = function () {
  openModal(`
    <h3>Добавить новость</h3>
    <form id="addNewsForm">
      <div class="form-group"><label>Заголовок</label><input type="text" id="anTitle" required></div>
      <div class="form-group"><label>Дата</label><input type="date" id="anDate" required></div>
      <div class="form-group"><label>Краткое описание</label><textarea id="anPreview" rows="2"></textarea></div>
      <div class="form-actions">
        <button type="submit" class="btn">Добавить</button>
        <button type="button" class="btn btn--outline" onclick="closeModal()">Отмена</button>
      </div>
    </form>
  `);
  document
    .getElementById("addNewsForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      state.news.push({
        id: generateId(),
        title: document.getElementById("anTitle").value,
        date: document.getElementById("anDate").value,
        preview: document.getElementById("anPreview").value,
      });
      closeModal();
      renderPage("news");
    });
};

window.showAddLibraryForm = function () {
  openModal(`
    <h3>Добавить материал</h3>
    <form id="addLibraryForm">
      <div class="form-group"><label>Название</label><input type="text" id="alTitle" required></div>
      <div class="form-group"><label>Тип</label><select id="alType"><option value="pdf">PDF</option><option value="video">Видео</option><option value="doc">Документ</option><option value="image">Изображение</option></select></div>
      <div class="form-group"><label>Описание</label><textarea id="alDesc" rows="2"></textarea></div>
      <div class="form-actions">
        <button type="submit" class="btn">Добавить</button>
        <button type="button" class="btn btn--outline" onclick="closeModal()">Отмена</button>
      </div>
    </form>
  `);
  document
    .getElementById("addLibraryForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      state.library.push({
        id: generateId(),
        title: document.getElementById("alTitle").value,
        type: document.getElementById("alType").value,
        desc: document.getElementById("alDesc").value,
      });
      closeModal();
      renderPage("library");
    });
};

window.showAddPartnerForm = function () {
  openModal(`
    <h3>Добавить партнёра</h3>
    <form id="addPartnerForm">
      <div class="form-group"><label>Название</label><input type="text" id="apName" required></div>
      <div class="form-group"><label>Описание</label><input type="text" id="apDesc"></div>
      <div class="form-actions">
        <button type="submit" class="btn">Добавить</button>
        <button type="button" class="btn btn--outline" onclick="closeModal()">Отмена</button>
      </div>
    </form>
  `);
  document
    .getElementById("addPartnerForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      state.partners.push({
        id: generateId(),
        name: document.getElementById("apName").value,
        desc: document.getElementById("apDesc").value,
      });
      closeModal();
      renderPage("partners");
    });
};

// ===== НАВИГАЦИЯ =====
function setActivePage(page) {
  state.currentPage = page;
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.page === page);
  });
  renderPage(page);
}

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const page = this.dataset.page;
    setActivePage(page);
    // Закрыть мобильное меню
    nav.classList.remove("nav--open");
  });
});

// ===== РОЛИ =====
function setRole(role) {
  state.role = role;
  roleUserBtn.classList.toggle("role-btn--active", role === "user");
  roleAdminBtn.classList.toggle("role-btn--active", role === "admin");
  renderPage(state.currentPage);
}

roleUserBtn.addEventListener("click", () => setRole("user"));
roleAdminBtn.addEventListener("click", () => setRole("admin"));

// ===== МОБИЛЬНОЕ МЕНЮ =====
mobileMenuBtn.addEventListener("click", () => {
  nav.classList.toggle("nav--open");
});

// ===== МОДАЛЬНОЕ ОКНО =====
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

// ===== СТАРТ =====
setActivePage("about");
