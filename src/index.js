"use strict";
const firebaseConfig = {
    apiKey: "AIzaSyCVQV958Z41fzCxgG9S11QAvBzW1xZy_4o",
    authDomain: "dropshiping-website.firebaseapp.com",
    projectId: "dropshiping-website",
    storageBucket: "dropshiping-website.appspot.com",
    messagingSenderId: "88265939594",
    appId: "1:88265939594:web:2f6292f1ca92a5c3e9eb73",
    measurementId: "G-E3T06T74CL",
};
let slides = document.querySelectorAll("[data-slide]");
let nextButton = document.querySelector("#next");
let previousButton = document.querySelector("#prev");
let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
    showSlides((slideIndex += n));
}
function showSlides(n) {
    if (n > slides.length)
        slideIndex = 1;
    if (n < 1)
        slideIndex = slides.length;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}
nextButton === null || nextButton === void 0 ? void 0 : nextButton.addEventListener("click", () => plusSlides(1));
previousButton === null || previousButton === void 0 ? void 0 : previousButton.addEventListener("click", () => plusSlides(-1));
let backToTopButton = document.querySelector("[data-back-to-top]");
window.onscroll = () => {
    showBTTButton();
};
function showBTTButton() {
    if (document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200) {
        backToTopButton.style.display = "block";
    }
    else {
        backToTopButton.style.display = "none";
    }
}
backToTopButton === null || backToTopButton === void 0 ? void 0 : backToTopButton.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
