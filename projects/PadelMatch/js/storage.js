/* Get from storage. Getting the key "array" from localstorage, and returns the parsed object */
export async function getFirstStorage(){
    return JSON.parse(localStorage.getItem("array"));
}

/* Save to storage. Getting the key "array" from localstorage, if "array" is empty make new array, push argument to array and save it stringified to local
storage with the key "array". It "array" is not empty, dont make a new array. */
export async function saveToFirstStorage(text){
    let get = JSON.parse(localStorage.getItem("array"));
    if(get != null){
        get.push(text);
        localStorage.setItem("array", JSON.stringify(get));
    } else{
        let array = [];
        array.push(text);
        localStorage.setItem("array", JSON.stringify(array))   
    }
}

/* Get from storage. Getting the key "array" from localstorage, and returns the parsed object */
export async function getSecondStorage(){
    return JSON.parse(localStorage.getItem("arrayTwo"));
}

/* Save to storage. Getting the key "array" from localstorage, if "array" is empty make new array, push argument to array and save it stringified to local
storage with the key "array". It "array" is not empty, dont make a new array. */
export async function saveToSecondStorage(text){
    localStorage.setItem("arrayTwo", JSON.stringify(text))   
}

/* Get from storage. Getting the key "array" from localstorage, and returns the parsed object */
export async function getThirdStorage(){
    return JSON.parse(localStorage.getItem("settings"));
}

/* Save to storage. Getting the key "array" from localstorage, if "array" is empty make new array, push argument to array and save it stringified to local
storage with the key "array". It "array" is not empty, dont make a new array. */
export async function saveToThirdStorage(object){
    localStorage.setItem("settings", JSON.stringify(object))   
}