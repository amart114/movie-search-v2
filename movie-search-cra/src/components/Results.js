import React from "react"
import filmIcon from "../images/film-icon.png"
import starIcon from "../images/star-icon.png"
import addIcon from "../images/add-icon.png"
import greenCheck from "../images/green-icon.png"


export default function Results({searchSubmit, movieData, addToWatchlist}) {

    if (searchSubmit === true) {
        return movieData.map(film => {
            return (
                <div className="movie-item">

                    <img src={`https://image.tmdb.org/t/p/w300${film.poster_path}`} alt = "movie poster"/>

                    <div className="movie-details">
                        <div className="title-rating">
                            <h3>{film.original_title}</h3>
                            <p><img src={starIcon} alt="star"/>{film.vote_average}</p>
                        </div>

                        <div className="release-addWatchlist">
                            <p>Release Date: {film.release_date}</p>
                            <button onClick={()=>addToWatchlist(film.id)}><img src={film.addedToWatchlist ? greenCheck : addIcon} alt=""/>Watchlist</button>
                        </div>
                        
                        <p>{film.overview}</p>
                    </div>

                </div>
                
            )
        })
    } else {
        return (
            <>
                <div className="bottom-container">
                    <img src={filmIcon} className="empty-search" alt="" />
                    <p className="subtext empty-search">Start exploring</p>
                </div>
            </>
        )
    }
    
}