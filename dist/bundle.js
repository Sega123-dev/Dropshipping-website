/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst firebaseConfig = {\n    apiKey: \"AIzaSyCVQV958Z41fzCxgG9S11QAvBzW1xZy_4o\",\n    authDomain: \"dropshiping-website.firebaseapp.com\",\n    projectId: \"dropshiping-website\",\n    storageBucket: \"dropshiping-website.appspot.com\",\n    messagingSenderId: \"88265939594\",\n    appId: \"1:88265939594:web:2f6292f1ca92a5c3e9eb73\",\n    measurementId: \"G-E3T06T74CL\",\n};\nlet slides = document.querySelectorAll(\"[data-slide]\");\nlet nextButton = document.querySelector(\"#next\");\nlet previousButton = document.querySelector(\"#prev\");\nlet slideIndex = 1;\nshowSlides(slideIndex);\nfunction plusSlides(n) {\n    showSlides((slideIndex += n));\n}\nfunction showSlides(n) {\n    if (n > slides.length)\n        slideIndex = 1;\n    if (n < 1)\n        slideIndex = slides.length;\n    for (let i = 0; i < slides.length; i++) {\n        slides[i].classList.add(\"hidden\");\n    }\n    slides[slideIndex - 1].classList.remove(\"hidden\");\n}\nnextButton === null || nextButton === void 0 ? void 0 : nextButton.addEventListener(\"click\", () => plusSlides(1));\npreviousButton === null || previousButton === void 0 ? void 0 : previousButton.addEventListener(\"click\", () => plusSlides(-1));\nlet backToTopButton = document.querySelector(\"[data-back-to-top]\");\nwindow.onscroll = () => {\n    showBTTButton();\n};\nfunction showBTTButton() {\n    if (document.body.scrollTop > 200 ||\n        document.documentElement.scrollTop > 200) {\n        backToTopButton.style.display = \"block\";\n    }\n    else {\n        backToTopButton.style.display = \"none\";\n    }\n}\nbackToTopButton === null || backToTopButton === void 0 ? void 0 : backToTopButton.addEventListener(\"click\", () => {\n    document.body.scrollTop = 0;\n    document.documentElement.scrollTop = 0;\n});\nlet FAQs = document.querySelectorAll(\"[data-faq]\");\nlet FAQAnswers = document.querySelectorAll(\"[data-answer]\");\nlet secondFAQ = FAQs[2];\nfunction FAQsFunctionImplement() {\n    for (let i = 0; i < FAQs.length; i++) {\n        FAQs[i].addEventListener(\"click\", () => {\n            FAQAnswers[i].classList.remove(\"hidden\");\n            FAQAnswers[i].classList.add(\"block\");\n            if (FAQAnswers[i].style.display === \"none\") {\n                FAQAnswers[i].style.display = \"block\";\n            }\n            else {\n                FAQAnswers[i].style.display = \"none\";\n            }\n        });\n    }\n}\nFAQsFunctionImplement();\nfunction fetchUserCountry() {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            let selectOptions = document.querySelectorAll(\"option\");\n            const response = yield fetch(\"https://ipapi.co/json/\");\n            if (!response.ok) {\n                throw new Error(\"Fetching User Country Failed\");\n            }\n            const data = yield response.json();\n            selectOptions.forEach((option) => {\n                if (option.value === data.country_name) {\n                    option.selected = true;\n                }\n            });\n        }\n        catch (error) {\n            console.error(error);\n        }\n    });\n}\nwindow.onload = fetchUserCountry;\n\n\n//# sourceURL=webpack://dropshiping-website/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;