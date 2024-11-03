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
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyCVQV958Z41fzCxgG9S11QAvBzW1xZy_4o",
    authDomain: "dropshiping-website.firebaseapp.com",
    projectId: "dropshiping-website",
    storageBucket: "dropshiping-website.appspot.com",
    messagingSenderId: "88265939594",
    appId: "1:88265939594:web:2f6292f1ca92a5c3e9eb73",
    measurementId: "G-E3T06T74CL",
};
//Back-end
(0, app_1.initializeApp)(firebaseConfig);
const db = (0, firestore_1.getFirestore)();
const colRef = (0, firestore_1.collection)(db, "products");
let books = [];
(0, firestore_1.onSnapshot)(colRef, (snapshot) => {
    snapshot.docs.forEach((doc) => {
        books.push(Object.assign(Object.assign({}, doc.data()), { id: doc.id }));
    });
    console.log(books);
});
//Front-end
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
fetchUserCountry();
let mahoganyImage = document.querySelector("#mahogany");
let casioImage = document.querySelector("#casio");
let rolexImage = document.querySelector("#rolex");
let gShockImage = document.querySelector("#g-shock");
let productDisplay = document.querySelector("#product-display");
let priceDisplay = document.querySelector("#price");
let mahoganyButton = document.querySelector("#mahogany-button");
let casioButton = document.querySelector("#casio-button");
let rolexButton = document.querySelector("#rolex-button");
let gShockButton = document.querySelector("#g-shock-button");
function showFirstProduct() {
    mahoganyImage === null || mahoganyImage === void 0 ? void 0 : mahoganyImage.classList.remove("hidden");
    casioImage === null || casioImage === void 0 ? void 0 : casioImage.classList.add("hidden");
    rolexImage === null || rolexImage === void 0 ? void 0 : rolexImage.classList.add("hidden");
    gShockImage === null || gShockImage === void 0 ? void 0 : gShockImage.classList.add("hidden");
    mahoganyButton === null || mahoganyButton === void 0 ? void 0 : mahoganyButton.classList.add("active");
}
showFirstProduct();
mahoganyButton === null || mahoganyButton === void 0 ? void 0 : mahoganyButton.addEventListener("click", () => {
    mahoganyImage === null || mahoganyImage === void 0 ? void 0 : mahoganyImage.classList.remove("hidden");
    casioImage === null || casioImage === void 0 ? void 0 : casioImage.classList.add("hidden");
    rolexImage === null || rolexImage === void 0 ? void 0 : rolexImage.classList.add("hidden");
    gShockImage === null || gShockImage === void 0 ? void 0 : gShockImage.classList.add("hidden");
    productDisplay.innerText = books[0].title;
    priceDisplay.innerText = books[0].price;
    casioButton === null || casioButton === void 0 ? void 0 : casioButton.classList.remove("active");
    mahoganyButton === null || mahoganyButton === void 0 ? void 0 : mahoganyButton.classList.add("active");
    gShockButton === null || gShockButton === void 0 ? void 0 : gShockButton.classList.remove("active");
    rolexButton === null || rolexButton === void 0 ? void 0 : rolexButton.classList.remove("active");
});
casioButton === null || casioButton === void 0 ? void 0 : casioButton.addEventListener("click", () => {
    mahoganyImage === null || mahoganyImage === void 0 ? void 0 : mahoganyImage.classList.add("hidden");
    casioImage === null || casioImage === void 0 ? void 0 : casioImage.classList.remove("hidden");
    rolexImage === null || rolexImage === void 0 ? void 0 : rolexImage.classList.add("hidden");
    gShockImage === null || gShockImage === void 0 ? void 0 : gShockImage.classList.add("hidden");
    productDisplay.innerText = books[1].title;
    priceDisplay.innerText = books[1].price;
    casioButton === null || casioButton === void 0 ? void 0 : casioButton.classList.add("active");
    mahoganyButton === null || mahoganyButton === void 0 ? void 0 : mahoganyButton.classList.remove("active");
    gShockButton === null || gShockButton === void 0 ? void 0 : gShockButton.classList.remove("active");
    rolexButton === null || rolexButton === void 0 ? void 0 : rolexButton.classList.remove("active");
});
rolexButton === null || rolexButton === void 0 ? void 0 : rolexButton.addEventListener("click", () => {
    mahoganyImage === null || mahoganyImage === void 0 ? void 0 : mahoganyImage.classList.add("hidden");
    casioImage === null || casioImage === void 0 ? void 0 : casioImage.classList.add("hidden");
    rolexImage === null || rolexImage === void 0 ? void 0 : rolexImage.classList.remove("hidden");
    gShockImage === null || gShockImage === void 0 ? void 0 : gShockImage.classList.add("hidden");
    productDisplay.innerText = books[2].title;
    priceDisplay.innerText = books[2].price;
    casioButton === null || casioButton === void 0 ? void 0 : casioButton.classList.remove("active");
    mahoganyButton === null || mahoganyButton === void 0 ? void 0 : mahoganyButton.classList.remove("active");
    gShockButton === null || gShockButton === void 0 ? void 0 : gShockButton.classList.remove("active");
    rolexButton === null || rolexButton === void 0 ? void 0 : rolexButton.classList.add("active");
});
gShockButton === null || gShockButton === void 0 ? void 0 : gShockButton.addEventListener("click", () => {
    mahoganyImage === null || mahoganyImage === void 0 ? void 0 : mahoganyImage.classList.add("hidden");
    casioImage === null || casioImage === void 0 ? void 0 : casioImage.classList.add("hidden");
    rolexImage === null || rolexImage === void 0 ? void 0 : rolexImage.classList.add("hidden");
    gShockImage === null || gShockImage === void 0 ? void 0 : gShockImage.classList.remove("hidden");
    productDisplay.innerText = books[3].title;
    priceDisplay.innerText = books[3].price;
    casioButton === null || casioButton === void 0 ? void 0 : casioButton.classList.remove("active");
    mahoganyButton === null || mahoganyButton === void 0 ? void 0 : mahoganyButton.classList.remove("active");
    gShockButton === null || gShockButton === void 0 ? void 0 : gShockButton.classList.add("active");
    rolexButton === null || rolexButton === void 0 ? void 0 : rolexButton.classList.remove("active");
});
let cartContainer = document.querySelector("[data-cart-container]");
let hideCart = document.querySelector("[data-remove-cart]");
let showCart = document.querySelector("[data-show-cart]");
hideCart === null || hideCart === void 0 ? void 0 : hideCart.addEventListener("click", () => {
    cartContainer === null || cartContainer === void 0 ? void 0 : cartContainer.classList.add("hidden");
});
showCart === null || showCart === void 0 ? void 0 : showCart.addEventListener("click", () => {
    cartContainer === null || cartContainer === void 0 ? void 0 : cartContainer.classList.remove("hidden");
});
let addToCartButton = document.querySelector("[data-atc]");
