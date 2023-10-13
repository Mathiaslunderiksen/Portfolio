//Slider start

//Current image
let slide = document.querySelector(".slider-slide");
let imgIndex = 0;

//Array with images
let images = [
    "media/img01.jpg",
    "media/img02.jpg",
    "media/img03.jpg",
    "media/img04.jpg",
    "media/img05.jpg",
    "media/img06.jpg"
];

//Function that changes src and alt to the current imgIndex from images
const setActiveSlide = (index) => {
    slide.src = images[index];
    slide.alt = "img " + index;
};

//calls the function setActiveSlide with the current imgIndex
setActiveSlide(imgIndex);

//Function that increments the imgIndex and sets new active slide
const next = () => {
    //If imgindex is greater or equal the last img index in images it will be set to 0 (to start from the beginning index 0), else increment.
    if(imgIndex >= images.length - 1){
        imgIndex = 0;
    } else {
        imgIndex++;
    }
    //calls the function setActiveSlide with the current imgIndex
    setActiveSlide(imgIndex);
};

//Calls the function next every 2000ms = 2sec. 
setInterval(next, 5000);

//Slider end

//Calculator start
let calculatorContainer = document.querySelector(".calculator-inner");

//Array with each element in the calculator
let calculatorElements = [
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "C",
    "0",
    "/",
    "="
];

//Every element in calculatorElements are added to calculatorContainer as divs.
calculatorElements.forEach(element => {
    calculatorContainer.innerHTML += `<div class=calculator-item>${element}</div>`;
});

let calculatorItem = document.querySelectorAll(".calculator-item");
let userInput = document.querySelector("#text");

//Eventlistener for every element added to the calculator.
calculatorItem.forEach(item => {
    item.addEventListener("click", (e) => {
        //If target element isnt = and isnt C, the target will be added to input field.
        if(e.target.innerHTML !== "=" && e.target.innerHTML !== "C"){
        userInput.value += e.target.innerHTML;
        
        
        }
        //If target element is =, result of input field will be evaluated.
        if(e.target.innerHTML === "="){
            let result = userInput.value;
            userInput.value = eval(result);
        }
        //If target element is C, input field will be cleared.
        if(e.target.innerHTML === "C"){
            userInput.value = "";
        }

    });
});


//Calculator end

//Suggestion button and box start

let suggestionBtn = document.querySelector(".suggestion-btn");
let suggestionContainer = document.querySelector(".suggestion-box-container");
let closeBtn = document.querySelector(".close");
let form = document.querySelector("#suggestion-form");
let message = document.querySelector(".msg");

//Eventlistener on btn to show the box in modal
suggestionBtn.addEventListener("click", (e) => {
    suggestionContainer.classList.remove("hidden");
});

//Function to close modal
const close = () => {
    suggestionContainer.classList.add("hidden");
}

//Eventlistener on close sign to close modal
closeBtn.addEventListener("click", close);

//Eventlistener on form submit. Sends message if success.
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const {name} = e.target.elements;

    message.innerHTML = `<p>Thanks for your suggestion ${name.value} </p>`
});

//Suggestion button and box end


