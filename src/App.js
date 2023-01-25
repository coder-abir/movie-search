import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
export const API_KEY = "5f362fbc";
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  color: white;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  position: fixed;
  width: 100%;
  z-index: 999;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchIcon = styled.img`
  width: 40px;
  height: 42px;
`;
const SearchBox = styled.div`
  padding: 10px 10px;
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 50%;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  margin-right: 30px;
`;
const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 25px;
  color: black;
  font-weight: 500;
  font-family: "poppins", sans-serif;
  width: 90%;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: center;
  padding: 30px;
  margin-top: 100px;
`;

const Placeholder = styled.img`
  width:120px;
  height:120px;
  margin:150px;
  opacity:50%;
`
function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const fetchDate = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    console.log(response);
    updateMovieList(response.data.Search);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchDate(event.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="./movieIcon.png" />
          Movie Search
        </AppName>
        <SearchBox>
          <SearchIcon src="./search-icon.svg" />
          <SearchInput
            placeholder="Search Movie"
            onChange={onTextChange}
            value={searchQuery}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length
          ? movieList.map((movie, index) => (
              <MovieComponent
                key={index}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            ))
          : <Placeholder src="./movieIcon.png"/>}
      </MovieListContainer>
    </Container>
  ); 
}

export default App;
