import React, {useContext} from "react"
import {Link} from "react-router-dom"
import {Context} from "../Context"

export default function Watchlist() {
    const {watchlist, renderWatchlist} = useContext(Context)

// eventually will finish below hook to pull watchlist from localStorage
      
    // useEffect(() => {
    //     const savedList = JSON.parse(localStorage.getItem("films"))
    //     if (savedList) {
    //         setWatchlist(savedList)
    //     }
    // }, [watchlist]) 

    return (
        <>
            <div className="main-container">
                <div className="top-container">
                    <h1 className="title">Watchlist</h1>
                    <Link to="/"><button>Go To Search</button></Link>
                </div>
                <div className="bottom-container">
                    {renderWatchlist(watchlist)}
                </div>
            </div>
        </>
    )
}