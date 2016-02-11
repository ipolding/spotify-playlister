import React from 'react';

export class Track extends React.Component {
    render () {
      return (
          <iframe src={"https://embed.spotify.com/?uri=spotify:track:" + this.props.track} 
              width="300" height="80" frameborder="0" allowtransparency="true">
          </iframe>
      );
    }
}