import React, {useState, useEffect} from "react"

import starIcon from "./images/star-icon.png"
import addIcon from "./images/add-icon.png"
import minusIcon from "./images/minus-icon.png"

const Context = React.createContext()

function ContextProvider({children}) {
    const [userSearch, setUserSearch] = useState("")
    const [searchSubmit, setSearchSubmit] = useState(false)
    const [movieData, setMovieData] = useState([])
    const [watchlist, setWatchlist] = useState([])

// initial API call 

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=bc1d2f76e11a46c1cc9ef0ee7ce8670a&query=${userSearch}`)
        .then(res => {
            if(!res.ok) {
                throw Error("Something went wrong")
            }
            return res.json()
        })
        .then(data => setMovieData(data.results))
        .catch(err => console.error(err))
    }, [userSearch])

    function handleChange(e) {
        setSearchSubmit(false)
        setUserSearch(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setSearchSubmit(true)
    }

// eventually would like for the addToWatchlist and removeFromWatchlist functions to add and remove films via local storage.

    function addToWatchlist(film) {
        // localStorage.setItem("films", JSON.stringify(film))
        setWatchlist(prevList => [...prevList, film])
    }

    function removeFromWatchlist(id) {
        // localStorage.removeItem(`films`)
        setWatchlist(prevList => prevList.filter(film => film.id !== id))
    }
    

    function renderSearchResults(data) {
        return data.map(film => {

            function toggleWatchIcon(id) {
                const alreadyInWatchlist = watchlist.some(film => film.id === id)
                if (alreadyInWatchlist) {
                    return (
                        <button onClick={() => removeFromWatchlist(film.id)}><img src={minusIcon} alt="" />Remove From Watchlist</button>
                    )
                } else {
                    return (
                        <button onClick={() => addToWatchlist(film)}><img src={addIcon} alt=""/>Add To Watchlist</button>
                    )
                }
            }

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
                            {toggleWatchIcon(film.id)}
                        </div>
                        
                        <p>{film.overview}</p>
                    </div>

                </div>
                
            )
        })
    }

// function used to render watchlist after search is submitted. This should eventually be replaced by the function above (renderSearchResults) to render any movie on the site.

    function renderWatchlist(data) {
        return data.map(film => {
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
                                <button onClick={()=>removeFromWatchlist(film.id)}><img src={minusIcon} alt=""/>Remove From Watchlist</button>
                            </div>
                            
                            <p>{film.overview}</p>
                        </div>
    
                    </div>
                    
                ) 
        })
    }

    

    return (
        <Context.Provider value={{
            userSearch,
            searchSubmit,
            movieData,
            watchlist,
            handleChange,
            handleSubmit,
            renderSearchResults,
            renderWatchlist
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}

