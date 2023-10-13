import service from "./data.services.js";
import { getSecondStorage, saveToFirstStorage, saveToSecondStorage, getThirdStorage } from "./storage.js";
import { profileListTmpl, profileSingleTmpl } from "./templates.js";

/* Empty Array */
let array = [];


/* Method that gets profiles from seconds storage in service.js, then calls applySettings with input array
, to shows filtered profiles according to settings set, then calls loadProfileListTmpl (with input profiles) */
export async function loadProfiles() {
    const input = await service.getProfiles();
    array = input;

    let likedStorage = await getSecondStorage();
    if(likedStorage == null){
        let filteredArray = await applySettings(array);
        loadProfileListTmpl(filteredArray);
    } else {
        array = likedStorage;
        let filteredArray = await applySettings(likedStorage);
        loadProfileListTmpl(filteredArray);
    }
    
}

/* Function that filters input array according to settings saved in third storage in service.js */
async function applySettings(array){

    let settings = await getThirdStorage();
    if(settings != null){
        let lvl = "All";
        if(settings.all == "checked"){
            lvl = "All";
        }
        if(settings.amateur == "checked"){
            lvl = "Amateur";
        }
        if(settings.intermediate == "checked"){
            lvl = "Intermediate";
        }
        if(settings.advanced == "checked"){
            lvl = "Advanced";
        }
        if(settings.pro == "checked"){
            lvl = "Pro";
        }
        let filteredArray;
        if(lvl != "All"){
            filteredArray = array.filter(e => e.level == lvl);
        } else {
            filteredArray = array;
        }
        let filteredArrayTwo = filteredArray.filter(e => ((e.ageOne + e.ageTwo) / 2) < settings.age);
        let filteredArrayThree = filteredArrayTwo.filter(e => e.distanceAway < settings.location);
        
        return filteredArrayThree;
    } else {
        return array;
    }
    
}

/* Function that resets profile-container, and then loops over profile array, adds every profile to profileListTmpl. Calls btnEvents  */
function loadProfileListTmpl(inputarray){
    const containerOutput = document.querySelector('.profile-container');
    containerOutput.innerHTML = "";
    inputarray.forEach(profile => {
        containerOutput.insertAdjacentHTML("beforeend", profileListTmpl(profile))
    });
    btnEvents();
}

/* Function that calls likeBtnEvent and dislikeBtnEvent */
function btnEvents(){
    likeBtnEvent();
    dislikeBtnEvent();
}

/* Function that gets every thumbs up on each profile. Adds eventlistener for each thumbs up, which calls btnEventHelper (with input e and "liked")
and then calls loadProfileListTmpl to refresh */
function likeBtnEvent(){
    const likeBtns = document.querySelectorAll(".box-thumbs-up");
    likeBtns.forEach(e => {
        e.addEventListener("click", (e) => {
            btnEventHelper(e, "liked");
            
        });
    })
}

/* Function that gets every thumbs down on each profile. Adds eventlistener for each thumbs down, which calls btnEventHelper (with input e and "disliked")
and then calls loadProfileListTmpl to refresh */
function dislikeBtnEvent(){
    const dislikeBtns = document.querySelectorAll(".box-thumbs-down");
    dislikeBtns.forEach(e => {
        e.addEventListener("click", (e) => {
            btnEventHelper(e, "disliked");
            
        });
    })
}

/* Function that: Gets classNames of the target event, gets last two characters in the className string. If second last char is -, change to empty,
targetID is now an id of the button. Loops the array with every profile to find the id that has the targetID. Find the index in the array, for the target
Profile. If profile is notDecided: Changes the Objects liked key value to the status(argument can either be "liked" or "disliked"). 
Likes is saved in localstorage for liked.html. If profile already liked/disliked calls openSubscriptionModal */
function btnEventHelper(e, status){
    let target = e.target.className;
    let targetChar1 = target.charAt(target.length - 1);
    let targetChar2 = target.charAt(target.length - 2);
    if(targetChar2 == "-"){
        targetChar2 = "";
    }
    let targetID = targetChar2 + targetChar1;
    
    let targetProfile = array.find(profile => profile.id == targetID);
    let indexOfTargetProfile = array.indexOf(targetProfile);
    if(array[indexOfTargetProfile].liked == "notDecided"){
        if(status === "liked"){
            saveToFirstStorage(targetProfile);
        }

        array[indexOfTargetProfile].liked = `${status}`;
        saveToSecondStorage(array);
        loadProfiles();
    } else {
        if(array[indexOfTargetProfile].liked != status){
            openSubscriptionModal();
        }
    }
}

/* Function that toggles class hidden on the subscription-modal, and also adds eventlistener to the close sign (in the modal). */
function openSubscriptionModal(){
    const subscriptionModal = document.querySelector(".subscription-modal");
    const closeModal = document.querySelector(".close-subscription-modal");

    subscriptionModal.classList.toggle("hidden");

    closeModal.addEventListener("click", () => {
        subscriptionModal.classList.add("hidden");
    });
}

/* Method that loads single profiles. It gets the id from the URL. Finds the profile.id that matches id from URL, and then inserts profile into
profileSingleTmpl */
export async function loadSingleProfile() {
    
    let search = location.search;
    let profileID = new URLSearchParams(search).get('id');
    
    const input = await service.getProfiles();
    
    const containerOutput = document.querySelector(".single-profile-container");
    const foundProfile = input.find((profile) => profile.id == profileID);
    
    containerOutput.insertAdjacentHTML("beforeend", profileSingleTmpl(foundProfile))
}
