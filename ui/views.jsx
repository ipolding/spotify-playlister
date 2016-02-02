import React from 'react';
import * as PlaylisterActions from './actions.js'  ;

// /**
// *  Views
// */
export class TextEntry extends React.Component {

  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.keyHasBeenPressed = this.keyHasBeenPressed.bind(this);
    this.state = { index: props.index, text:  props.initialValue};
  }

  handleChange(e){
    this.setState({index : this.props.dataPosition, text : e.target.value});
  }

  handleBlur(e) {
      if (typeof this.props.index !== 'undefined') {
        this.props.updateEntry(this.props.index, this.state.text);  
      } else if (e.target.value) {           
        this.createEntry();
        this.flushState();          
      }
  }

  createEntry() {
    var textEntry = this.refs.textEntry.value;
    this.props.createEntry(textEntry);               
  }

  flushState() {
    this.setState({index : this.props.dataPosition, text : ''});
  }

  keyHasBeenPressed(e) {
      if (e.key == "Enter") {
        this.flushState();      
        this.createEntry();
      }      
  }

  render() {
     var message = this.state.message;
     return (
      <div>
        <input placeholder="Artist..." 
               value={this.state.text} 
               className="previousTextEntry" 
               onBlur={this.handleBlur} 
               onChange={this.handleChange} 
               onKeyDown={this.keyHasBeenPressed}
               ref="textEntry"/>          
      </div>
    );
  }
}

class PreviousTextEntries extends React.Component { 
  
  render() {
      var updateEntry = this.props.updateEntry;
      var createEntry = this.props.createEntry;
      var parentData = this.props.data;
      

      var textEntryNodes = parentData.map(function(textEntry) { //REFACTOR ME INTO PRIVATE METHOD
          return (<TextEntry 
                      key={textEntry.index}
                      index={textEntry.index}
                      initialValue={textEntry.value}
                      createEntry={createEntry} 
                  />);});
        return (<div className="PreviousTextEntries">{textEntryNodes}</div>);
      }
}

class TextEntryBox extends React.Component{

  handleSubmit (e) {
    e.defaultPrevented();
    return false;
  }

    render() {
     return (
       <div className="textEntryBox" onSubmit={this.handleSubmit}>
         <h1>Artists</h1>
         <PreviousTextEntries updateEntry={this.props.updateEntry} createEntry={this.props.createEntry} data={this.props.data} />
         <TextEntry updateEntry={this.props.updateEntry} createEntry={this.props.createEntry} data={this.props.data} />
         </div>
     );
   }

}

class Track extends React.Component {
    render () {
      return (
          <iframe src={"https://embed.spotify.com/?uri=spotify:track:" + this.props.track} 
              width="300" height="80" frameborder="0" allowtransparency="true">
          </iframe>
      );
    }
}

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
    console.log("Dispatching: " + query)
    PlaylisterActions.createNewQuery(this.state.data.map(data => data.value));
    PlaylisterActions.requestPlaylist(query);
  }

  render() {
    return (
      <div className="playlister" onSubmit={this.handleSubmit}>
        <TextEntryBox updateEntry={this.updateEntry} createEntry={this.createEntry} data={this.state.data}/>
        <button onClick={this.getPlaylist} className="btn btn-primary btn-lg">Get Top Tracks! &raquo;</button>
      </div>
    );
  }

}

  function getTextEntryValues(textEntry) {
     return textEntry.value;
  }