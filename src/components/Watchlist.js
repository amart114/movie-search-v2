import React, {useContext} from "react"
import {Link} from "react-router-dom"
import {Context} from "../Context"

export default function Watchlist() {
    const {watchlist, renderWatchlist} = useContext(Context)
      
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
                    <Link to="/">Go To Search</Link>
                </div>
                <div className="bottom-container">
                    {renderWatchlist(watchlist)}
                </div>
            </div>
        </>
    )
}