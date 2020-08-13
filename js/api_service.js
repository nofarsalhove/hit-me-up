export const tracksRestApiHandler = async _search => {
  let url = "https://hit-me-up-api.herokuapp.com/artist";
  let artistTracks = await doRestApi(url, _search);
  return artistTracks.data;
};

export const albumRestApiHandler = async _albumId => {
  let url = "https://hit-me-up-api.herokuapp.com/album";
  let albumDetails = await doRestApi(url, _albumId);
  return albumDetails;
};

const doRestApi = async (_url, _searchItem) => {
  let resp = await fetch(_url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ searchItem: _searchItem })
  });
  let data = await resp.json();
  return data;
};
