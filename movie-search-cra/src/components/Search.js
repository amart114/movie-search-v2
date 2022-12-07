import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import searchIcon from "../images/Icon.png"
import filmIcon from "../images/film-icon.png"

export default function Search() {
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=bc1d2f76e11a46c1cc9ef0ee7ce8670a&query=${search}`)
        .then(res => res.json())
        .then(data => console.log(data))
    }, [])

    function handleChange(e) {
        setSearch(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        
    }
    return (
        <>
            <div className="main-container">
                <div className="top-container">
                    <h1 className="title">Find your film</h1>
                    <Link to="/watchlist"><a className="watch-list">Go To Saved Watchlist</a></Link>
                </div>
                
                <div className="search-bar"> 
                    <img src={searchIcon} />
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            placeholder="Enter Film Title"
                            onChange={handleChange}
                            name="search"
                            value={search}
                        />
                        <button className="search-btn">Search</button>
                    </form>
                </div>
                
                <div className="bottom-container">
                    <img src={filmIcon} class="empty-search" />
                    <p className="subtext empty-search">Start exploring</p>
                </div>
                
            </div>
        </>
    )
}