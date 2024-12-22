import { initializeApp } from "firebase/app";
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

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

const colProducts = collection(db, "products");
const colUsernames = collection(db, "usernames");
const colRedeemRef = doc(db, "booleans", "gB1xtzKVA4OGM4yx8gim");

let products: any = [];
let usernames: any = [];

onSnapshot(colProducts, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });
});

onSnapshot(colUsernames, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    usernames.push({ ...doc.data(), id: doc.id });
  });
});

const signupForm = document.querySelector<HTMLFormElement>(".signup");
const firstNameInput = document.querySelector<HTMLInputElement>("#fname");
const lastNameInput = document.querySelector<HTMLInputElement>("#lname");

const username = firstNameInput?.value + " " + lastNameInput?.value;

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

let slides = document.querySelectorAll<HTMLElement>("[data-slide]");
let nextButton = document.querySelector<HTMLButtonElement>("#next");
let previousButton = document.querySelector<HTMLButtonElement>("#prev");

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

async function fetchUserCountry(): Promise<void> {
  try {
    let selectOptions = document.querySelectorAll<HTMLOptionElement>("option");
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
let gShockButton = document.querySelector<HTMLButtonElement>("#g-shock-button");

function showFirstProduct(): any {
  mahoganyImage?.classList.remove("hidden");
  casioImage?.classList.add("hidden");
  rolexImage?.classList.add("hidden");
  gShockImage?.classList.add("hidden");

  mahoganyButton?.classList.add("active");
}

showFirstProduct();

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

  productDisplay!.innerText = products[1].title;
  priceDisplay!.innerText = products[1].price;

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

  productDisplay!.innerText = products[3].title;
  priceDisplay!.innerText = products[3].price;

  casioButton?.classList.remove("active");
  mahoganyButton?.classList.remove("active");
  gShockButton?.classList.add("active");
  rolexButton?.classList.remove("active");
});
let reedemCodes: string[] = ["AJXD72", "S36A21", "N1AQ77"];
let redeemCodeInput = document.querySelector<HTMLInputElement>(
  "[data-redeem-code-input]"
);
let isCodeRedeemed = false;
let redeemCodeButton = document.querySelector<HTMLButtonElement>(
  "[data-redeem-code-button]"
);
let validReedemCodeText =
  document.querySelector<HTMLParagraphElement>("[data-valid]");

let invalidReedemCodeText =
  document.querySelector<HTMLParagraphElement>("[data-invalid]");

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

let cartContainer = document.querySelector<HTMLDivElement>(
  "[data-cart-container]"
);
let hideCart = document.querySelector<HTMLButtonElement>("[data-remove-cart]");
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

addToCartButton?.addEventListener("click", () => {
  let productName =
    document.querySelector<HTMLHeadingElement>("#product-display");
  let productPrice = document.querySelector<HTMLParagraphElement>("#price");

  addProduct(productName!, productPrice!);
});
function updateCartNumber(number: string): void {
  let itemNumberContainer =
    document.querySelector<HTMLDivElement>("[data-item-number]");
  itemNumberContainer!.innerHTML = number;
  console.log("hello");
}
function addProduct(
  name: HTMLHeadingElement,
  price: HTMLParagraphElement
): void {
  cartContainer?.classList.remove("hidden");
  emptyCartMessage?.classList.add("hidden");

  let productName: string = name.innerText;
  let productPrice: string = price.innerText;

  let numberOfProductsInTheCartContainer =
    document.querySelector<HTMLSpanElement>("[data-number]");

  let cartNumber: number = Number(
    numberOfProductsInTheCartContainer?.innerText
  );

  let template: string = `<div class="mx-auto p-2">
              <div class="flex align-items relative" style="width:100%; min-height:100px">
                <div class="flex-grow">
                  <img src="#" alt=${productName} width="100" height="100" />
                </div>
                <div style="flex-grow: 3" class="relative">
                  <h1 class="text-base fredoka-bold">${productName}</h1>
                  <p class="fredoka">${productPrice}</p>
                </div>
                <button class="cursor-pointer p-2 absolute top-0 right-0 text-md z-10" title="Remove Product">&times;</button>
              </div>
              
            </div>`;

  console.log(template);

  productsContainer!.classList.remove("items-center");
  productsContainer!.classList.remove("flex");
  cartNumber = cartNumber + 1;
  numberOfProductsInTheCartContainer!.innerText = cartNumber.toString();
  productsContainer!.innerHTML += template;
  updateCartNumber(numberOfProductsInTheCartContainer!.innerText);
}
if (productsContainer!.children.length < 1) {
  productsContainer!.classList.add("items-center");
  productsContainer!.classList.add("flex");
  emptyCartMessage?.classList.remove("hidden");
}
