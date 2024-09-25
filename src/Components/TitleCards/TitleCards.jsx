import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCards = ({title,category}) => {
    const [apiData,setApiData]=useState([]);

    const cardRef=useRef();
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDgxMmU2OThmOWVhNDNkZjhiNTZjZjc5MDUwMWQzMiIsIm5iZiI6MTcyNzE3MzQxMi4xODEyODUsInN1YiI6IjY2ZjI5MjFlYTk3ODgwMTQ4ZjNiNjhlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZMDEGJFnlLgvP_X9cKCoEKQk9cW6ZyFmsGCnP9Z0ePg'
        }
      };
      
    
const handleWheel=(event)=>{
    event.preventDefault();
    cardRef.current.scrollLeft+=event.deltaY;
}

useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
  cardRef.current.addEventListener('wheel',handleWheel);
},[])

  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardRef}>
        {
            apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
            })
        }
      </div>
    </div>
  )
}

export default TitleCards
