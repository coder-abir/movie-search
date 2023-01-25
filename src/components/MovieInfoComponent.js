import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { API_KEY } from "../App";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  margin-top: 100px;
`;
const CoverImage = styled.img`
  height: 350px;
  object-fit: cover;
  width:auto;
`;
const InfoCOlumn = styled.div`
  display: flex;
  flex-direction: column; 
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  background:white;
  padding:5px;
  border-radius:3px;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  background:white;
  padding:5px;
  border-radius:3px;
  & span {
    opacity: 0.5;
  }
`;

const Close = styled.span`
  font-size: 16px;
  font-weight: black;
  color: white;
  background: lightgray;
  cursor: pointer;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15px;
  border-radius: 5px;
  padding: 5px;
  align-self: start;
`;
const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);
  return (
    <Container className="meaw" style={{backgroundImage: `url(${movieInfo?.Poster})`,
    backgroundRepeat:'no-repeat',
    backgroundSize:'cover',
    backgroundPosition:'center',
    }}>
    {movieInfo?<>

        <CoverImage src={movieInfo?.Poster} />
      <InfoCOlumn>
        <MovieName>
          {movieInfo?.Type}: {movieInfo?.Title}
        </MovieName>
        <MovieInfo>
          IMDB rating: <span>{movieInfo?.imdbRating}</span>
        </MovieInfo>
        <MovieInfo>
          year: <span>{movieInfo?.Year}</span>
        </MovieInfo>
        <MovieInfo>
          Language: <span>{movieInfo?.Language}</span>
        </MovieInfo>
        <MovieInfo>
          Rated : <span>{movieInfo?.Rated}</span>
        </MovieInfo>
        <MovieInfo>
          Genre: <span>{movieInfo?.Genre}</span>
        </MovieInfo>
        <MovieInfo>
          Director: <span>{movieInfo?.Director}</span>
        </MovieInfo>
        <MovieInfo>
          Actors: <span>{movieInfo?.Actors}</span>
        </MovieInfo>
        <MovieInfo>
          Plot: <span>{movieInfo?.Plot}</span>
        </MovieInfo>
      </InfoCOlumn>
      <Close onClick={() => props.onMovieSelect()}>x</Close>
    </>:"Loading..."}

      
    </Container>
  );
};
export default MovieInfoComponent;
