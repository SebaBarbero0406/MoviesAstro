import { useEffect, useState } from "react"

export const Card = ({movie}) =>{

    const {poster_path, title, overview, vote_average, vote_count} = movie

    const [stars, setStars] = useState(0) 
    const [star_list, setStars_list] = useState("")

    useEffect(() => {

        setStars(Math.round(vote_average*5/10))

        setStars_list("⭐".repeat(stars))
    }, [stars])
    

    return (<div className="card">
        <div className="card_image">
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
        </div>
        <div className="card_description">
            <h4>{title}</h4>
            <p>{overview}</p>
            <span>{star_list}{stars}/5</span>
            <p>Votos: {vote_count}</p>
        </div>
    </div>
    )
}