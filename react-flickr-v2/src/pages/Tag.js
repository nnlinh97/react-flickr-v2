import React, { Component } from 'react';
import justifiedLayout from 'justified-layout';
import * as Config from '../constants/config';
import '../styles/explore.css';
import Photo from './../components/Photo';
import axios from 'axios';

class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPhotos: [],
            geometry: null,
            nextPage: 1,
            firstLoading: true
        }
    }

    init() {
        this.setState({
            listPhotos: [],
            geometry: null,
            nextPage: 1,
            firstLoading: true
        });
    }

    loadListPhotosByTag(tag) {
        axios.get(`${Config.URL_GET_TAGS_PHOTO}${tag}${Config.PAGE}${this.state.nextPage}`).then((res) => {
            let photos = res.data.photos.photo;
            let totalPages = res.data.photos.pages;
            for (let i = 0; i < photos.length; i++) {
                if (!photos[i].url_m) {
                    photos.splice(i, 1);
                }
            }
            this.setState({
                listPhotos: [...this.state.listPhotos, ...photos],
                geometry: justifiedLayout(this.createBoxes([...this.state.listPhotos, ...photos]), Config.CSS),
                nextPage: this.state.nextPage + 1 > totalPages ? false : this.state.nextPage + 1,
                firstLoading: false,
                isLoading: false
            });
        });
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleOnScroll);
        let { match } = this.props;
        let tag = match ? match.params.tag : '';
        this.loadListPhotosByTag(tag);
    }

    componentWillReceiveProps(nextProps) {
        this.init();
        this.loadListPhotosByTag(nextProps.match.params.tag);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScroll);
    }

    onLoadMore() {
        if (!this.state.isLoading) {
            this.setState({
                isLoading: true
            });
            let { match } = this.props;
            let tag = match ? match.params.tag : '';
            this.loadListPhotosByTag(tag);
        }
    }

    handleOnScroll = () => {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 300;
        if (scrolledToBottom && this.state.nextPage && !this.state.isLoading) {
            this.onLoadMore();
        }
    }

    createBoxes = (data) => {
        return data.map((item) => {
            return { width: parseInt(item.width_m, 10), height: parseInt(item.height_m, 10) }
        });
    }

    render() {
        let photos = this.state.listPhotos.map((photo, index) => {
            return (
                <Photo
                    key={index}
                    style={this.state.geometry.boxes[index]}
                    title={photo.title}
                    ownername={photo.ownername}
                    views={photo.views}
                    src={photo.url_m}
                    id={photo.id}
                />
            );
        });
        return (
            <div className="container">
                <div className="main fluid-centered">
                    <h4><p className="notify-title"><b><i>All Photos of Tag "{this.props.match.params.tag}"</i></b></p></h4>
                    <div className="view photo-list-view" style={this.state.geometry ? { height: this.state.geometry.containerHeight } : {}}>
                        {photos}
                    </div>
                    <div className={this.state.isLoading ? "bottom-loading show" : "bottom-loading"}>
                        <h4><b><i>Loading...</i></b></h4>
                    </div>
                </div>
                <div className={this.state.firstLoading ? "loading show" : "loading"}>
                    <h4><b><i>Loading...</i></b></h4>
                </div>
            </div>

        );
    }
}

export default Tag;