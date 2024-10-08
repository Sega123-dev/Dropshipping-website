const firebaseConfig = {
  apiKey: "AIzaSyCVQV958Z41fzCxgG9S11QAvBzW1xZy_4o",
  authDomain: "dropshiping-website.firebaseapp.com",
  projectId: "dropshiping-website",
  storageBucket: "dropshiping-website.appspot.com",
  messagingSenderId: "88265939594",
  appId: "1:88265939594:web:2f6292f1ca92a5c3e9eb73",
  measurementId: "G-E3T06T74CL",
};
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

let backToTopButton: HTMLButtonElement | null =
  document.querySelector("[data-back-to-top]");

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
let secondFAQ: Element = FAQs[2];

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
