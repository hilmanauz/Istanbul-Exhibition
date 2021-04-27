const initialState = {
    images: [],
    imagesSearch: [],
    search: '',
    imageDetail: {},
    imagePhotographer: '',
    page: Math.ceil(Math.random()*10),
    isFavourite: 0
}

function reducer(state = initialState, action) {
    const {type, payload} = action;
    if(type === 'images/insertImages') {
        return { ...state, images: state.images.concat(payload) }
    } else if ( type === 'imageDetail/insertImageDetail') {
        return { ...state, imageDetail: payload}
    } else if ( type === 'imagePhotographer/setImagePhotographer') {
        return { ...state, imagePhotographer: payload }
    } else if ( type === 'page/setPage') {
        return { ...state, page: state.page + payload }
    } else if ( type === 'isFavourite/setIsFavourite') {
        return { ...state, isFavourite: state.isFavourite + 1 }
    } else if ( type === 'imagesSearch/insertimagesSearch') {
        return { ...state, imagesSearch: payload }
    } else if ( type === 'search/setSearch') {
        return { ...state, search: payload }
    }

    return state;
}

export default reducer;