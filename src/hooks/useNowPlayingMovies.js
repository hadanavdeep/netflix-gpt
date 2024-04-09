import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";



const useNowPlayingMovies=()=>{
    //fetch data from TMDB api and update store
const dispatch=useDispatch();
const nowPlayingMovies=useSelector(store=>store.movies.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    const data=await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
    const json=await data.json();
    dispatch(addNowPlayingMovies(json.results));
  }

  useEffect(()=>{
    !nowPlayingMovies && getNowPlayingMovies();
  },[]);
};

export default useNowPlayingMovies;