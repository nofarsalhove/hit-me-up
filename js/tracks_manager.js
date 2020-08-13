import Track from "./track_class.js";
import { tracksRestApiHandler } from "./api_service.js";
import { error_msg } from "./events_handler.js";

export let tracks = [];
export let search_tracks = [];
let parent = document.querySelector("#id_parent");
let tracks_op_menu = document.querySelector("#tracks_op_menu");

export const getArtistTracks = async (_search = "") => {
  if (_search !== "") {
    tracks = await tracksRestApiHandler(_search);
    // filter only the tracks that the artist's name contain the user's search input
    tracks = tracks.filter(track =>
      track.artist.name.toUpperCase().includes(_search.toUpperCase())
    );
    search_tracks = tracks;
    if (tracks.length == 0) {
      error_msg.innerHTML = "Artist's name not found";
      error_msg.className = "alert alert-danger col-6 text-center";
    } else {
      error_msg.className = "d-none";
      tracks_op_menu.className = "container-fluid";
    }
    renderAllTracks(tracks);
  }
};

export const renderAllTracks = tracks_ar => {
  parent.innerHTML = "";
  tracks_ar.map(item => {
    let artist = item.artist.name;
    let albumId = item.album.id;
    let albumName = item.album.title;
    let img = item.album.cover_big;
    let { title, duration, preview, link } = item;
    let newTrack = new Track(
      parent,
      title,
      artist,
      duration,
      preview,
      albumId,
      albumName,
      img,
      link
    );
    newTrack.render();
  });
};
