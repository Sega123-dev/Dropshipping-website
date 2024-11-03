import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, doc } from "firebase/firestore";

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
const colRef = collection(db, "products");
let books: any = [];
onSnapshot(colRef, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
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

nextButton?.addEventListener("click", () => plusSlides(1));
previousButton?.addEventListener("click", () => plusSlides(-1));

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
backToTopButton?.addEventListener("click", () => {
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

  productDisplay!.innerText = books[0].title;
  priceDisplay!.innerText = books[0].price;

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

  productDisplay!.innerText = books[1].title;
  priceDisplay!.innerText = books[1].price;

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

  productDisplay!.innerText = books[2].title;
  priceDisplay!.innerText = books[2].price;

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

  productDisplay!.innerText = books[3].title;
  priceDisplay!.innerText = books[3].price;

  casioButton?.classList.remove("active");
  mahoganyButton?.classList.remove("active");
  gShockButton?.classList.add("active");
  rolexButton?.classList.remove("active");
});

let cartContainer = document.querySelector<HTMLDivElement>(
  "[data-cart-container]"
);
let hideCart = document.querySelector<HTMLButtonElement>("[data-remove-cart]");
let showCart = document.querySelector<HTMLAnchorElement>("[data-show-cart]");
hideCart?.addEventListener("click", () => {
  cartContainer?.classList.add("hidden");
});
showCart?.addEventListener("click", () => {
  cartContainer?.classList.remove("hidden");
});
let addToCartButton = document.querySelector<HTMLButtonElement>("[data-atc]");
