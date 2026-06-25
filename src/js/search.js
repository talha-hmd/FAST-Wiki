// use https://www.textfixer.com/html/html-to-text.php to convert webpage body content into plain text
// then use https://tools.knowledgewalls.com/online-multiline-to-single-line-converter to convert that plain text into formatted plain text
// then paste that inside the search-index.json (if u updated the content of that specific webpage)
let wikiSearchIndex = [];

function initDynamicSearch() {
    if (document.getElementById("searchbarOverlay")) return;

    // skeleton for the complete searchbar overlay
    const searchOverlayHTML = `
        <div class="searchbar-overlay" id="searchbarOverlay" style="display: none;">
            <div class="searchbar-container">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="modalSearchInput" placeholder="Search anything here..." autocomplete="off">
            </div>
            <div class="results-container" id="modalResultsContainer"></div>
        </div>
    `;

    // insert this skeleton into every webpage DOM (at the end of the body)
    document.body.insertAdjacentHTML('beforeend', searchOverlayHTML);

    const overlay = document.getElementById("searchbarOverlay");
    const modalInput = document.getElementById("modalSearchInput");
    const resultsContainer = document.getElementById("modalResultsContainer");
    const sidebarSearchInput = document.querySelector(".searchbar-btn");

    // load the search index (from JSON file which is the database basically)
    fetch('/src/js/search-index.json')
        .then(response => {
            if (!response.ok) throw new Error("Could not load search-index.json");
            return response.json();
        })
        .then(data => {
            wikiSearchIndex = data; // move the data into the global array
            console.log("Search database loaded successfully via JSON!");
        })
        .catch(err => console.error("Error loading search index:", err));

    if (sidebarSearchInput) {
        sidebarSearchInput.addEventListener("click", (e) => {
            e.preventDefault(); // prevents the link from refreshing the page
            sidebarSearchInput.blur();  // removes focus from link on click
            overlay.style.display = "flex"; 
            modalInput.focus(); // focuses on the search input
        });
    }

    // closing triggers for the overlay
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

    // complete dynamic search engine functionality
    modalInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim(); // e.target is the input box itself
        resultsContainer.innerHTML = ""; // doing this to clear previous search results

        // for performance purposes
        if (query.length < 2) return; 
        let matchesFound = false;

        // loop through each json object (which are each wiki page)
        wikiSearchIndex.forEach(page => {
            const titleLower = page.title.toLowerCase();
            const contentLower = page.content.toLowerCase();

            if (titleLower.includes(query) || contentLower.includes(query)) {
                matchesFound = true;

                // create the result box for this specific page
                const resultBox = document.createElement("div");
                resultBox.className = "result-box";

                // create the title's link and set it up
                const titlesLink = document.createElement("a");
                titlesLink.href = page.url;
                titlesLink.className = "result-title-link";
                
                // This is the heading, which will go inside the a tag (titlesLink)
                const heading = document.createElement("h3");
                heading.textContent = page.title;
                
                titlesLink.appendChild(heading);
                resultBox.appendChild(titlesLink);

                let startIndex = contentLower.indexOf(query);
                let matchCount = 0;
                
                // keep going until no more instances of the query are found
                while (startIndex !== -1) {
                    // 25 chars before the query and 45 chars after
                    let sliceStart = Math.max(0, startIndex - 25);
                    let sliceEnd = Math.min(page.content.length, startIndex + query.length + 45);
                    
                    let resultText = page.content.slice(sliceStart, sliceEnd).trim();
                    
                    if (sliceStart > 0) 
                        resultText = "..." + resultText;
                    if (sliceEnd < page.content.length) 
                        resultText = resultText + "...";

                    // setup p and a tag to put the result text inside
                    const paragraph = document.createElement("p");
                    
                    const spanLink = document.createElement("a");
                    spanLink.href = "#";
                    spanLink.textContent = resultText;
                    spanLink.className = "result-snippet-link";
                    
                    // converting the query into URL-friendly format (removes special chars too)
                    // so we can use it as ID (which comes in the links that's why)
                    const searchSlug = encodeURIComponent(query.trim());
                    spanLink.dataset.anchor = `#${searchSlug}_match_${matchCount}`; // dataset stores custom info (secretly), in this case we r using anchor as ID

                    // click event for the resultText link
                    spanLink.addEventListener("click", (event) => {
                        event.preventDefault();
                        event.stopPropagation(); // Stop parent from interfering with link clicking

                        // close modal after link has been clicked
                        overlay.style.display = "none";
                        modalInput.value = "";
                        resultsContainer.innerHTML = "";
                        
                        // Force the browser to completely load the new page address + hash tag
                        window.location.assign(page.url + spanLink.dataset.anchor);
                    });

                    // p tag goes in a tag
                    paragraph.appendChild(spanLink);
                    resultBox.appendChild(paragraph);

                    // update start index to find next instance
                    startIndex = contentLower.indexOf(query, startIndex + query.length);
                    matchCount++; // next link gets the next number (to maintain unique IDs)
                }

                resultsContainer.appendChild(resultBox);
            }
        });

        // if no results found then i made custom css class for this and custom code to display this edge case
        if (!matchesFound) {
            resultsContainer.innerHTML = `
                <div class="no-results-box">
                    <p class="no-results-text">No Results Found</p>
                </div>
            `;
        }
    });
}