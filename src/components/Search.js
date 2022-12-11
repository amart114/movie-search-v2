import React, {useContext} from "react"
import {Link} from "react-router-dom"
import searchIcon from "../images/Icon.png"
import {Context} from "../Context"

import Results from "./Results"

export default function Search() {
    const{userSearch, 
        handleChange,
        handleSubmit} = useContext(Context)
    return (
        <>
            <div className="main-container">
                <div className="top-container">
                    <h1 className="title">Find your film</h1>
                    <Link to="/watchlist"><button>Go To Saved Watchlist</button></Link>
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
                    {<Results />}
                </div>
                
                
            </div>
        </>
    )
}