import { PageList } from "./PageList";
import moment from "moment";

const getHomeDefault = () => {
  let d = new Date();
  let day = d.getDate();
  if (day < 10) {
    day = "0" + String(day);
  }
  let month = d.getMonth() + 1;
  if (month < 10) {
    month = "0" + String(month);
  }
  let now = `${d.getFullYear()}-${month}-${day}`;
  let trueDay = day;
  if (trueDay > 28) {
    trueDay = 28;
  }
  let nextYear = `${d.getFullYear() + 1}-${month}-${trueDay}`;
  return `?dates=${now},${nextYear}&ordering=-added`;
};

const searchGame = () => {
  
  let search = document.getElementById("findgame").value;
  console.log("Search for =", search);
  if (search == "") {
    search = getHomeDefault();
  } else {
    search = "&search=" + search;
  }
  return PageList(search);
};

const showInfo = (e) => {
  e.target.classList.add("not-visible");
  e.target.nextElementSibling.classList.remove("not-visible");
};

const hideInfo = (e) => {
  e.target.classList.add("not-visible");
  e.target.previousElementSibling.classList.remove("not-visible");
};

const convertDate = (date) => {
  return moment(date).format("MMMM Do YYYY");
};

const addCreators = () => {
  let creators = document.querySelectorAll(".creators");
  creators.forEach((creator) => {
    let slug = creator.innerHTML;
    fetch(`https://api.rawg.io/api/games/${slug}?key=e83d28cc51db413a8d65854f62efb441`)
      .then((response) => response.json())
      .then((response) => {
        let toInsert = "";
        if (response.developers) {
          response.developers.forEach((developer) => {
            toInsert += `<a class="studio" data-id="${developer.id}">${developer.name}</a><br>`;
          });
        }
        creator.innerHTML = toInsert;
      });
  });
  setTimeout(() => {
    document.querySelectorAll(".studio").forEach((link) => {
      link.addEventListener("click", seeStudio);
    });
  }, 1000);
};

const platformsIcons = {
  pc:
    "<img data-id='1' src='src/assets/images/windows.svg' alt='' class='mx-2' style='height :2em;'>",
  playstation:
    "<img data-id='2' src='src/assets/images/ps4.svg' alt='' class='mx-2' style='height :2em;'>",
  xbox:
    "<img data-id='3' src='src/assets/images/xbox.svg' alt='' class='mx-2' style='height :2em;'>",
  ios:
    "<img data-id='4' src='src/assets/images/mobile.svg' alt='' class='mx-2' style='height :2em;'>",
  android:
    "<img data-id='8' src='src/assets/images/androi.svg' alt='' class='mx-2' style='height :2em;'>",
  mac:
    "<img data-id='5' src='src/assets/images/apple.svg' alt='' class='mx-2' style='height :2em;'>",
  linux:
    "<img data-id='6' src='src/assets/images/linux.svg' alt='' class='mx-2' style='height :2em;'>",
  nintendo:
    "<img data-id='7' src='src/assets/images/switch.svg' alt='' class='mx-2' style='height :2em;'>",
  atari:
    "<img data-id='9' src='src/assets/images/ghost-solid.svg' alt='' class='mx-2' style='height :2em;'>",
  "commodore-amiga":
    "<img data-id='10' src='src/assets/images/ghost-solid.svg' alt='' class='mx-2' style='height :2em;'>",
  sega:
    "<img data-id='11' src='src/assets/images/ghost-solid.svg' alt='' class='mx-2' style='height :2em;'>",
  "3do":
    "<img data-id='12' src='src/assets/images/ghost-solid.svg' alt='' class='mx-2' style='height :2em;'>",
  "neo-geo":
    "<img data-id='13' src='src/assets/images/ghost-solid.svg' alt='' class='mx-2' style='height :2em;'>",
  web:
    "<img data-id='14' src='src/assets/images/ie.svg' alt='' class='mx-2' style='height :2em;'><img data-id='14' src='src/assets/images/firefox.svg' alt='' class='mx-2' style='height :2em;'><img data-id='14' src='src/assets/images/chrome.svg' alt='' class='mx-2' style='height :2em;'>",
};

const storeIcons = {
  steam:
    "<img data-id='1' src='src/assets/images/steam.svg' alt='' class='mx-2' style='height :2em;'>",
  "playstation-store":
    "<img data-id='2' src='src/assets/images/ps4.svg' alt='' class='mx-2' style='height :2em;'>",
  "xbox-store":
    "<img data-id='3' src='src/assets/images/xbox.svg' alt='' class='mx-2' style='height :2em;'>",
  "apple-appstore":
    "<img data-id='4' src='src/assets/images/applestore.svg' alt='' class='mx-2' style='height :2em;'>",
  gog:
    "<img data-id='5' src='src/assets/images/gog.svg' alt='' class='mx-2' style='height :2em;'>",
  nintendo:
    "<img data-id='6' src='src/assets/images/switch.svg' alt='' class='mx-2' style='height :2em;'>",
  xbox360:
    "<img data-id='7' src='src/assets/images/xbox.svg' alt='' class='mx-2' style='height :2em;'>",
  "google-play":
    "<img data-id='8' src='src/assets/images/googleplay.svg' alt='' class='mx-2' style='height :2em;'>",
  itch:
    "<img data-id='9' src='src/assets/images/itch.svg' alt='' class='mx-2' style='height :2em;'>",
  "epic-games":
    "<img data-id='10' src='src/assets/images/epic.svg' alt='' class='mx-2' style='height :2em;'>",
};

const seePlatform = (e) => {
  let platformId = e.target.dataset.id;
  let platform = `?parent_platforms=${platformId}`;
  return PageList(platform);
};

const seeStudio = (e) => {
  console.log(e);
  console.log(e.target.dataset.id);
  let studioId = e.target.dataset.id;
  let studio = `?developers=${studioId}`;
  return PageList(studio);
};

export {
  getHomeDefault,
  searchGame,
  showInfo,
  hideInfo,
  convertDate,
  addCreators,
  platformsIcons,
  storeIcons,
  seePlatform,
  seeStudio,
};
