"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        slides[i].classList.add("hidden");
    }
    slides[slideIndex - 1].classList.remove("hidden");
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
let FAQs = document.querySelectorAll("[data-faq]");
let FAQAnswers = document.querySelectorAll("[data-answer]");
let secondFAQ = FAQs[2];
function FAQsFunctionImplement() {
    for (let i = 0; i < FAQs.length; i++) {
        FAQs[i].addEventListener("click", () => {
            FAQAnswers[i].classList.remove("hidden");
            FAQAnswers[i].classList.add("block");
            if (FAQAnswers[i].style.display === "none") {
                FAQAnswers[i].style.display = "block";
            }
            else {
                FAQAnswers[i].style.display = "none";
            }
        });
    }
}
FAQsFunctionImplement();
function fetchUserCountry() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let selectOptions = document.querySelectorAll("option");
            const response = yield fetch("https://ipapi.co/json/");
            if (!response.ok) {
                throw new Error("Fetching User Country Failed");
            }
            const data = yield response.json();
            selectOptions.forEach((option) => {
                if (option.value === data.country_name) {
                    option.selected = true;
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    });
}
window.onload = fetchUserCountry;
