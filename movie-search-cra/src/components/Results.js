import React from "react"
import filmIcon from "../images/film-icon.png"
import starIcon from "../images/star-icon.png"
import addIcon from "../images/add-icon.png"

export default function Results({searchSubmit, movieData}) {
    if (searchSubmit) {
        return movieData.map(film => {
            console.log(film)
            return (
                <div className="movie-item">

                    <img src={`https://image.tmdb.org/t/p/w300${film.poster_path}`} alt = "movie poster"/>

                    <div className="movie-details">
                        <div className="title-rating">
                            <h3>{film.original_title}</h3>
                            <p><img src={starIcon} alt="star"/>{film.vote_average}</p>
                        </div>

                        <div class="release-addWatchlist">
                            <p>Release Date: {film.release_date}</p>
                            <button id="watchlist-btn"><img src={addIcon} alt=""/>Watchlist</button>
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