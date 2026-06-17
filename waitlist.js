const popupOverlay = document.querySelector('.popup-overlay');
const closeBtn = document.querySelector('.popup-box__close');
const waitlistForm = document.querySelector('.waitlist-container');
const joinWaitlistBtn = document.querySelector('.waitlist-container__button');

function displayPopup() {
    popupOverlay.classList.add('show-popup');
}

// adding a check so people don't spam the form
if (localStorage.getItem('hasJoinedWaitlist') === 'true') {
    // lock the button here
    joinWaitlistBtn.innerHTML = `Already on Waitlist! <i class="fa-solid fa-check"></i>`;
    joinWaitlistBtn.classList.add('join-success');
    joinWaitlistBtn.disabled = true;

    // style input box for more clarity as well
    const emailInputContainer = document.querySelector('.waitlist-container__input');
    if (emailInputContainer) {
        emailInputContainer.style.opacity = "0.5";
        const inputField = emailInputContainer.querySelector('input');
        if (inputField) {
            inputField.disabled = true;
            inputField.placeholder = "You are already locked in!";
        }
    }
}

// Form Submit Handler (to match web3 docs)
waitlistForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    // Convert form fields to JSON exactly
    const formData = new FormData(waitlistForm);
    const object = Object.fromEntries(formData.entries());
    const json = JSON.stringify(object);

    // Submit via AJAX Fetch
    fetch(waitlistForm.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(response => {
        if (response.status === 200) {

            gtag('event', 'join_waitlist', {
                'event_category': 'engagement',
                'event_label': 'Waitlist Form Submitted'
            });
            
            joinWaitlistBtn.innerHTML = `Successfully Joined! <i class="fa-solid fa-check"></i>`;
            joinWaitlistBtn.classList.add('join-success');
            joinWaitlistBtn.disabled = true;

            // save flag here
            localStorage.setItem('hasJoinedWaitlist', 'true');

            // clear the form input text
            waitlistForm.reset(); 

            setTimeout(() => {
                displayPopup();
            }, 1500);

        } else {
            console.log("Server responded but with an error status:", response);
            handleFailure();
        }
    })
    .catch(error => {
        console.log("Network error caught:", error);
        handleFailure();
    });
});

// Helper function to manage failures
function handleFailure() {
    const originalText = `Join Waitlist <i class="fa-solid fa-chevron-right"></i>`;
    
    joinWaitlistBtn.innerHTML = `Failed to Join!`;
    joinWaitlistBtn.classList.add('join-fail');
    joinWaitlistBtn.disabled = true; 

    // Reset button after 3 seconds
    setTimeout(() => {
        joinWaitlistBtn.innerHTML = originalText;
        joinWaitlistBtn.classList.remove('join-fail');
        joinWaitlistBtn.disabled = false; 
    }, 3000);
}

// Popup Dismiss Listener
closeBtn.addEventListener('click', () => {
    popupOverlay.classList.remove('show-popup');
});

// form error validation for iphone/safari users
document.querySelector('form').addEventListener('submit', function(e) {
    if (!this.reportValidity()) 
        e.preventDefault();
});
