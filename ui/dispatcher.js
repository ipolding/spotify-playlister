import {Dispatcher}  from 'flux';
import * as PlaylisterConstants from './constants.js'

/**
* Singleton Dispatcher
*/
const PlaylistDispatcher = new Dispatcher();

/** Dispatcher */

//dispatcher updates the Artist query store when it receives an artist query event
PlaylistDispatcher.register(function(payload) {
  if (payload.actionType === PlaylisterConstants.NEW_QUERY) {
    console.log("Dispatcher says I know you searched for " + JSON.stringify(payload));
  } else if (payload.actionType === PlaylisterConstants.PLAYLIST_FOUND) {
    console.log("Dispatcher says 'PLAYLIST_FOUND event' payload.response is: " + JSON.stringify(payload.response));
  }
});

export {PlaylistDispatcher}