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

            initSearchModal();

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

const FAST_WIKI_SEARCH_INDEX = [
    {
        title: "Admissions Overview",
        category: "Admissions",
        description: "Eligibility, admission streams, entry tests, merit system, and application overview.",
        url: "/src/sections/admissions/overview/overview.html",
        keywords: ["admission", "overview", "eligibility", "apply", "entry test", "fast admission"]
    },
    {
        title: "Degree Comparisons",
        category: "Admissions",
        description: "Comparison of FAST degrees and which program may suit different students.",
        url: "/src/sections/admissions/degree-comparisons/degree-comparisons.html",
        keywords: ["degree", "cs", "se", "ai", "cybersecurity", "data science", "program comparison"]
    },
    {
        title: "How To Apply",
        category: "Admissions",
        description: "Step-by-step guide to applying to FAST, choosing programs, uploading documents, and paying fee.",
        url: "/src/sections/admissions/how-to-apply/how-to-apply.html",
        keywords: ["apply", "application", "portal", "documents", "fee", "admission form"]
    },
    {
        title: "NU vs SAT vs NAT",
        category: "Admissions",
        description: "Comparison of NU Test, SAT, and NAT admission streams.",
        url: "/src/sections/admissions/entry-tests/entry-tests.html",
        keywords: ["nu test", "sat", "nat", "entry test", "which test", "nts"]
    },
    {
        title: "NU Entry Test",
        category: "Admissions",
        description: "FAST NU Test pattern, sections, preparation, and test strategy.",
        url: "/src/sections/admissions/nu-test/nu-test.html",
        keywords: ["nu test", "entry test", "math", "english", "analytical", "preparation"]
    },
    {
        title: "SAT Entry Test",
        category: "Admissions",
        description: "FAST SAT admission route, SAT-I, separate merit list, and SAT stream details.",
        url: "/src/sections/admissions/sat-test/sat-test.html",
        keywords: ["sat", "sat-i", "sat stream", "sat admission", "sat test"]
    },
    {
        title: "Merit & Cutoffs",
        category: "Admissions",
        description: "FAST merit, aggregate, cutoffs, and why closing merit is hard to predict.",
        url: "/src/sections/admissions/merit/merit.html",
        keywords: ["merit", "cutoff", "aggregate", "closing merit", "selected", "eligible"]
    },
    {
        title: "University Comparisons",
        category: "Admissions",
        description: "FAST vs NUST, GIKI, LUMS, public universities, and other alternatives.",
        url: "/src/sections/admissions/university-comparisons/university-comparisons.html",
        keywords: ["fast vs nust", "fast vs giki", "fast vs lums", "comparison", "university"]
    },

    {
        title: "Academic Calendar",
        category: "Academics",
        description: "FAST semesters, academic year, summer term, and university calendar structure.",
        url: "/src/sections/academics/calendar/calendar.html",
        keywords: ["calendar", "semester", "summer", "fall", "spring", "academic year"]
    },
    {
        title: "Grading System",
        category: "Academics",
        description: "FAST GPA, CGPA, SGPA, grading system, Dean's List, and Rector's List.",
        url: "/src/sections/academics/grading/grading.html",
        keywords: ["gpa", "cgpa", "sgpa", "grade", "grading", "dean list", "rector list"]
    },
    {
        title: "Ragra Reality",
        category: "Academics",
        description: "The real academic pressure at FAST: quizzes, assignments, labs, sessionals, and finals.",
        url: "/src/sections/academics/ragra/ragra.html",
        keywords: ["ragra", "pressure", "workload", "quizzes", "assignments", "labs", "sessionals"]
    },
    {
        title: "GPA Economy",
        category: "Academics",
        description: "Why maintaining GPA at FAST is harder and how GPA affects jobs and abroad plans.",
        url: "/src/sections/academics/gpa-economy/gpa-economy.html",
        keywords: ["gpa economy", "cgpa", "grades", "abroad", "jobs", "scholarship"]
    },
    {
        title: "Rules",
        category: "Academics",
        description: "Attendance, missed exams, academic dishonesty, F/A grade, and academic rules.",
        url: "/src/sections/academics/academic-rules/academic-rules.html",
        keywords: ["rules", "attendance", "f/a", "missed exam", "dishonesty", "final exam", "80 percent"]
    },
    {
        title: "Course Registration",
        category: "Academics",
        description: "Course registration, add/drop, withdrawal, repeats, and registration rules.",
        url: "/src/sections/academics/course-registration/course-registration.html",
        keywords: ["course registration", "add drop", "withdraw", "repeat", "enroll", "registration"]
    },
    {
        title: "Academic Warnings",
        category: "Academics",
        description: "Academic warning, probation, warning count, CGPA danger zone, and admission closure.",
        url: "/src/sections/academics/warnings/warnings.html",
        keywords: ["warning", "academic warning", "probation", "cgpa", "admission closed", "fail"]
    },
    {
        title: "Failsafes",
        category: "Academics",
        description: "Course repeats, semester freeze, grade review, campus transfer, and readmission.",
        url: "/src/sections/academics/failsafes/failsafes.html",
        keywords: ["failsafe", "repeat", "freeze", "transfer", "grade review", "readmission"]
    },
    {
        title: "Study Strategy",
        category: "Academics",
        description: "How to study at FAST, prepare before semester, use summers, and build resources.",
        url: "/src/sections/academics/study-strategy/study-strategy.html",
        keywords: ["study", "strategy", "leetcode", "resources", "summer", "assignments", "cs50", "dsa"]
    },

    {
        title: "Fee Structure",
        category: "Finances",
        description: "FAST fee structure, tuition, admission fee, hostel, repeat fee, and refund window.",
        url: "/src/sections/finances/fee-structure/fee-structure.html",
        keywords: ["fee", "fees", "tuition", "hostel", "refund", "security deposit", "admission fee"]
    },
    {
        title: "Financial Aid",
        category: "Finances",
        description: "FAST Financial Assistance, Qarz-e-Hasana, documents, interview, and repayment.",
        url: "/src/sections/finances/financial-aid/financial-aid.html",
        keywords: ["financial aid", "fa", "financial assistance", "qarz", "loan", "repayment", "documents"]
    },
    {
        title: "Scholarships",
        category: "Finances",
        description: "Honhaar, PEEF, OSAF, FANA, Ihsan Trust, and merit-based scholarships.",
        url: "/src/sections/finances/scholarships/scholarships.html",
        keywords: ["scholarship", "honhaar", "peef", "osaf", "fana", "ihsan trust", "merit scholarship"]
    },
    {
        title: "Affordability",
        category: "Finances",
        description: "Can you afford FAST, FAST vs public universities, IST, aid, debt, and backup options.",
        url: "/src/sections/finances/affordability/affordability.html",
        keywords: ["afford", "affordability", "ist", "public university", "financial risk", "debt"]
    },

    {
        title: "Culture",
        category: "Campus Life",
        description: "FAST campus culture, social life, societies, networking, and student experience.",
        url: "/src/sections/campus-life/culture/culture.html",
        keywords: ["culture", "campus life", "social life", "societies", "network", "friends"]
    },
    {
        title: "Gender Norms",
        category: "Campus Life",
        description: "Gender interaction at FAST, viral meme, satire, and real campus norms.",
        url: "/src/sections/campus-life/gender-norms/gender-norms.html",
        keywords: ["gender", "gender norms", "interaction", "meme", "viral", "co education"]
    },
    {
        title: "Teachers",
        category: "Campus Life",
        description: "Teacher quality, teacher lottery, strict marking, and how to handle weak instructors.",
        url: "/src/sections/campus-life/teachers/teachers.html",
        keywords: ["teacher", "faculty", "marking", "strict", "instructor", "teacher lottery"]
    },

    {
        title: "Local Jobs",
        category: "Career & Future",
        description: "FAST tag, local software jobs, employer preference, alumni referrals, and skills.",
        url: "/src/sections/career/local-jobs/local-jobs.html",
        keywords: ["jobs", "local jobs", "software jobs", "fast tag", "alumni", "referral", "career"]
    },
    {
        title: "Going Abroad",
        category: "Career & Future",
        description: "Funded master's abroad, GPA, university recognition, and foreign applications.",
        url: "/src/sections/career/going-abroad/going-abroad.html",
        keywords: ["abroad", "masters", "funded", "germany", "gpa", "scholarship", "foreign"]
    },
    {
        title: "Abroad Tactics",
        category: "Career & Future",
        description: "Germany, Fulbright, Erasmus, Australia skilled migration, IELTS, and visa planning.",
        url: "/src/sections/career/abroad-tactics/abroad-tactics.html",
        keywords: ["germany", "fulbright", "erasmus", "ielts", "australia", "blocked account", "visa"]
    },
    {
        title: "Specialisations",
        category: "Career & Future",
        description: "FAANG, cybersecurity, AI, data science, CS vs specialisation, and niche paths.",
        url: "/src/sections/career/specialisations/specialisations.html",
        keywords: ["specialisation", "cybersecurity", "faang", "ai", "data science", "cs", "big tech"]
    },

    {
        title: "FAQ",
        category: "Help & FAQs",
        description: "Frequently asked questions about FAST admissions, academics, fees, campus life, and careers.",
        url: "/src/sections/help/faq/faq.html",
        keywords: ["faq", "questions", "answers", "help", "common questions"]
    },
    {
        title: "Glossary",
        category: "Help & FAQs",
        description: "FAST terms like Ragra, sessionals, absolutes, FA, warning count, and more.",
        url: "/src/sections/help/glossary/glossary.html",
        keywords: ["glossary", "terms", "ragra", "sessionals", "absolutes", "fa", "warning count"]
    },
    {
        title: "Support Us",
        category: "Help & FAQs",
        description: "Support FAST Wiki through JazzCash donation or send feedback through Google Forms.",
        url: "/support.html",
        keywords: ["support", "donate", "donation", "jazzcash", "feedback", "google form", "help us"]
    }
];

function initSearchModal() {
    const sidebarSearch = document.querySelector(".sidebar-container__searchbar");
    const sidebarInput = document.querySelector(".searchbar-btn");

    if (!sidebarSearch || !sidebarInput) return;

    if (sidebarSearch.dataset.searchReady === "true") return;
    sidebarSearch.dataset.searchReady = "true";

    createSearchModal();

    sidebarInput.readOnly = true;
    sidebarInput.setAttribute("aria-label", "Open FAST Wiki search");

    sidebarSearch.addEventListener("click", () => {
        openSearchModal();
    });

    sidebarInput.addEventListener("focus", () => {
        openSearchModal();
    });

    sidebarInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            openSearchModal();
        }
    });
}

function createSearchModal() {
    if (document.getElementById("fastSearchOverlay")) return;

    const overlay = document.createElement("div");
    overlay.className = "fast-search-overlay";
    overlay.id = "fastSearchOverlay";

    overlay.innerHTML = `
        <div class="fast-search-modal" role="dialog" aria-modal="true" aria-label="FAST Wiki Search">
            <div class="fast-search-box">
                <i class="fa-solid fa-magnifying-glass"></i>

                <input 
                    type="text" 
                    id="fastSearchInput" 
                    class="fast-search-input" 
                    placeholder="Search FAST Wiki..."
                    autocomplete="off"
                >

                <button type="button" class="fast-search-close" aria-label="Close search">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="fast-search-helper">
                Try: <span>attendance</span>, <span>merit</span>, <span>FA</span>, <span>ragra</span>, <span>abroad</span>
            </div>

            <div class="fast-search-results" id="fastSearchResults"></div>
        </div>
    `;

    document.body.appendChild(overlay);

    const input = document.getElementById("fastSearchInput");
    const closeButton = overlay.querySelector(".fast-search-close");
    const resultsBox = document.getElementById("fastSearchResults");

    input.addEventListener("input", () => {
        renderSearchResults(input.value);
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const firstResult = resultsBox.querySelector(".fast-search-result");
            if (firstResult) {
                window.location.href = firstResult.dataset.url;
            }
        }

        if (e.key === "Escape") {
            closeSearchModal();
        }
    });

    closeButton.addEventListener("click", closeSearchModal);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            closeSearchModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("show-search")) {
            closeSearchModal();
        }
    });

    resultsBox.addEventListener("click", (e) => {
        const result = e.target.closest(".fast-search-result");

        if (result) {
            window.location.href = result.dataset.url;
        }
    });
}

function openSearchModal() {
    const overlay = document.getElementById("fastSearchOverlay");
    const input = document.getElementById("fastSearchInput");

    if (!overlay || !input) return;

    overlay.classList.add("show-search");
    document.body.classList.add("search-modal-open");

    renderSearchResults("");

    setTimeout(() => {
        input.focus();
    }, 50);
}

function closeSearchModal() {
    const overlay = document.getElementById("fastSearchOverlay");
    const input = document.getElementById("fastSearchInput");

    if (!overlay || !input) return;

    overlay.classList.remove("show-search");
    document.body.classList.remove("search-modal-open");
    input.value = "";
}

function renderSearchResults(query) {
    const resultsBox = document.getElementById("fastSearchResults");
    if (!resultsBox) return;

    const results = getSearchResults(query);

    if (results.length === 0) {
        resultsBox.innerHTML = `
            <div class="fast-search-empty">
                <h3>No results found</h3>
                <p>Try searching with simpler words like "GPA", "fee", "attendance", "SAT", or "abroad".</p>
            </div>
        `;
        return;
    }

    const heading = query.trim()
        ? `Results for "${escapeHTML(query.trim())}"`
        : "Popular pages";

    resultsBox.innerHTML = `
        <div class="fast-search-results-heading">${heading}</div>

        ${results.map(item => `
            <button 
                type="button" 
                class="fast-search-result" 
                data-url="${escapeAttribute(item.url)}"
            >
                <div class="fast-search-result__main">
                    <h3>${escapeHTML(item.title)}</h3>
                    <p>${escapeHTML(item.description)}</p>
                </div>

                <div class="fast-search-result__meta">
                    <span>${escapeHTML(item.category)}</span>
                    <i class="fa-solid fa-arrow-right-long"></i>
                </div>
            </button>
        `).join("")}
    `;
}

function getSearchResults(query) {
    const cleanQuery = normalizeText(query);

    if (!cleanQuery) {
        return [
            "NU vs SAT vs NAT",
            "Academic Warnings",
            "Fee Structure",
            "Financial Aid",
            "Local Jobs",
            "FAQ"
        ]
        .map(title => FAST_WIKI_SEARCH_INDEX.find(item => item.title === title))
        .filter(Boolean);
    }

    const queryTerms = cleanQuery.split(" ").filter(Boolean);

    return FAST_WIKI_SEARCH_INDEX
        .map(item => {
            const title = normalizeText(item.title);
            const category = normalizeText(item.category);
            const description = normalizeText(item.description);
            const keywords = normalizeText(item.keywords.join(" "));
            const fullText = `${title} ${category} ${description} ${keywords}`;

            const allTermsMatch = queryTerms.every(term => fullText.includes(term));

            if (!allTermsMatch) return null;

            let score = 0;

            if (title.includes(cleanQuery)) score += 60;
            if (keywords.includes(cleanQuery)) score += 40;
            if (description.includes(cleanQuery)) score += 20;
            if (category.includes(cleanQuery)) score += 10;

            queryTerms.forEach(term => {
                if (title.includes(term)) score += 10;
                if (keywords.includes(term)) score += 7;
                if (description.includes(term)) score += 4;
                if (category.includes(term)) score += 2;
            });

            return {
                ...item,
                score
            };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);
}

function normalizeText(value) {
    return String(value)
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
    return escapeHTML(value);
}

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