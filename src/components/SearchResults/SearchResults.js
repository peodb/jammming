import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList.js';
import './SearchResults.css';

class SearchResults extends Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracklist={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} />
      </div>
);
}
}

export default SearchResults;
