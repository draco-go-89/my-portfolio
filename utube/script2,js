document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const searchInput = document.querySelector('input[type="text"]');

    // 1. Client-side validation: Prevent empty searches
    form.addEventListener("submit", (event) => {
        const query = searchInput.value.trim();

        if (query === "") {
            event.preventDefault(); // Stop form from submitting
            alert("Please enter a search term!");
            searchInput.focus();
        }
    });

    // 2. Clear input placeholder on focus
    searchInput.addEventListener("focus", () => {
        searchInput.dataset.placeholder = searchInput.placeholder;
        searchInput.placeholder = "";
    });

    searchInput.addEventListener("blur", () => {
        searchInput.placeholder = searchInput.dataset.placeholder;
    });
});