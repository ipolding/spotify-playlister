import React   from 'react';
import {TextEntryBox} from './textEntryBox.jsx'
import * as PlaylisterActions from '../flux-infra/actions.js'

export class PlayListSubmitter extends React.Component {

  constructor(props) {
    super(props);
    this.getPlaylist = this.getPlaylist.bind(this);
    this.createEntry = this.createEntry.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
    this.state = {children : 0, data: []};
  }

  updateEntry(index, value) {
      var modifiedArray = this.state.data;
      console.log("modifiedArray " + JSON.stringify(modifiedArray));
      modifiedArray[index].value = value;
      this.setState({
      children: this.state.children++,
      data: modifiedArray
    });
  }

  createEntry(text) {
    var textEntries = this.state.data;
    var newTextEntrys = textEntries.concat([{index: this.state.children++, value: text}]);
    this.setState({
      children: this.state.children++,
      data: newTextEntrys
    });
  }

  getPlaylist() {
    var query = this.state.data.map(getTextEntryValues);
    PlaylisterActions.createNewQuery(this.state.data.map(data => data.value));
    PlaylisterActions.requestPlaylist(query);
  }

  render() {
    return (
      <div className="submitter" onSubmit={this.handleSubmit}>
        <TextEntryBox updateEntry={this.updateEntry} createEntry={this.createEntry} data={this.state.data}/>
        <button onClick={this.getPlaylist} className="btn btn-primary btn-lg">Go! &raquo;</button>
      </div>
    );
  }

}

function getTextEntryValues(textEntry) {
     return textEntry.value;
  }