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

  const thumbsUpBtn = document.querySelector(".card-modal__thumb--up");
  const thumbsDownBtn = document.querySelector(".card-modal__thumb--down");

  // We'll store the current movie's ID here (if provided by the API)
  let currentMovieId = null;

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

    // optional: reset button visual state
    if (thumbsUpBtn) thumbsUpBtn.classList.remove("is-active");
    if (thumbsDownBtn) thumbsDownBtn.classList.remove("is-active");
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  // Attach click handlers to mood cards
  cards.forEach(card => {
    card.addEventListener("click", async () => {
      const mood = card.dataset.mood;   // e.g. "freaky-but-chic"
      const title = card.dataset.title; // fallback

      if (!mood) {
        console.warn("Card clicked without data-mood", card);
        return;
      }

      modalTitle.textContent = title || "Loading...";
      modalDescription.textContent = "Summoning a movie from the void...";
      openModal();

      try {
        const response = await fetch(`/api/movies/${mood}`);
        const data = await response.json();

        if (!response.ok) {
          modalDescription.textContent = data.error || "No movie found for that mood.";
          return;
        }

        // Expecting your API to return a movie document with _id, title, description, etc.
        currentMovieId = data._id || null;

        modalTitle.textContent = data.title || title || "Untitled Horror";
        modalDescription.textContent =
          data.description ||
          data.overview ||
          "This movie is so mysterious, even the database is scared.";

      } catch (err) {
        console.error("Error fetching movie:", err);
        modalDescription.textContent = "Server error fetching movie.";
      }
    });
  });

  // Skeleton thumbs interactions
  function handleVote(direction) {
    if (!currentMovieId) {
      console.log("No movie loaded yet, but vote clicked:", direction);
      return;
    }

    console.log(`User voted '${direction}' for movie ID:`, currentMovieId);

    // OPTIONAL: future API call – you can wire this later
    // fetch(`/api/movies/${currentMovieId}/vote`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ vote: direction })
    // });

    // Simple UI feedback: toggle active class
    if (direction === "up") {
      thumbsUpBtn.classList.add("is-active");
      thumbsDownBtn.classList.remove("is-active");
    } else {
      thumbsDownBtn.classList.add("is-active");
      thumbsUpBtn.classList.remove("is-active");
    }
  }

  if (thumbsUpBtn) {
    thumbsUpBtn.addEventListener("click", () => handleVote("up"));
  }

  if (thumbsDownBtn) {
    thumbsDownBtn.addEventListener("click", () => handleVote("down"));
  }
});

