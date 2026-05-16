document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu'); // button to open menu on mobile
    const menuList = document.querySelector('nav ul');

    if (menuBtn && menuList) {
        menuBtn.addEventListener('click', () => {
            menuList.classList.toggle('show'); // show or hide the menu list
        });
    }

    const thisPage = window.location.pathname.split('/').pop(); // highlight current page in menu
    const allLinks = document.querySelectorAll('nav ul li a');

    allLinks.forEach(link => {
        const linkName = link.getAttribute('href');
        if (linkName === thisPage || (thisPage === '' && linkName === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    const allBtns = document.querySelectorAll('.filter-btn'); // filter cards on places page
    const items = document.querySelectorAll('.filter-item');

    if (allBtns.length > 0 && items.length > 0) {
        allBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                allBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-filter');

                items.forEach(item => {
                    if (category === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.classList.contains(category)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    const myForm = document.getElementById('contactForm'); // question form check
    if (myForm) {
        myForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            if (name.trim() === '' || email.trim() === '') {
                let errorBox = document.createElement('div');
                errorBox.className = 'success-message';
                errorBox.style.borderLeftColor = '#e74c3c';
                errorBox.innerHTML = `<strong>Oops!</strong><br>Please fill in everything.`;
                myForm.appendChild(errorBox);
                setTimeout(() => errorBox.remove(), 4000);
            } else {
                let doneMsg = document.createElement('div');
                doneMsg.className = 'success-message';
                doneMsg.innerHTML = `<strong>Thank You, ${name}!</strong><br>We got your message.`;
                
                const oldMsg = myForm.querySelector('.success-message');
                if(oldMsg) oldMsg.remove();
                
                myForm.appendChild(doneMsg);
                myForm.reset();
                
                setTimeout(() => doneMsg.remove(), 6000);
            }
        });
    }

    const welcomeText = document.getElementById('greeting'); // greeting based on time
    if (welcomeText) {
        const hour = new Date().getHours();
        let msg = 'WELCOME';

        if (hour < 12) {
            msg = 'GOOD MORNING';
        } else if (hour < 18) {
            msg = 'GOOD AFTERNOON';
        } else {
            msg = 'GOOD EVENING';
        }

        welcomeText.innerText = `${msg} EXPLORER!`;
    }

    let boxes = document.querySelectorAll('.card'); // boxes fade in on scroll

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.add('hidden-card');
    }

    function showBoxes() {
        for (let i = 0; i < boxes.length; i++) {
            let boxTop = boxes[i].getBoundingClientRect().top;
            if (boxTop < 600) {
                boxes[i].classList.add('show-card');
            }
        }
    }

    window.addEventListener('scroll', showBoxes);
    showBoxes();
});


