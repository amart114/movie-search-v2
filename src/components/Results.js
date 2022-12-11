import React, {useContext} from "react"
import {Context} from "../Context"
import filmIcon from "../images/film-icon.png"



export default function Results() {
    const {searchSubmit, renderSearchResults, movieData} = useContext(Context)

    if (searchSubmit === true) {
        return (
            <>
                {renderSearchResults(movieData)}
            </>
        )
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