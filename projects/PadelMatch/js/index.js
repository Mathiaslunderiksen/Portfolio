import likedProfiles from "./liked.js";
import { loadProfiles, loadSingleProfile } from "./profile.services.js";
import settings from "./settings.services.js";

const app = {};

app.init = async () => {
    /* Calls method init from settings.services.js */
    settings.init();
    /* If profile-container exists (frontpage.html) call function loadProfiles */
    if(document.querySelector(".profile-container")){
        loadProfiles();
    }
    /* If single-profile-container exists (profile.html) call function loadSingleProfile */
    if(document.querySelector(".single-profile-container")){
        loadSingleProfile();
    }
    /* If liked-container exists (liked.html) use method loadLikedProfiles from liked.js */
    if(document.querySelector(".liked-container")){
        likedProfiles.loadLikedProfiles();
    }
};

app.init();