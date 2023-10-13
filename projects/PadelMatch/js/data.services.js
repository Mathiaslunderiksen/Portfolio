const service = {};

/* Method that fetches profiles.json and returns the array with objects */
service.getProfiles = async () => {
    try {
        const response = await fetch("./data/profiles.json");
        const profiles = await response.json();
        return profiles;
    
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }

}

export default service;