
document.addEventListener('DOMContentLoaded', function () {


    // FEATURE 1 ─ PHONE MENU TOGGLE 

    var phoneMenuBtn = document.getElementById('mobile-menu');
    var navMenuList = document.querySelector('nav ul');

    if (phoneMenuBtn) {
        phoneMenuBtn.addEventListener('click', function () {
            navMenuList.classList.toggle('show');
            if (navMenuList.classList.contains('show')) {
                phoneMenuBtn.textContent = '✕';
            } else {
                phoneMenuBtn.textContent = '☰';
            }
        });

    }

    // FEATURE 2 ─ MARK ACTIVE PAGE IN NAV 
    // To make the current page link highlighted in navbar

    var currentPage = window.location.pathname.split('/').pop();
    var allNavLinks = document.querySelectorAll('nav ul li a');

    allNavLinks.forEach(function (link) {
        var linkTarget = link.getAttribute('href');

        if (linkTarget === currentPage || (currentPage === '' && linkTarget === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });


    // FEATURE 3 ─ REDIRECT TO LOGIN IF NOT LOGGED IN

    var loginStatus = localStorage.getItem('userLoggedIn'); // 'yes' or null

    var protectedPages = ['places.html', 'food.html', 'culture.html', 'query.html'];

    // check if current page is in the protected list
    var pageNeedsLogin = protectedPages.indexOf(currentPage) !== -1;

    if (loginStatus !== 'yes' && pageNeedsLogin) {
        window.location.href = 'login.html';
    }


    // FEATURE 4 ─ DARK MODE TOGGLE
    // A button is added to the header by JS.Clicking it switches between light and dark mode.

    var siteHeader = document.querySelector('header');
    var themeBtn = document.createElement('button');
    themeBtn.id = 'darkModeBtn';
    themeBtn.className = 'dark-mode-btn';
    themeBtn.textContent = '🌙 Dark';
    siteHeader.appendChild(themeBtn);

    // if the user chose dark mode before, apply it right away
    var savedTheme = localStorage.getItem('siteTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.textContent = '☀️ Light';
    }

    themeBtn.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');

        let isDark = document.body.classList.contains('dark-mode');

        if (isDark) {
            themeBtn.textContent = '☀️ Light';
            localStorage.setItem('siteTheme', 'dark');
        } else {
            themeBtn.textContent = '🌙 Dark';
            localStorage.setItem('siteTheme', 'light');
        }
    });


    // FEATURE 5 ─ LOGIN / LOGOUT CHECK
    // If user is logged in,show Explore Now and Logout button. else it will show only log in button


    var heroActionArea = document.getElementById('hero-action');

    if (heroActionArea) {
        if (loginStatus === 'yes') {
            heroActionArea.innerHTML =
                '<a href="places.html" class="btn">Explore Now</a>' +
                ' <button class="btn btn-logout" id="logoutBtn">Logout</button>';

            var logoutBtn = document.getElementById('logoutBtn');
            logoutBtn.addEventListener('click', function () {
                localStorage.removeItem('userLoggedIn');
                localStorage.removeItem('userName');
                window.location.reload();
            });

        } else {
            heroActionArea.innerHTML = '<a href="login.html" class="btn">Login to Explore</a>';
        }
    }


    // FEATURE 6 ─ LOGIN FORM
    // for checking the form validation and setting the local storage

    var loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var typedName = document.getElementById('loginName').value;
            var typedPassword = document.getElementById('loginPassword').value;
            var errorLine = document.getElementById('loginError');

            if (typedName.trim() === '' || typedPassword.trim() === '') {
                errorLine.textContent = 'Please fill in both fields.';
            } else {
                localStorage.setItem('userLoggedIn', 'yes');
                localStorage.setItem('userName', typedName);
                window.location.href = 'index.html';
            }
        });
    }


    // FEATURE 7 ─ TIME-BASED GREETING

    var greetingText = document.getElementById('greeting');

    if (greetingText) {
        var currentHour = new Date().getHours();
        var greeting = 'WELCOME';

        if (currentHour < 12) {
            greeting = 'GOOD MORNING';
        } else if (currentHour < 18) {
            greeting = 'GOOD AFTERNOON';
        } else {
            greeting = 'GOOD EVENING';
        }

        if (loginStatus === 'yes') {
            greetingText.textContent = greeting + ' ' + localStorage.getItem('userName');
        }
    }


    //  FEATURE 8 ─ FILTER BUTTONS
    // When you click "Temple", "Nature", or "Heritage" button,only cards of that type are shown. "All" shows everything.

    var filterBtns = document.querySelectorAll('.filter-btn');   // all 4 filter buttons
    var filterCards = document.querySelectorAll('.filter-item');  // all the cards on the page

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {

            // remove the highlight from every button first
            filterBtns.forEach(function (b) { b.classList.remove('active'); });

            // now highlight only the button that was clicked
            btn.classList.add('active');

            // read which category this button belongs to:
            var chosen = btn.getAttribute('data-filter');

            // go through every card and decide: show it or hide it
            filterCards.forEach(function (card) {
                if (chosen === 'all' || card.classList.contains(chosen)) {
                    card.style.display = 'block'; // show this card
                } else {
                    card.style.display = 'none';  // hide this card
                }
            });

        });
    });


    // FEATURE 9 ─ CONTACT FORM (Query page)
    // On submit, show a thank-you message with the user's name

    var queryForm = document.getElementById('contactForm');

    if (queryForm) {
        queryForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var senderName = document.getElementById('name').value;
            var senderEmail = document.getElementById('email').value;

            var oldMsg = queryForm.querySelector('.success-message');
            if (oldMsg) { oldMsg.remove(); }

            var thankYou = document.createElement('p');
            thankYou.className = 'success-message';
            thankYou.textContent = 'Thank you, ' + senderName + '! We will reply to ' + senderEmail + ' soon.';
            queryForm.appendChild(thankYou);

            queryForm.reset();
        });
    }


    // FEATURE 10 ─ LIVE WEATHER OF JAMMU
    // using a free weather API called Open-Meteo.

    var weatherBox = document.getElementById('weather-box');
    var weatherURL = 'https://api.open-meteo.com/v1/forecast?latitude=32.73&longitude=74.86&current_weather=true';//the link that gives us Jammu's weather data

    if (weatherBox) {

        // fetch() sends a request to the weather website
        fetch(weatherURL)
            .then(function (reply) {
                return reply.json();
            })

            .then(function (weatherData) {
                console.log(weatherData);
                var currentTemp = weatherData.current_weather.temperature;

                var travelTip;
                if (currentTemp < 22) {
                    travelTip = 'Great time to visit Jammu! ✈️';
                } else {
                    travelTip = 'It is warm in Jammu, carry water! ☀️';
                }

                // display weather in weather box
                weatherBox.textContent = '🌡️ Jammu Right Now: ' + currentTemp + '°C  —  ' + travelTip;
            });

    }


}); 
