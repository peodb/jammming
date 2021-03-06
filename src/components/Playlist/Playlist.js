import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList.js';
import './Playlist.css';

class Playlist extends Component {

constructor(props) {
  super(props);
  this.handleNameChange = this.handleNameChange.bind(this);

}

// change of playlist name field
handleNameChange(event) {;
this.props.onNameChange(event.target.value);
}

  render() {
    return (
      <div className="Playlist" >
        <input defaultValue={this.props.playlistName} onChange={this.handleNameChange}/>
        <TrackList tracklist={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>

        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    )}
}

export default Playlist;
