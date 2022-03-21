import React, {useEffect, useState} from 'react'
import MovieCard from './MovieCard'
import Grid from '@mui/material/Grid'

export const API_KEY = "a96522ba";

const SearchList = (props) => {
  const [movies, setMovies] = useState([]);
  const fn = async () => {
    const response = await fetch(`https://www.omdbapi.com/?s=top&apikey=${API_KEY}`);
    const data = await response.json();
    setMovies(data.Search);

  };

  useEffect(() => { fn(); }, []);


  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl:6 }}>
          {movies.map((singleMovie, idx) => {
            return(
              <Grid item key={idx}>
                <MovieCard data={singleMovie}      />
              </Grid>
            );
          })}
        </Grid>
    </>
  )
}

export default SearchList