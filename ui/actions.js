import * as playlistDispatcher from './dispatcher.js'
import * as PlaylisterConstants from './constants.js'

/** Actions */
//dispatches an artist query event to the dispatcher

  export function createNewQuery(artistArray) {
    console.log("create new query action triggered")
    playlistDispatcher.playlistDispatcher.dispatch({
      actionType: PlaylisterConstants.NEW_QUERY,
      query:      artistArray
    });
  }

  export function requestPlaylist(query) {

    var xmlhttp = new XMLHttpRequest(), method = 'GET', url = 'http://localhost:9000/playlist?artistQuery=' + query;

    xmlhttp.open(method, url, true);
    xmlhttp.onreadystatechange = function () {
    
    if (xmlhttp.readyState !== XMLHttpRequest.DONE) {
        return;
    }
    if (xmlhttp.status !== 200) {
        return;
    }

    var responseObject = JSON.parse(xmlhttp.responseText);

      playlistDispatcher.dispatch({
      actionType: PlaylisterConstants.PLAYLIST_FOUND,
      response:   responseObject
    });
};
    xmlhttp.send();
  }