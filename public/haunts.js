// // (function () {
// //   const modal = document.getElementById('card-modal');
// //   if (!modal) return;

// //   const titleElement = document.getElementById('card-modal-title');
// //   const descriptionElement = document.getElementById('card-modal-description');
// //   const closeButton = modal.querySelector('.card-modal__close');
// //   let lastFocusedElement = null;

// //   const closeModal = () => {
// //     modal.classList.add('hidden');
// //     modal.setAttribute('aria-hidden', 'true');
// //     if (lastFocusedElement) {
// //       lastFocusedElement.focus({ preventScroll: true });
// //       lastFocusedElement = null;
// //     }
// //   };

// //   const openModal = (title, description) => {
// //     lastFocusedElement = document.activeElement;
// //     titleElement.textContent = title || 'Madlib Title';
// //     descriptionElement.textContent = description || 'Swap this with your own content.';
// //     modal.classList.remove('hidden');
// //     modal.removeAttribute('aria-hidden');
// //     closeButton.focus({ preventScroll: true });
// //   };

// //   document.querySelectorAll('.recipe').forEach((card) => {
// //     card.addEventListener('click', () => {
// //       const { title, description } = card.dataset;
// //       openModal(title, description);
// //     });

// //     card.addEventListener('keydown', (event) => {
// //       if (event.key === 'Enter' || event.key === ' ') {
// //         event.preventDefault();
// //         card.click();
// //       }
// //     });
// //   });

// //   modal.addEventListener('click', (event) => {
// //     if (event.target === modal) {
// //       closeModal();
// //     }
// //   });

// //   closeButton.addEventListener('click', closeModal);

// //   document.addEventListener('keydown', (event) => {
// //     if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
// //       closeModal();
// //     }
// //   });
// // })();

// document.addEventListener("DOMContentLoaded", () => {
//   const cards = document.querySelectorAll(".recipe");

//   const modal = document.getElementById("card-modal");
//   const modalTitle = document.getElementById("card-modal-title");
//   const modalDescription = document.getElementById("card-modal-description");
//   const modalClose = document.querySelector(".card-modal__close");

//   if (!modal || !modalTitle || !modalDescription) {
//     console.error("Modal elements not found in DOM.");
//     return;
//   }

//   // Open / close helpers
//   function openModal() {
//     modal.classList.remove("hidden");
//   }

//   function closeModal() {
//     modal.classList.add("hidden");
//   }

//   if (modalClose) {
//     modalClose.addEventListener("click", closeModal);
//   }

//   // Attach click handlers to each card
//   cards.forEach(card => {
//     card.addEventListener("click", async () => {
//       const mood = card.dataset.mood;   // e.g. "bloody-sad"
//       const title = card.dataset.title; // fallback title

//       if (!mood) {
//         console.warn("Card clicked without data-mood", card);
//         return;
//       }

//       modalTitle.textContent = title || "Loading...";
//       modalDescription.textContent = "Summoning a movie from the void...";
//       openModal();

//       try {
//         const response = await fetch(`/api/movies/${mood}`);
//         const data = await response.json();

//         if (!response.ok) {
//           modalDescription.textContent = data.error || "No movie found for that mood.";
//           return;
//         }

//         // Expecting your API to return a movie document
//         modalTitle.textContent = data.title || title || "Untitled Horror";
//         modalDescription.textContent =
//           data.description ||
//           data.overview ||
//           "This movie is so mysterious, even the database is scared.";

//       } catch (err) {
//         console.error("Error fetching movie:", err);
//         modalDescription.textContent = "Server error fetching movie.";
//       }
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".recipe");

  const modal = document.getElementById("card-modal");
  const modalTitle = document.getElementById("card-modal-title");
  const modalDescription = document.getElementById("card-modal-description");
  const modalClose = document.querySelector(".card-modal__close");
  const addBtn = document.querySelector(".card-modal__add");
  const refreshBtn = document.querySelector(".card-modal__refresh");

  let currentMovieId = null;
  let currentMood = null;

  if (!modal || !modalTitle || !modalDescription) {
    console.error("Modal elements not found in DOM.");
    return;
  }

  function openModal() {
    modal.classList.remove("hidden");
  }

  function closeModal() {
    modal.classList.add("hidden");
    currentMovieId = null;
    currentMood = null;
    if (addBtn) addBtn.classList.remove("is-active");
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  async function loadMovie(mood, fallbackTitle) {
    modalTitle.textContent = fallbackTitle || "Loading...";
    modalDescription.textContent = "Summoning a film from the void...";
    if (addBtn) addBtn.classList.remove("is-active");

    try {
      const response = await fetch(`/api/movies/${mood}`);
      const data = await response.json();

      if (!response.ok) {
        modalDescription.textContent = data.error || "No movie found for that mood.";
        return;
      }

      currentMovieId = data._id || null;
      currentMood = mood;

      modalTitle.textContent = data.title || fallbackTitle || "Untitled Horror";
      modalDescription.textContent =
        data.description ||
        data.overview ||
        "This movie is so mysterious, even the database is scared.";

    } catch (err) {
      console.error("Error fetching movie:", err);
      modalDescription.textContent = "Server error fetching movie.";
    }
  }

  cards.forEach(card => {
    card.addEventListener("click", async () => {
      const mood = card.dataset.mood;
      const title = card.dataset.title;

      if (!mood) {
        console.warn("Card clicked without data-mood", card);
        return;
      }

      openModal();
      await loadMovie(mood, title);
    });
  });

  if (refreshBtn) {
    refreshBtn.addEventListener("click", async () => {
      if (!currentMood) return;
      refreshBtn.classList.add("is-spinning");
      await loadMovie(currentMood);
      refreshBtn.classList.remove("is-spinning");
    });
  }

  async function handleAdd() {
    if (!currentMovieId) return;

    addBtn.classList.add("is-active");

    try {
      const res = await fetch(`/api/movies/${currentMovieId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vote: "up" }),
      });
      const data = await res.json();

      if (!data.saved) {
        showHint("Log in to save films to your haunt");
        addBtn.classList.remove("is-active");
      } else {
        showHint("Added to your haunt 🦴");
      }
    } catch (err) {
      console.error("Vote error:", err);
      addBtn.classList.remove("is-active");
    }
  }

  function showHint(message) {
    let hint = modal.querySelector(".card-modal__vote-hint");
    if (!hint) {
      hint = document.createElement("p");
      hint.className = "card-modal__vote-hint";
      modal.querySelector(".card-modal__actions").after(hint);
    }
    hint.textContent = message;
    hint.style.opacity = "1";
    clearTimeout(hint._timeout);
    hint._timeout = setTimeout(() => { hint.style.opacity = "0"; }, 3000);
  }

  if (addBtn) {
    addBtn.addEventListener("click", handleAdd);
  }
});

