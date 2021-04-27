import React, {useEffect} from 'react'
import ImageCard from '../components/Image-card'
import InfiniteScroll from 'react-infinite-scroll-component';
import {BarLoader, ClipLoader} from "react-spinners";
import { css } from "@emotion/core";
import { useSelector, useDispatch } from 'react-redux'
import {insertImagesAsync, setPageImages, setTempPageImages} from '../store/actions/images.js'
import {insertImagesSearchAsync, setTempKey} from '../store/actions/searchImages.js'

export default function Home() {
  const dispatch = useDispatch();
  const page = useSelector(state => state.images.page)
  const tempPage = useSelector(state => state.images.tempPage)
  useEffect(() => {
    if(page !== tempPage){
      dispatch(insertImagesAsync("https://api.pexels.com/v1/curated?per_page=18", page))
      dispatch(setTempPageImages(page))
    }
    // eslint-disable-next-line
  }, [page])
  const images = useSelector(state => state.images.data)
  const errorImages = useSelector(state => state.images.error)
  
  const search = useSelector(state => state.imagesSearch.key)
  const tempKey = useSelector(state => state.imagesSearch.tempKey)
  useEffect(() => {
    if( search.length !== 0 && search !== tempKey ){
      dispatch(insertImagesSearchAsync(`https://api.pexels.com/v1/search?query=${search ? search : '' }&per_page=30`))
      dispatch(setTempKey(search))
    }
    // eslint-disable-next-line
  }, [search])
  const loadingSearch = useSelector(state => state.imagesSearch.loading)
  const imagesSearch = useSelector(state => state.imagesSearch.data)
  const errorSearch = useSelector(state => state.imagesSearch.error)
  const loaderCSS = css`
  display: block !important;
  margin: 2px auto;
  `
  const override = css`
  display: block;
  margin: 200px auto;
  `;
  const isFavourite = useSelector(state => state.images.isFavourite)
  
  useEffect (() => {
  }, [isFavourite])
  
 if (errorImages) {
    return (
      <div>You have an error {errorImages.message}</div>
    )
  } else if ( images && search.length === 0 ){
    return (
    <>
      <div className="container mt-5">
        <h1 className="text-center">Aesthetic's Photograph</h1>
        <br/>
          <InfiniteScroll 
            dataLength={images.length}
            next={() => {
              dispatch(setPageImages(1))
            }}
            hasMore={true}
            loader={<BarLoader css={loaderCSS}/>}
            className="row mb-5 mx-auto d-flex" 
            style={{width:"100%"}}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            >
            {
              images.map((image, idx )=> {
                return <ImageCard image={image} key={idx}></ImageCard>
              })
            }
          </InfiniteScroll>
      </div>
    </>
    )
  } else {
    if(loadingSearch){
      return (
        <ClipLoader css={override} size={150}/>
      )
    } else if (errorSearch) {
      return (
        <div>You have an error {errorSearch.message}</div>
      )
    } else {
      return (
        <div className="container mt-5">
          <h1 className="text-center">{search.toUpperCase()} Collection</h1>
          <br/>
          <div className="row mb-5 mx-auto d-flex" style={{width:"100%"}}>
          {
            imagesSearch.map(image => {
            return <ImageCard image={image} key={image.id} ></ImageCard>
            })
          }
          </div>
        </div>
      )
    }
  }
}
