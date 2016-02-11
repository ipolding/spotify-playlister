import {Dispatcher}  from 'flux';
import * as PlaylisterConstants from './constants.js'

/**
* Singleton Dispatcher
*/
var PlaylistDispatcher = new Dispatcher();

/** Dispatcher */
console.log("PlaylistDispatcher of dispatcher is  " + PlaylistDispatcher);
//dispatcher updates the Artist query store when it receives an artist query event
PlaylistDispatcher.register(function(payload) {
  if (payload.actionType === PlaylisterConstants.NEW_QUERY) {
    console.log("Dispatcher says I know you searched for " + JSON.stringify(payload));

  } else if (payload.actionType === PlaylisterConstants.PLAYLIST_FOUND) {
    console.log("Dispatcher handling 'PLAYLIST_FOUND event'")
    console.log("first track found is: " + JSON.stringify(payload.response.playlist[0]));
  }
});

export {PlaylistDispatcher};