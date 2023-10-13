let form = document.querySelector("#form"); //the form element
let message = document.querySelector(".msg"); //the message div element

//Eventlistener on form, that listens for submit click
form.addEventListener("submit", (e) => {
    e.preventDefault(); //Stops the form from submitting as default.

    const {name, email, select} = e.target.elements; //Stores input name in the variable name, input email in the variable email, ...
    
    //InnerHTML for msg is changed to output a success message (value is what is written in the input fields at submit click).
    message.innerHTML = `<p>Tak for købet ${name.value}!</p>
                        <p>Email: ${email.value} er nu oprettet til et</p>
                        <p>${select.value}-måneders abonnement.</p>`;
});