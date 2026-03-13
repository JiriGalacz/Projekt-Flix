import { initGallery } from "./gallery.js";
import { initFormValidation } from "./form.js";
import { initScrollUpButton } from "./utils.js";
/**
 * ============================================================================
 * HLAVNÍ INICIALIZACE APLIKACE
 * Tento soubor slouží jako vstupní bod (Entry Point).
 * Spouští jednotlivé moduly pouze na stránkách, kde jsou potřeba.
 * ============================================================================
 */
// --- 1. Modul Galerie (movie.html) ---
if (document.getElementById("movie-gallery")) {
    initGallery();
}
// --- 2. Modul Registrace (form.html) ---
if (document.getElementById("registration-form")) {
    initFormValidation();
}
// --- 3. Modul UI Nástrojů (Všechny stránky) ---
if (document.querySelector(".scroll-up-btn")) {
    initScrollUpButton();
}
//# sourceMappingURL=main.js.map