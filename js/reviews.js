function renderStars(rating) {
    const fullStars = Math.round(rating || 0);
    return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  }
  
  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  
  function initReviews() {
    const reviewsContainer = document.getElementById("reviews-container");
    const businessNameEl = document.getElementById("review-business-name");
    const ratingEl = document.getElementById("review-rating");
    const reviewLinkEl = document.getElementById("google-review-link");
  
    if (!reviewsContainer) return;
  
    // REPLACE THESE TWO VALUES
    const PLACE_ID = "YOUR_GOOGLE_PLACE_ID";
    const GOOGLE_MAPS_REVIEW_URL = "YOUR_GOOGLE_BUSINESS_REVIEW_LINK";
  
    reviewLinkEl.href = GOOGLE_MAPS_REVIEW_URL;
  
    const hiddenMap = document.getElementById("hidden-map");
  
    const map = new google.maps.Map(hiddenMap, {
      center: { lat: 43.6532, lng: -79.3832 },
      zoom: 12,
    });
  
    const service = new google.maps.places.PlacesService(map);
  
    service.getDetails(
      {
        placeId: PLACE_ID,
        fields: ["name", "rating", "reviews", "url"],
      },
      (place, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK || !place) {
          ratingEl.textContent = "Unable to load Google reviews right now.";
          reviewsContainer.innerHTML =
            '<div class="review-placeholder">Reviews could not be loaded. Double-check your API key, Place ID, billing, and enabled APIs.</div>';
          return;
        }
  
        businessNameEl.textContent = place.name || "Apex Advisory";
  
        if (place.url) {
          reviewLinkEl.href = place.url;
        }
  
        if (place.rating) {
          ratingEl.textContent = `${place.rating} / 5 on Google`;
        } else {
          ratingEl.textContent = "Google rating not available yet.";
        }
  
        if (!place.reviews || place.reviews.length === 0) {
          reviewsContainer.innerHTML =
            '<div class="review-placeholder">No public reviews found for this business yet.</div>';
          return;
        }
  
        const topReviews = place.reviews.slice(0, 6);
  
        reviewsContainer.innerHTML = topReviews
          .map((review) => {
            const author = escapeHtml(review.author_name || "Google User");
            const text = escapeHtml(review.text || "No written review provided.");
            const stars = renderStars(review.rating || 0);
            const date = review.time
              ? new Date(review.time * 1000).toLocaleDateString()
              : "";
  
            return `
              <article class="review-card">
                <h3>${author}</h3>
                <p>${text}</p>
                <div class="meta">
                  <span class="review-stars">${stars}</span>
                  <span>${date}</span>
                </div>
              </article>
            `;
          })
          .join("");
      }
    );
  }