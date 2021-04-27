import {combineReducers} from 'redux';
import imageDetailReducer from './imageDetailReducer';
import imagesReducer from './imagesReducer'
import imagesSearchReducer from './imagesSearchReducer';

const reducer = combineReducers ({
  imageDetail: imageDetailReducer,
  images: imagesReducer,
  imagesSearch: imagesSearchReducer
})

export default reducer