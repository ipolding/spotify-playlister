import {Dispatcher}  from 'flux';
import * as PlaylisterConstants from './constants.js'

/**
* Singleton Dispatcher
*/
var PlaylistDispatcher = new Dispatcher();
export {PlaylistDispatcher};