/* Template to show profiles (used in frontpage.html and liked.html) */
export function profileListTmpl(profile){
    return `
    <div class="profile">
        <a href="profile.html?id=${profile.id}"><img class="profile-img" src="${profile.image}"></a>
        <p class="profile-goto">See Profile</p>
        <div class="profile-box">
            <p class="profile-box-name">${profile.name}</p>
            <div class="profile-box-btn">
                <i class="fa fa-thumbs-up fa-2x box-thumbs-up thumbs-up-${profile.id}" aria-hidden="true"></i>
                <i class="fa fa-thumbs-down fa-2x box-thumbs-down thumbs-down-${profile.id}" aria-hidden="true"></i>
            </div>
        </div>
        <div class="overlay ${profile.liked}">${profile.liked}</div>
    </div>
    `
}

/* Template to show a single profile (used in myprofile.html and profile.html) */
export function profileSingleTmpl(profile){
    return `
        <div class="single-profile">
            <div class="single-profile-first"><img class="profile-img" src="${profile.image}"></div>
            <div class="single-profile-second">
                <p class="single-profile-name">${profile.name} (${profile.ageOne} & ${profile.ageTwo} y.o)</p>
                <p class="single-profile-level">Padel Tennis Level: ${profile.level}</p>
                <p class="single-profile-description">${profile.description}</p>
            </div>
        </div>
    `
}

/* Template to show all settings (used when clicked on settings icon in nav) */
export function settingsTmpl(setting){
    return `
        <div class="settings-box">
            <div class="settings-box-inner">
            <div class="radio">
                    <p>Level</p>
                    <input type="radio" id="all" name="level" value="All" ${setting.all}>
                    <label for="amateur">All</label><br>
                    <input type="radio" id="amateur" name="level" value="Amateur" ${setting.amateur}>
                    <label for="amateur">Amateur</label><br>
                    <input type="radio" id="intermediate" name="level" value="Intermediate" ${setting.intermediate}>
                    <label for="intermediate">Intermediate</label><br>
                    <input type="radio" id="advanced" name="level" value="Advanced" ${setting.advanced}>
                    <label for="advanced">Advanced</label><br>
                    <input type="radio" id="pro" name="level" value="Pro" ${setting.pro}>
                    <label for="pro">Pro</label> 
                </div>
                <div>
                    <p>Age 1 - <span class="age-range-span">${setting.age}</span></p>
                    <input class="range" type="range" min="1" max="100" value=${setting.age}>
                </div>
                <div>
                    <p>Location 1 - <span class="location-range-span">${setting.location}</p>
                    <input class="range" type="range" min="0" max="200" value=${setting.location}>
                </div>
                <div class="switch-box">
                    <p>Layout</p>
                    <label class="switch">
                    <input class="switch-checkbox" type="checkbox" ${setting.layout}>
                    <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <i class="fa fa-times-circle fa-2x close-settings-modal" aria-hidden="true"></i>
        </div>
    `
}

