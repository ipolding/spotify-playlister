import {ReduceStore} from 'flux/utils';
import * as PlaylisterConstants from './constants.js'

/* Store */
// keeps track of what query has been made

export class PlaylistResultStore extends ReduceStore {

   getInitialState() {
      return {query : [], result: {
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
            console.log("reduce triggered")
            return {query : action.query}
          }
          break;

          case PlaylisterConstants.PLAYLIST_FOUND: {
            console.log("reduce triggered by playlist found");
            console.log(JSON.stringify(action.response));
            return {
                  query  : this.getState().query,
                  result : action.response
                }
          }
        }
    }
}
