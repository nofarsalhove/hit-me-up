import { albumRestApiHandler } from "./api_service.js";
class Track {
  constructor(
    _parent,
    _title,
    _artist,
    _duration,
    _audio,
    _albumId,
    _albumName,
    _img,
    _trackLink
  ) {
    this.parent = _parent;
    this.title = _title;
    this.artist = _artist;
    this.duration = this.getDuration(_duration);
    this.audio = _audio;
    this.albumId = _albumId;
    this.albumName = _albumName;
    this.img = _img;
    this.trackLink = _trackLink;
  }

  render() {
    let newDiv = document.createElement("div");
    newDiv.className = "card my-3";
    newDiv.innerHTML = `<img src="${this.img}" class="card-img-top">`;
    this.parent.appendChild(newDiv);

    let innerDiv = document.createElement("div");
    innerDiv.className =
      "card-body d-flex flex-column justify-content-between py-2";
    innerDiv.innerHTML = `
        <div class="text-center border-bottom">
          <h3>${this.title}</h3>
          <p class="m-0">${this.artist}</p>
        </div>
        <div class="text-center my-3">
            <span>${this.albumName}</span> |
            <span>${this.duration}</span>
        </div>
        <audio id="audio" controls="controls" class="mb-2 mt-3 mx-auto">
            <source
                src="${this.audio}"
                type="audio/mpeg">
            </source>
        </audio>
        `;
    newDiv.appendChild(innerDiv);

    let ALB = document.createElement("button");
    ALB.className = "btn full-album text-light mx-auto";
    ALB.innerHTML = "See Full Album";
    innerDiv.appendChild(ALB);
    this.declareOpenAlbumLink(ALB);
  }

  declareOpenAlbumLink(_btn) {
    _btn.addEventListener("click", async () => {
      let windowReference = window.open();
      let album = await albumRestApiHandler(this.albumId);
      windowReference.location = album.link;
    });
  }

  getDuration(_secs) {
    let mins = Math.floor(_secs / 60);
    let sec = _secs % 60;
    if (mins < 10) {
      mins = "0" + mins;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
    return mins + ":" + sec;
  }
}
export default Track;
