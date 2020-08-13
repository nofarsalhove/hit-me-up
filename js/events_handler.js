import {
  renderAllTracks,
  search_tracks,
  getArtistTracks
} from "./tracks_manager.js";

let tracks = [];
let sortAsc = true;
export let error_msg = document.querySelector("#err_msg");
export let $saInput = document.querySelector("#search_artist_input");
export let $stInput = document.querySelector("#search_track_input");
let $downIcon = document.querySelector("#id_down");
let $upIcon = document.querySelector("#id_up");

//search artist
export const searchArtist = () => {
  let user_artist_search = $saInput.value;
  user_artist_search = user_artist_search.replace(/\s/g, "");
  getArtistTracks(user_artist_search);
};

//sort from top-down or down-top
export const sortTracks = () => {
  if (sortAsc) {
    search_tracks.sort(compareValues("title"));
    $downIcon.className = "d-none";
    $upIcon.className = "fa fa-caret-up pl-2";
  } else {
    search_tracks.sort(compareValues("title", "desc"));
    $downIcon.className = "d-none";
    $upIcon.className = "fa fa-caret-down pl-2";
  }
  sortAsc = !sortAsc;
  renderAllTracks(search_tracks);
};

//search track
export const searchTrack = () => {
  let user_track_search = $stInput.value;
  tracks = search_tracks;
  tracks = tracks.filter(
    track =>
      track.title.toUpperCase().indexOf(user_track_search.toUpperCase()) > -1
  );
  if (tracks.length == 0) {
    error_msg.innerHTML = "The track has not been found";
    error_msg.className = "alert alert-danger col-6 text-center";
  } else {
    error_msg.className = "d-none";
  }
  renderAllTracks(tracks);
};

//if the search track input is empty we show the original tracks of the artist that the user search
//means that we back to the original displaying of tracks
$stInput.addEventListener("input", () => {
  let track_search_value = $stInput.value;
  if (track_search_value == "") {
    error_msg.className = "d-none";
    renderAllTracks(search_tracks);
  }
});

const compareValues = (key, order = "asc") => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
    const comparison = String(a[key]).localeCompare(String(b[key]));

    return order === "desc" ? comparison * -1 : comparison;
  };
};
