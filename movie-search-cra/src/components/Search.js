import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import searchIcon from "../images/Icon.png"

import Results from "./Results"

export default function Search() {
    const [userSearch, setUserSearch] = useState("")
    const [searchSubmit, setSearchSubmit] = useState(false)
    const [movieData, setMovieData] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=bc1d2f76e11a46c1cc9ef0ee7ce8670a&query=${userSearch}`)
        .then(res => res.json())
        .then(data => setMovieData(data.results))
    }, [userSearch])

    function handleChange(e) {
        setSearchSubmit(false)
        setUserSearch(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setSearchSubmit(true)
    }

    function addToWatchlist(id) {
        const updatedMovieArray = movieData.map(film => {
            if (film.id === id) {
                if(film.addedToWatchlist) {
                    return {...film, addedToWatchlist: !film.addedToWatchlist}
                }else {
                    return {...film, addedToWatchlist: true}
                }
            }
            return film
        })
        setMovieData(updatedMovieArray)
    }

    return (
        <>
            <div className="main-container">
                <div className="top-container">
                    <h1 className="title">Find your film</h1>
                    <Link to="/watchlist">Go To Saved Watchlist</Link>
                </div>
                
                <div className="search-bar"> 
                    <img src={searchIcon} alt="search icon"/>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            placeholder="Enter Film Title"
                            onChange={handleChange}
                            name="search"
                            value={userSearch}
                        />
                        <button className="search-btn">Search</button>
                    </form>
                </div>
                <div className="bottom-container">
                    {<Results
                        searchSubmit={searchSubmit}
                        movieData={movieData}
                        addToWatchlist={addToWatchlist}
                    />}
                </div>
                
                
            </div>
        </>
    )
}