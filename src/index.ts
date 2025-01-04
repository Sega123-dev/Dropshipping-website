import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

//Back-end

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

//Collections and docs

const colProducts = collection(db, "products");
const colUsernames = collection(db, "usernames");
const colRedeemRef = doc(db, "booleans", "gB1xtzKVA4OGM4yx8gim");

let products: any = [];
let usernames: any = [];

//Fetch the products data

onSnapshot(colProducts, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });
});

//Fetch the username data

onSnapshot(colUsernames, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    usernames.push({ ...doc.data(), id: doc.id });
  });
});

const signupForm = document.querySelector<HTMLFormElement>(".signup");
const firstNameInput = document.querySelector<HTMLInputElement>("#fname");
const lastNameInput = document.querySelector<HTMLInputElement>("#lname");

const username = firstNameInput?.value + " " + lastNameInput?.value;

//Signing up functionality

signupForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("User created: " + cred);
      signupForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });

  //add the data to database

  addDoc(colUsernames, {
    username: username,
    email: email,
  });
});

console.log(username);
const loginForm = document.querySelector<HTMLFormElement>(".login");
loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      loginForm.reset();
      console.log("User logged in: " + cred);
    })
    .catch((err) => {
      console.log(err.message);
    });
});
//Front-end
document.addEventListener("DOMContentLoaded", () => {
  let slides = document.querySelectorAll<HTMLElement>("[data-slide]");
  let nextButton = document.querySelector<HTMLButtonElement>("#next");
  let previousButton = document.querySelector<HTMLButtonElement>("#prev");

  //Slider functionality

  let slideIndex: number = 1;
  showSlides(slideIndex);

  function plusSlides(n: number): any {
    showSlides((slideIndex += n));
  }

  function showSlides(n: number): any {
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.add("hidden");
    }
    slides[slideIndex - 1].classList.remove("hidden");
  }

  nextButton?.addEventListener("click", (): void => plusSlides(1));
  previousButton?.addEventListener("click", (): void => plusSlides(-1));

  let backToTopButton = document.querySelector(
    "[data-back-to-top]"
  ) as HTMLButtonElement;

  //Back to top button functionality

  window.onscroll = (): void => {
    showBTTButton();
  };

  function showBTTButton(): void {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      backToTopButton!.style.display = "block";
    } else {
      backToTopButton!.style.display = "none";
    }
  }
  backToTopButton?.addEventListener("click", (): void => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  //Frequently asked questions functionality

  let FAQs = document.querySelectorAll("[data-faq]");
  let FAQAnswers = document.querySelectorAll<HTMLElement>("[data-answer]");

  function FAQsFunctionImplement(): void {
    for (let i = 0; i < FAQs.length; i++) {
      FAQs[i].addEventListener("click", () => {
        FAQAnswers[i].classList.remove("hidden");
        FAQAnswers[i].classList.add("block");

        if (FAQAnswers[i].style.display === "none") {
          FAQAnswers[i].style.display = "block";
        } else {
          FAQAnswers[i].style.display = "none";
        }
      });
    }
  }
  FAQsFunctionImplement();

  //API to get the country from the user and select it in the select dropdown

  async function fetchUserCountry(): Promise<void> {
    try {
      let selectOptions =
        document.querySelectorAll<HTMLOptionElement>("option");
      const response = await fetch("https://ipapi.co/json/");

      if (!response.ok) {
        throw new Error("Fetching User Country Failed");
      }
      const data = await response.json();
      selectOptions.forEach((option) => {
        if (option.value === data.country_name) {
          option.selected = true;
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  fetchUserCountry();

  //Product Images

  let mahoganyImage = document.querySelector<HTMLImageElement>("#mahogany");
  let casioImage = document.querySelector<HTMLImageElement>("#casio");
  let rolexImage = document.querySelector<HTMLImageElement>("#rolex");
  let gShockImage = document.querySelector<HTMLImageElement>("#g-shock");

  let productDisplay =
    document.querySelector<HTMLHeadingElement>("#product-display");
  let priceDisplay = document.querySelector<HTMLParagraphElement>("#price");
  let mahoganyButton =
    document.querySelector<HTMLButtonElement>("#mahogany-button");
  let casioButton = document.querySelector<HTMLButtonElement>("#casio-button");
  let rolexButton = document.querySelector<HTMLButtonElement>("#rolex-button");
  let gShockButton =
    document.querySelector<HTMLButtonElement>("#g-shock-button");

  //Show the first product(body tag onload function)

  function showFirstProduct(): any {
    mahoganyImage?.classList.remove("hidden");
    casioImage?.classList.add("hidden");
    rolexImage?.classList.add("hidden");
    gShockImage?.classList.add("hidden");

    mahoganyButton?.classList.add("active");
  }

  showFirstProduct();

  //Dynamically browse the products

  mahoganyButton?.addEventListener("click", () => {
    mahoganyImage?.classList.remove("hidden");
    casioImage?.classList.add("hidden");
    rolexImage?.classList.add("hidden");
    gShockImage?.classList.add("hidden");

    productDisplay!.innerText = products[0].title;
    priceDisplay!.innerText = products[0].price;

    casioButton?.classList.remove("active");
    mahoganyButton?.classList.add("active");
    gShockButton?.classList.remove("active");
    rolexButton?.classList.remove("active");
  });
  casioButton?.addEventListener("click", () => {
    mahoganyImage?.classList.add("hidden");
    casioImage?.classList.remove("hidden");
    rolexImage?.classList.add("hidden");
    gShockImage?.classList.add("hidden");

    productDisplay!.innerText = products[3].title;
    priceDisplay!.innerText = products[3].price;

    casioButton?.classList.add("active");
    mahoganyButton?.classList.remove("active");
    gShockButton?.classList.remove("active");
    rolexButton?.classList.remove("active");
  });
  rolexButton?.addEventListener("click", () => {
    mahoganyImage?.classList.add("hidden");
    casioImage?.classList.add("hidden");
    rolexImage?.classList.remove("hidden");
    gShockImage?.classList.add("hidden");

    productDisplay!.innerText = products[2].title;
    priceDisplay!.innerText = products[2].price;

    casioButton?.classList.remove("active");
    mahoganyButton?.classList.remove("active");
    gShockButton?.classList.remove("active");
    rolexButton?.classList.add("active");
  });
  gShockButton?.addEventListener("click", () => {
    mahoganyImage?.classList.add("hidden");
    casioImage?.classList.add("hidden");
    rolexImage?.classList.add("hidden");
    gShockImage?.classList.remove("hidden");

    productDisplay!.innerText = products[1].title;
    priceDisplay!.innerText = products[1].price;

    casioButton?.classList.remove("active");
    mahoganyButton?.classList.remove("active");
    gShockButton?.classList.add("active");
    rolexButton?.classList.remove("active");
  });

  //Redeem codes

  let reedemCodes: string[] = ["AJXD72", "S36A21", "N1AQ77"];
  let redeemCodeInput = document.querySelector<HTMLInputElement>(
    "[data-redeem-code-input]"
  );
  let isCodeRedeemed: boolean = false; //Using this variable for database
  let redeemCodeButton = document.querySelector<HTMLButtonElement>(
    "[data-redeem-code-button]"
  );
  let validReedemCodeText =
    document.querySelector<HTMLParagraphElement>("[data-valid]");

  let invalidReedemCodeText =
    document.querySelector<HTMLParagraphElement>("[data-invalid]");

  //Add the isCodeRedeemed's value into the database(Back-end)

  redeemCodeButton?.addEventListener("click", (): void => {
    for (let i = 0; i < reedemCodes.length; i++) {
      if (redeemCodeInput?.value === reedemCodes[i]) {
        validReedemCodeText?.classList.remove("hidden");
        updateDoc(colRedeemRef, {
          isCodeRedeemed: true,
        });
        isCodeRedeemed = true;
        break;
      } else {
        invalidReedemCodeText?.classList.remove("hidden");
        break;
      }
    }
  });

  //Cart functionality

  let cartContainer = document.querySelector<HTMLDivElement>(
    "[data-cart-container]"
  );

  //Hide and show cart buttons

  let hideCart =
    document.querySelector<HTMLButtonElement>("[data-remove-cart]");
  let showCart = document.querySelector<HTMLAnchorElement>("[data-show-cart]");
  hideCart?.addEventListener("click", (): void => {
    cartContainer?.classList.add("hidden");
  });
  showCart?.addEventListener("click", (): void => {
    cartContainer?.classList.remove("hidden");
  });
  let addToCartButton = document.querySelector<HTMLButtonElement>("[data-atc]");
  let productsContainer =
    document.querySelector<HTMLDivElement>("[data-products]");

  let emptyCartMessage =
    document.querySelector<HTMLParagraphElement>("[data-cart-empty]");

  //Add to cart button for adding products into the cart

  addToCartButton?.addEventListener("click", () => {
    let productName =
      document.querySelector<HTMLHeadingElement>("#product-display");
    let productPrice = document.querySelector<HTMLParagraphElement>("#price");

    addProduct(productName!, productPrice!); //Function with two passed arguments,prodcut name and product price(HTML elements)
  });

  //Function updates the number of items in the cart when we add or remove items

  function updateCartNumber(number: number): void {
    let itemNumberContainer =
      document.querySelector<HTMLDivElement>("[data-item-number]");
    itemNumberContainer!.innerText = number.toString();
  }

  //Add product functions

  function addProduct(
    name: HTMLHeadingElement,
    price: HTMLParagraphElement
  ): void {
    //Show the cart and remove the empty cart text(Written in HTML doc)

    cartContainer?.classList.remove("hidden");
    document.querySelector("[data-cart-empty]")?.classList.add("hidden");

    //Get the element values

    let productName: string = name.innerText;
    let productPrice: string = price.innerText;

    let numberOfProductsInTheCartContainer =
      document.querySelector<HTMLSpanElement>("[data-number]");

    let cartNumber: number = Number(
      numberOfProductsInTheCartContainer?.innerText
    );

    //Template for the product(JS is remove button functionality and quantity buttons)

    let template: string = `<div class="mx-auto p-2">
            <div class="flex align-items relative" style="width:100%; min-height:100px">
                <div class="flex-grow">
                    <img src="../images/mahogany.jpg" alt=${productName} width="100" height="100" />
                </div>
                <div style="flex-grow: 3" class="relative">
                    <h1 class="text-base fredoka-bold">${productName}</h1>
                    <p class="fredoka inline">${productPrice}</p>
                  <div class="inline fredoka border border-gray-400 ml-5"  style="border-radius:3px;">
                    <button class="px-2 text-lg" onclick="   
            let quantity =
                 document.querySelector('[data-quantity]').innerText;
                  if (quantity) {
                    let number = parseInt(quantity);
                    number++;
                    document.querySelector('[data-quantity]').innerText =
                    number.toString();
                  }">+</button>
                       <span class="border-r border-l border-gray-400 px-2" data-quantity>0</span>
                    <button class="px-2 text-lg" onclick="
                    let quantity =
                 document.querySelector('[data-quantity]').innerText;
                  if (quantity) {
                    let number = parseInt(quantity);
                    number--;
                    if(number < 0) number = 0;
                    document.querySelector('[data-quantity]').innerText =
                    number.toString();
                  }">-</button>
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
    productsContainer!.classList.remove("items-center");
    productsContainer!.classList.remove("flex");
    cartNumber = cartNumber + 1;
    numberOfProductsInTheCartContainer!.innerText = cartNumber.toString();
    productsContainer!.innerHTML += template;
    updateCartNumber(cartNumber);
  }
});
