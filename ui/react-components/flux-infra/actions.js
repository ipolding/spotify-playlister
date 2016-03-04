import {PlaylistDispatcher}     from './dispatcher.js'
import * as PlaylisterConstants from './constants.js'

/** Actions */
//dispatches an artist query event to the dispatcher

export function createNewQuery(artistArray) {
    console.log("Create new query action triggered")
    PlaylistDispatcher.dispatch({
      actionType: PlaylisterConstants.NEW_QUERY,
      query:      artistArray
    });
  }

export function requestPlaylist(query) {

    var xmlhttp = new XMLHttpRequest(), method = 'GET', url = SPOTIFY_API_URL + '/playlist?artistQuery=' + query;

    xmlhttp.open(method, url, true);
    xmlhttp.onreadystatechange = function () {
    
    if (xmlhttp.readyState !== XMLHttpRequest.DONE) {
        return;
    }
    if (xmlhttp.status !== 200) {
        return;
    }

    var responseObject = JSON.parse(xmlhttp.responseText);

      PlaylistDispatcher.dispatch({
      actionType: PlaylisterConstants.PLAYLIST_FOUND,
      response:   responseObject
    });
};
    xmlhttp.send();
  }