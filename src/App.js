import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "a96522ba";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  //managing state for search inputs 
  const [searchQuery, updateSearchQuery] = useState("");

  //mantaining state for movie list 
  const [movieList, updateMovieList] = useState([]);
  //maintaining state for selected movie 
  const [selectedMovie, onMovieSelect] = useState();

  //this is for maintaining the timeout to implement debouncing
  const [timeoutId, updateTimeoutId] = useState();

  const [load, onLoad] = useState([]);

  //were adding the search URL 
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    //since its an asynchronous call, were using async and await 
    console.log('response', response)
    //Movie list state updated, when the user is done typing in the input field 
    updateMovieList(response.data.Search);
  };

      // const loadData = () => {
      //   Axios.get(
      //     `https://www.omdbapi.com/?s=top&apikey=${API_KEY}`,
      //   ).then((response) => 
      //   {
      //    console.log(response)
      //     onLoad(response.data)
      //   }
      //   )
      // }
    
  const onTextChange = (e) => {
    onMovieSelect("")
    //to cancel previos API calls
    clearTimeout(timeoutId);
    //updating search query with what user entered in the input field 
    updateSearchQuery(e.target.value);

    //Debouncing 
    //setting the new time for API call
    //after user completes typing, within half a sec and firing the fetchData function
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    //updating the timeout state 
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/react-movie-app/movie-icon.svg" />
          React Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="/react-movie-app/search-icon.svg" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {/* if there is something inside the selectedMovie state only then render the MovieInfoComponent and pass these props to it */}
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {/* instead of hardcoding Moviecomponent a bazillion times were making it dyanamic */}
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="/react-movie-app/movie-icon.svg" />
    
        )}
        
      </MovieListContainer>
    </Container>
  );
}

export default App;
