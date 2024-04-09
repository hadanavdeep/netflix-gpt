import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS, GEMINI_API_KEY } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GptSearchBar = () => {
  const dispatch=useDispatch();
    const langKey=useSelector((store)=>store.config.lang);
    const searchText=useRef(null);

    //search movie in tmdb
    const searchMovieTMDB= async (movie) => {
      const data=await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1"
        ,API_OPTIONS
      );
      const json=await data.json();
      return json.results;
    }



// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// async function run() {
//   // For text-only input, use the gemini-pro model
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});
//   const prompt = "Act as a movie recommendation system and suggest some movies for the query"+searchText.current.value+".only give me names of movies,comma separated like example result given ahead.Example result:Gadar,Sholay,Godzilla,Pathaan,3 Idiots.";
//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();




const handleGptSearchClick=async()=>{

  //Make an api call to gpt api to get movies results

  // const qptQuery="Act as a movie recommendation system and suggest some movies for the query"+searchText.current.value+".only give me names of movies,comma separated like example result given ahead.Example result:Gadar,Sholay,Godzilla,Pathaan,3 Idiots.";
  //   const gptResults = await openai.chat.completions.create({
  //     messages: [{ role: 'user', content: qptQuery }],
  //     model: 'gpt-3.5-turbo',
  //   });
  //   if(!gptResults.choices){
  //     //error handling
  //   }
  //   console.log(gptResults.choices?.[0]?.message?.content);

  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const prompt = "Act as a movie recommendation system and suggest some movies for the query"+searchText.current.value+".only give me names of movies,comma separated like example result given ahead.Example result:Gadar,Sholay,Godzilla,Pathaan,3 Idiots.";
  const result = await model.generateContent(prompt);
  const gptResults = await result.response;
  const gptMovies=gptResults.candidates?.[0]?.content?.parts?.[0]?.text.split(",");


    const promiseArray= gptMovies.map((movie)=>searchMovieTMDB(movie));
    //[Promise,Promise,Promise,Promise,Promise]

    const tmdbResults= await Promise.all(promiseArray);
    dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}));
};

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e)=> e.preventDefault()}>
        <input
        ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" onClick={handleGptSearchClick}>
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
