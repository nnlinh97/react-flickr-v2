const API_KEY = "8847b916915e4a7f6d79977e23ab6c1f";
const baseUrl = "https://api.flickr.com/services/rest/";

export const PAGE = '&page=';
export const URL_GET_TAGS_PHOTO = `${baseUrl}?method=flickr.photos.search&api_key=${API_KEY}&sort=relevance&extras=media%2C+url_m%2Cowner_name%2Cviews&per_page=20&format=json&nojsoncallback=1&tags=`;
export const URL_GET_LIST_PHOTOS = `${baseUrl}?method=flickr.interestingness.getList&api_key=${API_KEY}&extras=url_m%2Cowner_name%2Cviews&per_page=20&format=json&nojsoncallback=1&page=`;
export const URL_GET_PHOTO = `${baseUrl}?method=flickr.photos.getInfo&api_key=${API_KEY}&format=json&nojsoncallback=1&photo_id=`
export const URL_GET_SIZE_PHOTO = `${baseUrl}?method=flickr.photos.getSizes&api_key=${API_KEY}&format=json&nojsoncallback=1&photo_id=`;
export const URL = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&extras=url_s%2Cowner_name%2Cviews&per_page=20&format=json&nojsoncallback=1&page=`;
export const CSS = {
    containerWidth: 1087,
    containerPadding: 0,
    boxSpacing: {
        horizontal: 5,
        vertical: 5
    }
}

