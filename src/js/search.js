let wikiSearchIndex = [];

function initDynamicSearch() {
    if (document.getElementById("searchbarOverlay")) return;

    const searchOverlayHTML = `
        <div class="searchbar-overlay" id="searchbarOverlay" style="display: none;">
            <div class="searchbar-container">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="modalSearchInput" placeholder="Search anything here..." autocomplete="off">
            </div>
            <div class="results-container" id="modalResultsContainer"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', searchOverlayHTML);

    const overlay = document.getElementById("searchbarOverlay");
    const modalInput = document.getElementById("modalSearchInput");
    const resultsContainer = document.getElementById("modalResultsContainer");
    const sidebarSearchInput = document.querySelector(".searchbar-btn");

    fetch('/src/js/search-index.json')
        .then(response => {
            if (!response.ok) throw new Error("Could not load search-index.json");
            return response.json();
        })
        .then(data => {
            wikiSearchIndex = data;
            console.log("Search database loaded successfully via JSON!");
        })
        .catch(err => console.error("Error loading search index:", err));

    if (sidebarSearchInput) {
        sidebarSearchInput.addEventListener("click", (e) => {
            e.preventDefault();
            sidebarSearchInput.blur(); 
            overlay.style.display = "flex"; 
            setTimeout(() => { modalInput.focus(); }, 50);
        });
    }

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
            modalInput.value = "";
            resultsContainer.innerHTML = "";
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.style.display === "flex") {
            overlay.style.display = "none";
            modalInput.value = "";
            resultsContainer.innerHTML = "";
        }
    });

    modalInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        resultsContainer.innerHTML = ""; 

        if (query.length < 2) return; 
        let matchesFound = false;

        wikiSearchIndex.forEach(page => {
            const titleLower = page.title.toLowerCase();
            const contentLower = page.content.toLowerCase();

            if (titleLower.includes(query) || contentLower.includes(query)) {
                matchesFound = true;

                const resultBox = document.createElement("div");
                resultBox.className = "result-box";

                const titleLink = document.createElement("a");
                titleLink.href = page.url;
                titleLink.className = "result-title-link";
                
                const heading = document.createElement("h3");
                heading.textContent = page.title;
                
                titleLink.appendChild(heading);
                resultBox.appendChild(titleLink);

                let startIndex = contentLower.indexOf(query);
                
                while (startIndex !== -1) {
                    let sliceStart = Math.max(0, startIndex - 25);
                    let sliceEnd = Math.min(page.content.length, startIndex + query.length + 45);
                    
                    let snippetText = page.content.slice(sliceStart, sliceEnd).trim();
                    
                    if (sliceStart > 0) snippetText = "..." + snippetText;
                    if (sliceEnd < page.content.length) snippetText = snippetText + "...";

                    const paragraph = document.createElement("p");
                    
                    // CHANGED: Snippets are explicit links now instead of text spans
                    const spanLink = document.createElement("a");
                    spanLink.href = "#";
                    spanLink.textContent = snippetText;
                    spanLink.className = "result-snippet-link";
                    
                    const searchSlug = encodeURIComponent(query.trim());
                    spanLink.dataset.anchor = `#${searchSlug}`;

                    spanLink.addEventListener("click", (event) => {
                        event.preventDefault();
                        event.stopPropagation(); // Stops parent from interfering with link clicking

                        // close modal after link has been clicked
                        overlay.style.display = "none";
                        modalInput.value = "";
                        resultsContainer.innerHTML = "";
                        
                        // Force the browser to completely load the new page address + hash tag
                        window.location.assign(page.url + spanLink.dataset.anchor);
                    });

                    paragraph.appendChild(spanLink);
                    resultBox.appendChild(paragraph);

                    startIndex = contentLower.indexOf(query, startIndex + query.length);
                }

                resultsContainer.appendChild(resultBox);
            }
        });

        if (!matchesFound) {
            resultsContainer.innerHTML = `
                <div class="no-results-box">
                    <p class="no-results-text">No Results Found</p>
                </div>
            `;
        }
    });
}