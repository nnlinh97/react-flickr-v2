import React, { Component } from 'react';
import './../styles/photo.css';
import axios from 'axios';
import * as Config from '../constants/config';
import _ from 'lodash';
import { Link } from 'react-router-dom';


class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: {},
            tags: []
        }
    }

    componentDidMount() {
        let { match } = this.props;
        if (match) {
            let photo = axios.get(`${Config.URL_GET_PHOTO}${match.params.id}`);
            let size = axios.get(`${Config.URL_GET_SIZE_PHOTO}${match.params.id}`);
            Promise.all([photo, size]).then(([resPhoto, resSize]) => {
                let photo = resPhoto.data.photo;
                let url = resSize.data.sizes.size[resSize.data.sizes.size.length - 1].source;
                photo.url = url;
                this.setState({
                    photo: photo,
                    tags: photo.tags.tag
                });
            });
        }
    }

    render() {
        // console.log(this.state);
        let { photo, tags } = this.state;
        let title = _.result(photo, 'title._content');
        let owner = _.result(photo, 'owner.username');
        let views = _.result(photo, 'views');
        let listTags = tags.map((tag, index) => {
            let url = `/photos/tags/${tag.raw}`;
            return (
                <Link key={index} to={url}>
                    <span className="w3-tag w3-dark-grey w3-small w3-margin-bottom">{tag.raw}</span>
                </Link>
            )
        });

        let viewTags = '';
        if (listTags.length > 0) {
            viewTags = (
                <div className="w3-third ">
                    <h4><b>Tags:</b></h4>
                    <p>
                        {listTags}
                    </p>
                </div>
            )
        }
        let ownerView = '';
        if (owner) {
            ownerView = (<i>by {owner}</i>);
        }
        let viewsView = views ? (<p>{views} views</p>) : '';
        return (
            <div className="w3-container w3-padding-32 w3-center">
                <img src={photo.url} alt={title} className="w3-image" width="900" height="550" />
                <div className="w3-third w3-serif info">
                    <h4>
                        <b>
                            {title}
                        </b>
                    </h4>
                    <h6>
                        {ownerView}
                    </h6>
                    {viewsView}
                </div>
                {viewTags}
            </div>
        );
    }
}

export default Photo;