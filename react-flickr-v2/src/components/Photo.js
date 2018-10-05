import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Photo extends Component {
    render() {
        let photo = this.props;
        let url = `/photos/${photo.id}`;
        return (
            <Link to={url}>
                <div className="photo-view" style={photo.style}>
                    <div className="interaction-view">
                        <div className="photo-list-photo-interaction">
                            <p className="overlay"> </p>
                            <div className="interaction-bar">
                                <div className="text">
                                    <p className="title">{photo.title}</p>
                                    <p className="attribution">by {photo.ownername} - {photo.views} views</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src={photo.src} alt={photo.title} />
                </div>
            </Link>
        );
    }
}

export default Photo;