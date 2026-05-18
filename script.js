
document.addEventListener('DOMContentLoaded', function () {


    // feature 1 ─ for small screens

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

    // feature 2
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


    // feature 3 ─ redirect to the login page if the user hasnt login

    var loginStatus = localStorage.getItem('userLoggedIn'); 

    var protectedPages = ['places.html', 'food.html', 'culture.html', 'query.html'];

    // check if current page is in the protected list
    var pageNeedsLogin = protectedPages.indexOf(currentPage) !== -1;

    if (loginStatus !== 'yes' && pageNeedsLogin) {
        window.location.href = 'login.html';
    }


    // feature 4─ 


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


    // feature 5─ 
    


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


    // feautre 6 ─ login form
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


    // feature 7

    var greetingText = document.getElementById('greeting');

    if (greetingText) {
        var currentHour = new Date().getHours();
        console.log(currentHour);
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


    //  Feature 8 ─ filter buttons
    // When you click "Temple", "Nature", or "Heritage" button,only cards of that type are shown. "All" shows everything.

    var filterBtns = document.querySelectorAll('.filter-btn');   
    var filterCards = document.querySelectorAll('.filter-item');  

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {

           
            filterBtns.forEach(function (b) { b.classList.remove('active'); });

            
            btn.classList.add('active');

            // read which category this button belongs to:
            var chosen = btn.getAttribute('data-filter');

            
            filterCards.forEach(function (card) {
                if (chosen === 'all' || card.classList.contains(chosen)) {
                 card.style.display = 'block'; 
                } else {
                    card.style.display = 'none'; 
                }
            });

        });
    });


    // feature 9 ─ contact form (Query page)

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


    // feature 10 ─ live weather of jammu
    // using a free weather API called Open-Meteo.

    var weatherBox = document.getElementById('weather-box');
    var weatherURL = 'https://api.open-meteo.com/v1/forecast?latitude=32.73&longitude=74.86&current_weather=true';//the link that gives us Jammu's weather data
                      
    if (weatherBox) {

       
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


                weatherBox.textContent = '🌡️ Jammu Right Now: ' + currentTemp + '°C  —  ' + travelTip;
            });

    }


}); 
