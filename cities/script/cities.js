// import functions and grab DOM elements
import {
    logout,
    checkAuth,
    getCity,
    createDefaultCity,
    updateCity
} from '../../script/fetch-utils.js';

const cityNameButton = document.getElementById(`city-name-button`);
const cityNameInput = document.getElementById(`city-name-input`);

const sloganInput = document.getElementById(`slogan-input`);
const sloganButton = document.getElementById(`slogan-button`);

const waterDropDown = document.getElementById(`water-dropdown`);
const skylineDropDown = document.getElementById(`skyline-dropdown`);
const castleDropDown = document.getElementById(`castle-dropdown`);

const waterImg = document.getElementById(`water-img`);
const skylineImg = document.getElementById(`skyline-img`);
const castleImg = document.getElementById(`castle-img`);

const cityName = document.getElementById(`city-name`);
const displaySlogans = document.getElementById(`display-slogans`);

const nameForm = document.getElementById(`name-form`);
const sloganForm = document.getElementById(`slogan-form`);

const iframeValue = document.getElementById(`iframe`);

sloganForm.addEventListener(`submit`, async(e) => {
    e.preventDefault();

    const slogan = [sloganInput.value];
    const city = await getCity();
    for (let s of city.slogan){
        slogan.push(s);
    }
    await updateCity(`slogan`, slogan, userId);
    sloganInput.value = ``;
    await refreshCity();
})


nameForm.addEventListener(`submit`, async(e) => {
    e.preventDefault();

    const name = cityNameInput.value;
    await updateCity(`name`, name, userId);
    cityNameInput.value = ``;
    await refreshCity();
    console.log(`click`);
});

let userId = 0;

waterDropDown.addEventListener(`change`, async() => {
    console.log(waterDropDown.value);
    await updateCity(`water`, waterDropDown.value, userId);
    playBackgroundVid(waterDropDown.value);
    await refreshCity();
});

skylineDropDown.addEventListener(`change`, async() => {
    console.log(skylineDropDown.value);
    await updateCity(`skyline`, skylineDropDown.value, userId);
    playBackgroundVid(skylineDropDown.value);
    await refreshCity();
});

castleDropDown.addEventListener(`change`, async() => {
    console.log(castleDropDown.value);
    await updateCity(`castle`, castleDropDown.value, userId);
    playBackgroundVid(castleDropDown.value);
    await refreshCity();
});

async function playBackgroundVid(value){
    switch (value){
        case `river`:
            iframeValue.src = `https://www.youtube.com/embed/zofBinqC2F4?&autoplay=1&mute=1`;
            break;
        case `lake`:
            iframeValue.src = `https://www.youtube.com/embed/qRTVg8HHzUo?&autoplay=1&mute=1`;
            break;
        case `ocean`:
            iframeValue.src = `https://www.youtube.com/embed/Xn8tufsbSz0?&autoplay=1&mute=1`;
            break;
        case `metro`:
            iframeValue.src = `https://www.youtube.com/embed/_btcrl9jg3I?&autoplay=1&mute=1`;
            break;
        case `town`:
            iframeValue.src = `https://www.youtube.com/embed/NMYevRLr9gw?&autoplay=1&mute=1`;
            break;
        case `village`:
            iframeValue.src = `https://www.youtube.com/embed/tCqeAUFRc_k?&autoplay=1&mute=1`;
            break;
        case `german`:
            iframeValue.src = `https://www.youtube.com/embed/u0rX72Bl46E?&autoplay=1&mute=1`;
            break;
        case `french`:
            iframeValue.src = `https://www.youtube.com/embed/wk9quCrd-bw?&autoplay=1&mute=1`;
            break;
        case `scottish`:
            iframeValue.src = `https://www.youtube.com/embed/SzDpLsRV-bo?&autoplay=1&mute=1`;
            break;

    }
}

sloganButton.addEventListener(`click`, async() => {
    const slogan = [sloganInput.value];
    const city = await getCity();
    for (let s of city.slogan){
        slogan.push(s);
    }
    await updateCity(`slogan`, slogan, userId);
    sloganInput.value = ``;
    await refreshCity();
});
  
cityNameButton.addEventListener(`click`, async() => {
    const name = cityNameInput.value;
    await updateCity(`name`, name, userId);
    cityNameInput.value = ``;
    await refreshCity();
    console.log(`click`);
});

checkAuth();

window.addEventListener(`load`, async() => {
    const city = await getCity();
    
    if (!city){
        const defaultCity = {
            water: `lake`,
            skyline: `metro`,
            castle: `german`,
            slogan: [],
            name: `Hadley's Hope`
        };
        await createDefaultCity(defaultCity);
        await refreshCity();
    } 
    const user = await getCity();
    await playBackgroundVid(user.water);
    userId = user.user_id;
    await refreshCity();
});

async function refreshCity(){

    await fetchAndRenderCity();
}

async function fetchAndRenderCity(){
    const city = await getCity();
    
    waterImg.style.backgroundImage = `url(../assets/${city.water}.jpg)`;
    switch (city.water) {
        case `river`:
            changeDropdown(`water`, 0);
            break;
        case `lake`:
            changeDropdown(`water`, 1);
            break;
        case `ocean`:
            changeDropdown(`water`, 2);
            break;
    }

    skylineImg.style.backgroundImage = `url(../assets/${city.skyline}.jpg)`;
    switch (city.skyline) {
        case `metro`:
            changeDropdown(`skyline`, 0);
            break;
        case `town`:
            changeDropdown(`skyline`, 1);
            break;
        case `village`:
            changeDropdown(`skyline`, 2);
            break;
    }

    castleImg.style.backgroundImage = `url(../assets/${city.castle}.jpg)`;
    switch (city.castle) {
        case `german`:
            changeDropdown(`castle`, 0);
            break;
        case `french`:
            changeDropdown(`castle`, 1);
            break;
        case `scottish`:
            changeDropdown(`castle`, 2);
            break;
    }

    cityName.textContent = city.name;

    // const sloganArr = await updateSlogan(city);
    console.log(city.slogan);
    displaySlogans.textContent = ``;
    for (let s of city.slogan){
        const slogan = document.createElement(`p`);
        const br = document.createElement(`br`);
        const concatSlogan = `• ${s}`;
        slogan.textContent = concatSlogan;
        displaySlogans.append(concatSlogan, br);
    }
}

function changeDropdown(name, index){
    document.getElementById(`${name}-dropdown`).selectedIndex = index;
}

const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    logout();
});