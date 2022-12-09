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

    function addToWatchlist(film) {
        setWatchlist(prevList => [...prevList, film])
    }

    function removeFromWatchlist(id) {
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


 // function toggleWatchlist(id) {
    //     if(watchlist.length > 0) {
    //         const updatedWatchlist = watchlist.map((savedFilm, index) => {
    //             if(savedFilm.id === id) {

    //             } 
    //         })
    //     } 
    // }


    // function toggleWatchlist(id) {
    //     const updatedMovieArray = movieData.map(film => {
    //         if (film.id === id) {
    //             if(film.addedToWatchlist) {
    //                 return {...film, addedToWatchlist: !film.addedToWatchlist}
    //             }else {
    //                 return {...film, addedToWatchlist: true}
    //             }
    //         }
    //         return film
    //     })
    //     setMovieData(updatedMovieArray)
    // }

    // function updateWatchlistArr(data) {
    //     const watchlistArr = data.map(film => {
    //         if (film.addedToWatchlist === true && !watchlistArr.includes(film.id)) {
    //             return film
    //         }
    //     })
    //     setWatchlist(watchlistArr)
    // }

    // <button onClick={()=>toggleWatchlist(film.id)}><img src={film.addedToWatchlist ? greenCheck : addIcon} alt=""/>Watchlist</button>