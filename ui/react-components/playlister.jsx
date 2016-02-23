// Action --> Dispatcher --> Store --> View

import React   from 'react';
import ReactDOM   from 'react-dom';
import {Container}   from 'flux/utils';
import * as PlaylisterConstants from './flux-infra/constants.js'
import {PlaylisterActions}      from './flux-infra/actions.js'
import {playlistResultStore}    from './flux-infra/stores.js'
import {Track}                  from './views/spotify.jsx'
import {PlayListSubmitter}      from './views/submitter.jsx'

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
    console.log("container get Stores is called")
    console.log("inside getStores, playlistResultStore == " + playlistResultStore)
    return [playlistResultStore];
  }

  static calculateState() {
    var playlistStoreState = playlistResultStore.getState();
    console.log("recalculated playlistStoreState == " + JSON.stringify(playlistStoreState));
    return {
      query: playlistStoreState.query,
      result: playlistStoreState.result
    }
  }

  render() {
    console.log("PlaylistContainer.render()")
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

var QueryContainer = Container.create(PlaylistContainer);

ReactDOM.render(
   <PlayListSubmitter />, 
   document.getElementById('artistList')
 );

ReactDOM.render(
   <QueryContainer />,
   document.getElementById('playlist')
   );