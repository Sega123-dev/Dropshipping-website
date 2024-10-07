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
let nextButton = document.querySelector("#next");
let previousButton = document.querySelector("#prev");

let slideIndex: number = 1;
showSlides(slideIndex);

function plusSlides(n: number): any {
  showSlides((slideIndex += n));
}

function showSlides(n: number): any {
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

nextButton?.addEventListener("click", () => plusSlides(1));
previousButton?.addEventListener("click", () => plusSlides(-1));
