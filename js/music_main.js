import { searchArtist, searchTrack, sortTracks } from "./events_handler.js";

let $saBtn = document.querySelector("#search_artist_btn");
let $sortBtn = document.querySelector("#sort_btn");

window.onload = () => {
  $saBtn.addEventListener("click", searchArtist);
  $sortBtn.addEventListener("click", sortTracks);
  document
    .getElementById("search_track_input")
    .addEventListener("input", searchTrack);
};
