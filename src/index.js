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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const firebaseConfig_1 = __importDefault(require("./firebaseConfig"));
const firestore_1 = require("firebase/firestore");
const auth_1 = require("firebase/auth");
//Back-end
(0, app_1.initializeApp)(firebaseConfig_1.default);
const db = (0, firestore_1.getFirestore)();
const auth = (0, auth_1.getAuth)();
//Collections and docs
const colProducts = (0, firestore_1.collection)(db, "products");
const colUsernames = (0, firestore_1.collection)(db, "usernames");
const colRedeemRef = (0, firestore_1.doc)(db, "booleans", "gB1xtzKVA4OGM4yx8gim");
let products = [];
let usernames = [];
//Fetch the products data
(0, firestore_1.onSnapshot)(colProducts, (snapshot) => {
    snapshot.docs.forEach((doc) => {
        products.push(Object.assign(Object.assign({}, doc.data()), { id: doc.id }));
    });
});
//Fetch the username data
(0, firestore_1.onSnapshot)(colUsernames, (snapshot) => {
    snapshot.docs.forEach((doc) => {
        usernames.push(Object.assign(Object.assign({}, doc.data()), { id: doc.id }));
    });
});
const signupForm = document.querySelector(".signup");
const firstNameInput = document.querySelector("#fname");
const lastNameInput = document.querySelector("#lname");
const username = (firstNameInput === null || firstNameInput === void 0 ? void 0 : firstNameInput.value) + " " + (lastNameInput === null || lastNameInput === void 0 ? void 0 : lastNameInput.value);
//Signing up functionality
signupForm === null || signupForm === void 0 ? void 0 : signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    (0, auth_1.createUserWithEmailAndPassword)(auth, email, password)
        .then((cred) => {
        console.log("User created: " + cred);
        signupForm.reset();
    })
        .catch((err) => {
        console.log(err.message);
        const message = document.querySelector("[data-invdata-text-signup]");
        message === null || message === void 0 ? void 0 : message.classList.remove("hidden");
    });
    //add the data to database
    (0, firestore_1.addDoc)(colUsernames, {
        username: username,
        email: email,
    });
});
console.log(username);
const loginForm = document.querySelector(".login");
loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    (0, auth_1.signInWithEmailAndPassword)(auth, email, password)
        .then((cred) => {
        loginForm.reset();
        console.log("User logged in: " + cred);
    })
        .catch((err) => {
        console.log(err.message);
        const message = document.querySelector("[data-invdata-text]");
        message === null || message === void 0 ? void 0 : message.classList.remove("hidden");
    });
});
//Front-end
//Hambuger menu
const hamburgerMenuIcon = document.querySelector("[data-hambuger]");
const hamburgerMenu = document.querySelector("[data-hamburger-container]");
if (hamburgerMenuIcon && hamburgerMenu) {
    hamburgerMenuIcon.addEventListener("click", () => {
        hamburgerMenu.classList.toggle("hidden");
    });
}
document.addEventListener("DOMContentLoaded", () => {
    let slides = document.querySelectorAll("[data-slide]");
    let nextButton = document.querySelector("#next");
    let previousButton = document.querySelector("#prev");
    //Slider functionality
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
    //Back to top button functionality
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
    //Frequently asked questions functionality
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
    //API to get the country from the user and select it in the select dropdown
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
    //Product Images
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
    //Show the first product(body tag onload function)
    function showFirstProduct() {
        mahoganyImage === null || mahoganyImage === void 0 ? void 0 : mahoganyImage.classList.remove("hidden");
        casioImage === null || casioImage === void 0 ? void 0 : casioImage.classList.add("hidden");
        rolexImage === null || rolexImage === void 0 ? void 0 : rolexImage.classList.add("hidden");
        gShockImage === null || gShockImage === void 0 ? void 0 : gShockImage.classList.add("hidden");
        mahoganyButton === null || mahoganyButton === void 0 ? void 0 : mahoganyButton.classList.add("active");
    }
    showFirstProduct();
    //Dynamically browse the products
    mahoganyButton === null || mahoganyButton === void 0 ? void 0 : mahoganyButton.addEventListener("click", () => {
        mahoganyImage === null || mahoganyImage === void 0 ? void 0 : mahoganyImage.classList.remove("hidden");
        casioImage === null || casioImage === void 0 ? void 0 : casioImage.classList.add("hidden");
        rolexImage === null || rolexImage === void 0 ? void 0 : rolexImage.classList.add("hidden");
        gShockImage === null || gShockImage === void 0 ? void 0 : gShockImage.classList.add("hidden");
        productDisplay.innerText = products[0].title;
        priceDisplay.innerText = products[0].price;
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
        productDisplay.innerText = products[3].title;
        priceDisplay.innerText = products[3].price;
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
        productDisplay.innerText = products[2].title;
        priceDisplay.innerText = products[2].price;
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
        productDisplay.innerText = products[1].title;
        priceDisplay.innerText = products[1].price;
        casioButton === null || casioButton === void 0 ? void 0 : casioButton.classList.remove("active");
        mahoganyButton === null || mahoganyButton === void 0 ? void 0 : mahoganyButton.classList.remove("active");
        gShockButton === null || gShockButton === void 0 ? void 0 : gShockButton.classList.add("active");
        rolexButton === null || rolexButton === void 0 ? void 0 : rolexButton.classList.remove("active");
    });
    //Redeem codes
    let reedemCodes = ["AJXD72", "S36A21", "N1AQ77"];
    let redeemCodeInput = document.querySelector("[data-redeem-code-input]");
    let isCodeRedeemed = false; //Using this variable for database
    let redeemCodeButton = document.querySelector("[data-redeem-code-button]");
    let validReedemCodeText = document.querySelector("[data-valid]");
    let invalidReedemCodeText = document.querySelector("[data-invalid]");
    //Add the isCodeRedeemed's value into the database(Back-end)
    redeemCodeButton === null || redeemCodeButton === void 0 ? void 0 : redeemCodeButton.addEventListener("click", () => {
        for (let i = 0; i < reedemCodes.length; i++) {
            if ((redeemCodeInput === null || redeemCodeInput === void 0 ? void 0 : redeemCodeInput.value) === reedemCodes[i]) {
                validReedemCodeText === null || validReedemCodeText === void 0 ? void 0 : validReedemCodeText.classList.remove("hidden");
                (0, firestore_1.updateDoc)(colRedeemRef, {
                    isCodeRedeemed: true,
                });
                isCodeRedeemed = true;
                break;
            }
            else {
                invalidReedemCodeText === null || invalidReedemCodeText === void 0 ? void 0 : invalidReedemCodeText.classList.remove("hidden");
                break;
            }
        }
    });
    //Cart functionality
    let cartContainer = document.querySelector("[data-cart-container]");
    //Hide and show cart buttons
    let hideCart = document.querySelector("[data-remove-cart]");
    let showCart = document.querySelector("[data-show-cart]");
    hideCart === null || hideCart === void 0 ? void 0 : hideCart.addEventListener("click", () => {
        cartContainer === null || cartContainer === void 0 ? void 0 : cartContainer.classList.add("hidden");
    });
    showCart === null || showCart === void 0 ? void 0 : showCart.addEventListener("click", () => {
        cartContainer === null || cartContainer === void 0 ? void 0 : cartContainer.classList.remove("hidden");
    });
    let addToCartButton = document.querySelector("[data-atc]");
    let productsContainer = document.querySelector("[data-products]");
    let emptyCartMessage = document.querySelector("[data-cart-empty]");
    //Add to cart button for adding products into the cart
    addToCartButton === null || addToCartButton === void 0 ? void 0 : addToCartButton.addEventListener("click", () => {
        let productName = document.querySelector("#product-display");
        let productPrice = document.querySelector("#price");
        addProduct(productName, productPrice); //Function with two passed arguments,prodcut name and product price(HTML elements)
    });
    //Function updates the number of items in the cart when we add or remove items
    function updateCartNumber(number) {
        let itemNumberContainer = document.querySelector("[data-item-number]");
        itemNumberContainer.innerText = number.toString();
    }
    //Add product functions
    function addProduct(name, price) {
        //Show the cart and remove the empty cart text(Written in HTML doc)
        var _a;
        cartContainer === null || cartContainer === void 0 ? void 0 : cartContainer.classList.remove("hidden");
        (_a = document.querySelector("[data-cart-empty]")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        //Get the element values
        let productName = name.innerText;
        let productPrice = price.innerText;
        let numberOfProductsInTheCartContainer = document.querySelector("[data-number]");
        let cartNumber = Number(numberOfProductsInTheCartContainer === null || numberOfProductsInTheCartContainer === void 0 ? void 0 : numberOfProductsInTheCartContainer.innerText);
        //Template for the product(JS is remove button functionality and quantity)
        let template = `<div class="mx-auto p-2">
            <div class="flex align-items relative" style="width:100%; min-height:100px">
                <div class="flex-grow">
                    <img src="../dist/images/${productName}.jpg" alt=${productName} class = "cart-images"/>
                </div>
                <div style="flex-grow: 3" class="relative">
                    <h1 class="text-base fredoka-bold">${productName}</h1>
                    <p class="fredoka inline">${productPrice}</p>
                  <div class="inline fredoka border border-gray-400 ml-5"  style="border-radius:3px;">
                    
                     </div>
                  </div>
                  <button class="cursor-pointer p-2 absolute top-0 right-0 text-md z-10" title="Remove Product" 
      onclick="
         let cartNumber = parseInt(document.querySelector('[data-number]')?.innerText || '0') - 1;
         let cartNumberInTheNav = parseInt(document.querySelector('[data-item-number]')?.innerText || '0') - 1;
         if (cartNumber < 0) cartNumber = 0;
         let numberOfProductsInTheCartContainer = document.querySelector('[data-number]');
         let numberOfProductsInTheCartContainerInTheNav = document.querySelector('[data-item-number]');
      if (numberOfProductsInTheCartContainer) {
          numberOfProductsInTheCartContainer.innerText = cartNumber.toString();
      }
     if (numberOfProductsInTheCartContainerInTheNav) {
      numberOfProductsInTheCartContainerInTheNav.innerText = cartNumberInTheNav.toString();
     }
     parentElement.parentElement.style.display = 'none';
      if (cartNumber === 0) {
             let emptyCartMessage = document.querySelector('[data-cart-empty]');
             let productsContainer = document.querySelector('[data-products]');
             if (emptyCartMessage) emptyCartMessage.classList.remove('hidden');
             if (productsContainer) {
               productsContainer.classList.add('items-center');
               productsContainer.classList.add('flex');
            }
          } 
    ">
    &times;
  </button>
  </div>
  </div>`;
        productsContainer.classList.remove("items-center");
        productsContainer.classList.remove("flex");
        cartNumber = cartNumber + 1;
        numberOfProductsInTheCartContainer.innerText = cartNumber.toString();
        productsContainer.innerHTML += template;
        let priceForTotal = price.innerText;
        updateCartNumber(cartNumber);
        updateCartTotalPlus(priceForTotal, "-");
    }
});
//Update Cart total
function updateCartTotalPlus(price, updateType) {
    const cartTotal = document.querySelector("[data-total]");
    let totalValue = cartTotal.innerText;
    let numberTotalValue = Number(totalValue.substring(1));
    price = price.replace(",", ".");
    let updatedPricePlus = (numberTotalValue += Number(price.substring(1)));
    let updatedPriceMinus = (numberTotalValue -= Number(price.substring(1)));
    if (updateType == "+") {
        cartTotal.innerHTML = "$" + updatedPricePlus;
    }
    else if (updateType == "-") {
        cartTotal.innerHTML = "$" + updatedPriceMinus;
    }
}
