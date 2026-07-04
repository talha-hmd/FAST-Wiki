const faqHeader = document.querySelectorAll('.faq-box__header');

faqHeader.forEach(header => {
    header.addEventListener('click', () => {
        header.classList.toggle('faq-box__header--active');
        
        const icon = header.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-plus');
            icon.classList.toggle('fa-xmark');
        }
    });
});