import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/spotify.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
    playlistName: 'New playlist',
    playlistTracks: [],
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
}

addTrack(track) {
  if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
    return;
  }
  const array = this.state.playlistTracks
  array.push(track);
  this.setState({playlistTracks: array});
}

removeTrack(track) {
  const array = this.state.playlistTracks;
  const index = array.findIndex(x => x.id === track.id)
  array.splice(index,1);
  this.setState({playlistTracks: array});
}

updatePlaylistName(name) {
  this.setState({playlistName: name})
}

savePlaylist() {
  const trackURIs =[];
  this.state.playlistTracks.forEach(track => trackURIs.push(track.uri));
  Spotify.savePlaylist(this.state.playlistName, trackURIs);
  console.log(`clearing playlist state`);
  this.setState({playlistTracks: [],
                 playlistName: `New playlist`, //do not have any affect but do not understand why, tracks are cleared but now name....
                });


}

search(searchTerm) {
Spotify.search(searchTerm).then(tracks => {
    this.setState({searchResults: tracks});
  })
}

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} isRemoval={false} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onSave={this.savePlaylist} onRemove={this.removeTrack} isRemoval={true} onNameChange={this.updatePlaylistName} />

          </div>
        </div>
      </div>
    );
  }
}

export default App;
