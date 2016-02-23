import {x,PlaylistDispatcher}   from './dispatcher.js';
import {ReduceStore}            from 'flux/utils';
import * as PlaylisterConstants from './constants.js';

/* Store */
class PlaylistResultStore extends ReduceStore {

   getInitialState() {
      return {query : [], 
              result: {
              artists  : [],
              playlist : []}} ;
    }

    static getState() {
      console.log("get state: " + JSON.stringify(this._state));
      return this._state; //initialised in the parent constructor
    }

    reduce(state, action) {
        switch (action.actionType) {
          case PlaylisterConstants.NEW_QUERY: {
            console.log("PlaylistResultStore.reduce() triggered by new query")
            return {query : action.query}
          }
          break;

          case PlaylisterConstants.PLAYLIST_FOUND: {
            console.log("PlaylistResultStore.reduce() triggered by playlist found");
            return {
                  query  : this.getState().query,
                  result : action.response
                }
          }
        }
    }
}

var playlistResultStore = new PlaylistResultStore(PlaylistDispatcher);
export {playlistResultStore}