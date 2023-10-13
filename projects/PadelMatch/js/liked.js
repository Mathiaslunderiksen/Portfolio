import { profileListTmpl } from "./templates.js";
import { getFirstStorage } from "./storage.js";

const likedProfiles = {}

/* Method that gets liked profiles from first storage in service.js and calls loadProfileListTmpl (with input profiles) */
likedProfiles.loadLikedProfiles = async () => {
    let likedArray = [];
    let local = await getFirstStorage();
    if(local != null ){
            local.forEach(e => {
                likedArray.push(e);
            })
    } 

    const likedContainer = document.querySelector(".liked-container");

    if(likedArray.length == 0){
        likedContainer.innerHTML = `<p>You haven't liked any profiles yet.</p>`
    } else{
        likedContainer.innerHTML = "";
        likedArray.forEach(e => {
            likedContainer.insertAdjacentHTML("beforeend", profileListTmpl(e))
        })
    }
}

export default likedProfiles;