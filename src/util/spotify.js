
var token;
const applicationID = '52d83a8faecb48efbc97225229941c6f';
const redirectURI = 'http://localhost:3000/';
const Spotify = {

search(term) {
  this.getAccessToken();
   return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
      if (response.ok) {
      return response.json();
    } else {
      throw new Error('Request failed!');
    }
    }
  ).then(jsonResponse => {
      return jsonResponse.tracks.items.map(responseElement => {
          return {
            id: responseElement.id,
            artist: responseElement.artists[0].name,
            name: responseElement.name,
            album: responseElement.album.name,
            uri: responseElement.uri,
          };

      })

  });
    },
  getAccessToken() {

    if (token) {

      return token;
    }
    const url = window.location.href;
    const accessToken = url.match(/access_token=([^&]*)/);
    const expireTime = url.match(/expires_in=([^&]*)/);

    if ( !accessToken  ) {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${applicationID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
      const accessToken = url.match(/access_token=([^&]*)/);
      const expireTime = url.match(/expires_in=([^&]*)/);
    }
      token = accessToken[1];
      const expires_in = expireTime[1];
      window.setTimeout(() => token = '', expires_in * 1000);
         window.history.pushState('Access Token', null, '/');
         return token;
  },

savePlaylist(name, tracks) {

  if (name && tracks) {

    this.getAccessToken();
    const header = {
      headers: {
         Authorization: `Bearer ${token}`
       }
     }

    fetch(`https://api.spotify.com/v1/me`,header).then(user => {
      return user.json()
    }).then(jasonUser => {

      let userID = jasonUser.id;
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: 'POST',
      headers: {
         Authorization: `Bearer ${token}`
       },
      body: JSON.stringify({ name: name })
    })}).then(playlist => {
      return playlist.json();
    }).then( jsonPlaylist => {
      let playlistID = jsonPlaylist.id;
      fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      method: 'POST',
      headers: {
         Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
       },
      body: JSON.stringify({ uris: tracks })
      })
    })
  }
}

}

export default Spotify;
