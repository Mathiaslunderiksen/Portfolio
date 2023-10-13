const burger = document.querySelector(".burger-btn"); //The burger-btn that contains three bars
const navUL = document.querySelector(".nav-ul"); //The nav-ul that contains the nav links
const bars = document.querySelectorAll(".bar"); //Each of the three bars of the burger-menu

//Eventlistener on the burger-btn, listens for click
burger.addEventListener("click", () => {
    //Toggles class show on nav-ul
    navUL.classList.toggle("show");

    // For each of the three bars, add class active (first and third bar will rotate, second will dissapear)
    bars.forEach(element => {
	element.classList.toggle("active");
});
});

//Eventlistener on the nav-ul, listens for click
navUL.addEventListener("click", () => {
    // Removes class show on nav-ul 
    navUL.classList.remove("show");
    
    // For each of the three bars, remove class active (first and third bar will rotate to default, second will appear again)
    bars.forEach(element => {
        element.classList.remove("active");
    });
});