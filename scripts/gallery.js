import { fetchMovies } from "./api-handler.js";
/**
 * ============================================================================
 * INICIALIZACE GALERIE
 * Nastavuje posluchače událostí pro filtrování filmů.
 * ============================================================================
 */
export function initGallery() {
    const movieFilter = document.getElementById("movie-filter");
    const movieSearch = document.getElementById("movie-search");
    const galleryGrid = document.getElementById("movie-gallery");
    if (!galleryGrid)
        return;
    /**
     * Společná funkce pro získání dat a vykreslení galerie
     */
    const performSearch = async (query) => {
        if (!query.trim())
            return;
        // Zobrazení stavu načítání
        galleryGrid.innerHTML = '<p class="loading-text">Načítám filmy...</p>';
        const moviesData = await fetchMovies(query);
        renderMovies(moviesData, galleryGrid);
    };
    // 1. Reakce na změnu v roletce (Select)
    movieFilter?.addEventListener("change", (event) => {
        const select = event.target;
        performSearch(select.value);
    });
    // 2. Reakce na textové vyhledávání s prodlevou (Debounce)
    // Aby se API nevolalo při každém písmenu, počkáme 500ms po dopsání
    let searchTimeout;
    movieSearch?.addEventListener("input", (event) => {
        const input = event.target;
        window.clearTimeout(searchTimeout);
        searchTimeout = window.setTimeout(() => {
            performSearch(input.value);
        }, 500);
    });
    movieFilter?.addEventListener("change", (event) => {
        if (movieSearch)
            movieSearch.value = ""; // vymazání textu
        const select = event.target;
        performSearch(select.value);
    });
    movieSearch?.addEventListener("input", (event) => {
        if (movieFilter)
            movieFilter.value = ""; // resetování roletky
        // ... tvůj stávající debounce kód
    });
    // --- ÚVODNÍ NAČTENÍ DAT ---
    // Voláme úplně na konci funkce initGallery, jakmile jsou všechny prvky připravené.
    performSearch("Marvel");
}
/**
 * ============================================================================
 * VYKRESLOVÁNÍ DAT (RENDER)
 * Zpracuje data z API a dynamicky vytvoří HTML elementy (karty filmů).
 * ============================================================================
 * * @param {ApiResponse[]} movies - Pole filmů z API
 * @param {HTMLElement} container - HTML element, do kterého se filmy vloží
 */
function renderMovies(movies, container) {
    container.innerHTML = "";
    if (movies.length === 0) {
        container.innerHTML = "<p>Žádné filmy nebyly nalezeny.</p>";
        return;
    }
    movies.forEach((item) => {
        const show = item.show;
        const movieCard = document.createElement("article");
        movieCard.classList.add("movie-card");
        // --- Obrázek (Poster) ---
        const imageUrl = show.image?.medium || "pictures/no-image.jpg";
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        // Fallback při chybě obrázku
        imgElement.onerror = () => {
            imgElement.onerror = null;
            imgElement.src = "pictures/netflix-logo.png";
            imgElement.style.objectFit = "contain";
            imgElement.style.padding = "20px";
        };
        imgElement.alt = `Plakát k filmu ${show.name}`;
        imgElement.classList.add("movie-poster");
        // --- Nadpis ---
        const titleElement = document.createElement("h3");
        titleElement.textContent = show.name;
        titleElement.classList.add("movie-title");
        // --- Hodnocení (Rating) - NOVÉ ---
        const ratingContainer = document.createElement("div");
        ratingContainer.style.padding = "0 10px 10px";
        ratingContainer.style.textAlign = "center";
        if (show.rating?.average) {
            ratingContainer.innerHTML = `<span style="color: #e50914;">★</span> ${show.rating.average} / 10`;
        }
        else {
            ratingContainer.innerHTML = `<span style="color: var(--text-muted); font-size: 0.8rem;">Bez hodnocení</span>`;
        }
        // --- Sestavení karty ---
        movieCard.appendChild(imgElement);
        movieCard.appendChild(titleElement);
        movieCard.appendChild(ratingContainer);
        // Možnost přidání prokliku na detail (TVMaze URL)
        movieCard.onclick = () => {
            console.log(`Detail filmu: ${show.name}`);
            // Zde lze implementovat otevření modálního okna
        };
        container.appendChild(movieCard);
    });
}
//# sourceMappingURL=gallery.js.map