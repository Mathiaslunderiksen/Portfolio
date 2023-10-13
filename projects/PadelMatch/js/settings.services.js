import { settingsTmpl } from "./templates.js";
import { getThirdStorage, saveToThirdStorage } from "./storage.js";
import { loadProfiles } from "./profile.services.js";

const settings = {};

settings.init = async () => {

    /* Creating a defaultSetting object. */
    let defaultSetting = {
        "all": "checked",
        "amateur": "unchecked",
        "intermediate": "unchecked",
        "advanced": "unchecked",
        "pro": "unchecked",
        "age": 1,
        "location": 1,
        "layout": "unchecked"
    }

    const settings = document.querySelector(".settings");
    const settingsModal = document.querySelector(".settings-modal");

    /* The Setting Object to be used. */
    let setting = {};
    /* Gets the saved Setting Object from storage */
    let savedSetting = await getThirdStorage();
    /* If there is no saved Setting Object, use the defaultSetting object. Else use the saved */
    if(savedSetting == null){
        setting = defaultSetting;
    } else {
        setting = savedSetting;
    }

    /* Putting the Setting Object through the settingsTmpl. */
    settingsModal.insertAdjacentHTML("beforeend", settingsTmpl(setting))

    const closeModal = document.querySelector(".close-settings-modal");

    /* Adds Eventlistener on the setting icon, toggles modals hidden classlist  */
    settings.addEventListener("click", () => {
        settingsModal.classList.toggle("hidden");
    });

    /* Adds Eventlistener on the close button in the modal, adds classlist hidden. */
    closeModal.addEventListener("click", () => {
        settingsModal.classList.add("hidden");
    })

    /* Adds eventlistener to the switch setting. Calls saveSetting with argument "switch". Calls layoutMode */
    const switchCheckbox = document.querySelector("input[type='checkbox']");
    switchCheckbox.addEventListener("click", (e) => {
        saveSettings("switch", e);
        layoutMode();
    })

    /* Function that adds or removes class navSettings to nav. If layout switch is checked, navSettings will be added. navSettings puts nav to right */
    function layoutMode(){
        const nav = document.querySelector("nav");
        if(setting != null){
            if(setting.layout == "checked"){
                nav.classList.add("navSettings");
            } else {
                nav.classList.remove("navSettings");
            } 
        }
    }

    layoutMode();

    /* Adds eventlistener to the first range (Age). Changes the innerHTML for age-range-span to update age. Calls saveSetting with argument "ageRange" */
    const ranges = document.querySelectorAll("input[type='range']");
    const ageRangeSpan = document.querySelector(".age-range-span");
    ranges[0].addEventListener("click", (e) => {
        ageRangeSpan.innerHTML = ranges[0].value;
        saveSettings("ageRange", e);
    })

    const locationRangeSpan = document.querySelector(".location-range-span");
    ranges[1].addEventListener("click", (e) => {
        locationRangeSpan.innerHTML = ranges[1].value;
        saveSettings("locationRange", e);
    })

    let radios = document.querySelectorAll("input[type='radio']");
    radios.forEach(radio => {
        radio.addEventListener("click", (e) => {
            saveSettings("radio", e.target.id);
        })
    })

    /* Function that use input to determine which setting is changed. Updates the setting Object, and saves that object to storage. */
    function saveSettings(input, e){
        if(input == "switch"){
            if(switchCheckbox.checked){
                setting.layout = "checked";
            } else {
                setting.layout = "unchecked";
            }
        }
        if(input == "ageRange"){
            setting.age = ranges[0].value;
        }
        if(input == "locationRange"){
            setting.location = ranges[1].value;
        }
        if(input == "radio"){
            setting.all = "unchecked";
            setting.amateur = "unchecked";
            setting.intermediate = "unchecked";
            setting.advanced = "unchecked";
            setting.pro = "unchecked";

            if(e == "all"){
                setting.all = "checked";
            }
            if(e == "amateur"){
                setting.amateur = "checked";
            }
            if(e == "intermediate"){
                setting.intermediate = "checked";
            }
            if(e == "advanced"){
                setting.advanced = "checked";
            }
            if(e == "pro"){
                setting.pro = "checked";
            }
        }
        loadProfiles();
        saveToThirdStorage(setting);
    }

}

export default settings;