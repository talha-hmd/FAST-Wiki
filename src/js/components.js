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