// Action --> Dispatcher --> Store --> View

import {Container}   from 'flux/utils';
import React   from 'react';
import ReactDOM   from 'react-dom';
import * as PlaylisterConstants from './constants.js'
import {PlaylisterActions} from './actions.js'
import {PlaylistResultStore} from './stores.js'
import {PlayListSubmitter} from './views.jsx'

// var PlaylisterConstants = {NEW_QUERY : 'new-query'};

/** 
* Playlist container
*
* Container base classes must have 2 static methods: 
* getStores 
* calculateState
*/
//What is a class in JavaScript world? Simple sugar over the prototype-based OO pattern.
class PlaylistContainer extends React.Component {

  // what is static? called without instantiating
  static getStores() {
    return [PlaylistResultStore];
  }

  static calculateState() {
    console.log("Container is calculating state")
    console.log(this.state)
    var playlistStoreState = PlaylistResultStore.getState();
    console.log("playlistStoreState == " + JSON.stringify(playlistStoreState));
    return {
      query: playlistStoreState.query,
      result: playlistStoreState.result
    }
  }

  render() {
 
    var playlist = this.state.result.playlist;
    
    if (playlist.length === 0) {
       return <div></div>
     } else {
      var tracks   = playlist.map(function(letter) {return <Track key={letter} track={letter}/>});
      console.log(JSON.stringify(this.state.query))

    return (
      <div>
        <h4>You asked for: {this.state.query.join(", ")}</h4>
        <h4>We found: {this.state.result.artists.join(", ")}</h4>
        {tracks}
      </div>
    );
  }
  }
} 

/**
*  Views
*/
var QueryContainer = Container.create(PlaylistContainer);


ReactDOM.render(
   <PlayListSubmitter />, 
   document.getElementById('artistList')
 );

ReactDOM.render(
   <QueryContainer />,
   document.getElementById('responseStore')
   );