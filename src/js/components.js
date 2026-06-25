// This stuff executes automatically on page load

// Google Analytics (GA4) Initialization code
const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-WHR8RHR86W";
document.head.appendChild(gaScript);

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-WHR8RHR86W');

// Microsoft Clarity Initialization code
(function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "x8k7maatmi");

// This is to inject navbar and sidebar upon injection
document.addEventListener("DOMContentLoaded", () => {
    navbarContainer = document.getElementById('navbar-container');

    fetch('/components/navbar.html')
        .then(response => {
            if (response.ok) {
                return response.text(); // this'll be the html string we use in the next '.then'
            }
        })
        .then(html => {
            navbarContainer.innerHTML = html;
        }).catch(error => {
            console.error('Error fetching navbar:', error);
    });

    sidebarContainer = document.getElementById('sidebar-container');

    fetch('/components/sidebar.html')
        .then(response => {
            if (response.ok) {
                return response.text(); // this'll be the html string we use in the next '.then'
            }
        })
        .then(html => {
            sidebarContainer.innerHTML = html;

            const sidebarButton = document.querySelector('.navbar-container__menu-button');
            const sidebar = document.getElementById('sidebar-container');

            if (sidebarButton && sidebar) {
                sidebarButton.addEventListener('click', () => {
                    sidebar.classList.toggle('sidebar-closed');
                });
            }

            // Initializing the searchbar in search.js
            if (typeof initDynamicSearch === "function") {
                initDynamicSearch();
            }
        }).catch(error => {
            console.error('Error fetching sidebar:', error);
    });

    fetch('/components/linkedinCard.html')
    .then(response => {
        if (response.ok) {
            return response.text(); 
        }
    })
    .then(html => {
        const linkedinCardContainer = document.getElementById('linkedin-card-container');
        linkedinCardContainer.innerHTML = html;

        const linkedinButton = document.querySelector('.navbar-container__profile-link');
        const linkedinPopup = document.querySelector('.popup-overlay'); 
        const popupClose = document.querySelector('.popup-box__close');

        if (linkedinButton && linkedinPopup) {

            linkedinButton.addEventListener('click', (e) => {
                e.preventDefault(); // prevents the link from refreshing the page
                linkedinPopup.classList.toggle('show-popup');
            });

            // Close the popup if they click outside the cards
            linkedinPopup.addEventListener('click', (e) => {
                if (e.target === linkedinPopup) {
                    linkedinPopup.classList.remove('show-popup');
                }
            });

            popupClose.addEventListener('click', () => {
                linkedinPopup.classList.remove('show-popup');
            });
        }
    }).catch(error => {
        console.error('Error fetching linkedin card:', error);
    });
});

// This is to scroll to the hash target created by search.js
function scrollToSearchHash() {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#')) return;

    const targetText = decodeURIComponent(hash.substring(1)).toLowerCase();
    const superCleanTarget = targetText.replace(/[^a-z0-9]/g, '');

    // The brief delay ensures any same-page scrolling engine layout has updated
    setTimeout(() => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let textNode;
        
        while (textNode = walker.nextNode()) {
            const nodeValueLower = textNode.nodeValue.toLowerCase();
            const superCleanNode = nodeValueLower.replace(/[^a-z0-9]/g, '');
            
            if (nodeValueLower.includes(targetText) || superCleanNode.includes(superCleanTarget)) {
                const parentEl = textNode.parentElement;
                
                parentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                parentEl.style.backgroundColor = 'rgba(255, 235, 59, 0.35)';
                parentEl.style.transition = 'background-color 0.5s ease';
                setTimeout(() => { parentEl.style.backgroundColor = ''; }, 2000);
                break;
            }
        }
    }, 150);
}

window.addEventListener("DOMContentLoaded", scrollToSearchHash);
window.addEventListener("hashchange", scrollToSearchHash);

// for jazzcash popup
document.addEventListener("DOMContentLoaded", () => {
    initJazzCashModal();
});

function initJazzCashModal() {
    const openButton = document.getElementById("openJazzCashModal");
    const modal = document.getElementById("jazzCashModal");
    const closeButton = document.getElementById("closeJazzCashModal");

    if (!openButton || !modal || !closeButton) return;

    openButton.addEventListener("click", () => {
        modal.classList.add("show-jazzcash-modal");
        document.body.style.overflow = "hidden";
    });

    closeButton.addEventListener("click", () => {
        closeJazzCashModal();
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeJazzCashModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("show-jazzcash-modal")) {
            closeJazzCashModal();
        }
    });
}

function closeJazzCashModal() {
    const modal = document.getElementById("jazzCashModal");

    if (!modal) return;

    modal.classList.remove("show-jazzcash-modal");
    document.body.style.overflow = "";
}

function copyJazzCashNumber(elementId, name) {
    const numberElement = document.getElementById(elementId);
    const messageElement = document.getElementById("jazzCashCopyMessage");

    if (!numberElement || !messageElement) return;

    const number = numberElement.textContent.trim();

    navigator.clipboard.writeText(number)
        .then(() => {
            messageElement.textContent = `${name}'s JazzCash number copied!`;
        })
        .catch(() => {
            messageElement.textContent = "Could not copy. Please copy manually.";
        });

    setTimeout(() => {
        messageElement.textContent = "";
    }, 2500);
}

// for feedback
const FEEDBACK_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzFicjWwfkRfcT2DqD9bk5S_xugfmBNPgmk1tGPj80KweFopfAuUCPDi4yHONB_U7HD/exec";

document.addEventListener("DOMContentLoaded", () => {
    initFeedbackModal();
});

function initFeedbackModal() {
    const openButton = document.getElementById("openFeedbackModal");
    const modal = document.getElementById("feedbackModal");
    const closeButton = document.getElementById("closeFeedbackModal");
    const feedbackForm = document.getElementById("feedbackForm");

    if (!openButton || !modal || !closeButton || !feedbackForm) return;

    openButton.addEventListener("click", () => {
        openFeedbackModal();
    });

    closeButton.addEventListener("click", () => {
        closeFeedbackModal();
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeFeedbackModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("show-feedback-modal")) {
            closeFeedbackModal();
        }
    });

    feedbackForm.addEventListener("submit", submitFeedbackForm);
}

function openFeedbackModal() {
    const modal = document.getElementById("feedbackModal");
    const status = document.getElementById("feedbackStatus");

    if (!modal) return;

    modal.classList.add("show-feedback-modal");
    document.body.style.overflow = "hidden";

    if (status) {
        status.textContent = "";
        status.className = "feedback-status";
    }

    setTimeout(() => {
        const messageInput = document.getElementById("feedbackMessage");
        if (messageInput) messageInput.focus();
    }, 100);
}

function closeFeedbackModal() {
    const modal = document.getElementById("feedbackModal");

    if (!modal) return;

    modal.classList.remove("show-feedback-modal");
    document.body.style.overflow = "";
}

function submitFeedbackForm(e) {
    e.preventDefault();

    const submitButton = document.getElementById("feedbackSubmitBtn");
    const status = document.getElementById("feedbackStatus");

    const name = document.getElementById("feedbackName").value.trim();
    const contact = document.getElementById("feedbackContact").value.trim();
    const type = document.getElementById("feedbackType").value;
    const message = document.getElementById("feedbackMessage").value.trim();
    const website = document.getElementById("feedbackWebsite").value.trim();

    if (!message) {
        status.textContent = "Please write your feedback before submitting.";
        status.className = "feedback-status error";
        return;
    }

    const feedbackData = {
        name,
        contact,
        type,
        message,
        website
    };

    submitButton.disabled = true;
    submitButton.innerHTML = `Submitting... <i class="fa-solid fa-spinner fa-spin"></i>`;

    status.textContent = "";
    status.className = "feedback-status";

    fetch(FEEDBACK_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(feedbackData)
    })
    .then(() => {
        status.textContent = "Feedback submitted successfully. Thank you!";
        status.className = "feedback-status success";

        feedbackForm.reset();

        setTimeout(() => {
            closeFeedbackModal();
        }, 1800);
    })
    .catch(() => {
        status.textContent = "Something went wrong. Please try again.";
        status.className = "feedback-status error";
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = `Submit Feedback <i class="fa-solid fa-arrow-right-long"></i>`;
    });
}

