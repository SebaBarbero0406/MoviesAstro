import {useState, useEffect} from 'react'
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Search } from './ui/Search';

//getter = obtenedor  Setter = modificador (esto con useState)
export const Main = () => {
    
    const [page, setPage] = useState(1)
    const [genders, setGenders] = useState([])
    const [selectedGender, setSelectedGender] = useState("")
    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])
    const [loading, setLoading] = useState(false)

    const config = {
        headers:{
            authorization:`Bearer ${import.meta.env.PUBLIC_API_TOKEN}`,
            "content-type" : "aplication/json"
        }
    }

    const getGenders=async () =>{
        try{
            const url = `https://api.themoviedb.org/3/genre/movie/list?language=es`
            const req = await fetch(url, config)
            const res = await req.json()
            if(req.status===200){
                setGenders(res.genres)
            }
        }catch(err){
            console.error(err)
        }
    }
    const addPage = () =>{
        setPage(page + 1)
    }

    const getMovies=async () =>{
        try{

            setLoading(true)
            const url = `https://api.themoviedb.org/3/movie/popular?language=es-ES&page=${page}`
            const req = await fetch(url, config)

            
            if(req.status===200){
                const res = await req.json()
                setMovies(movies.concat(res.results))
            }


        }catch (err){
            console.error(err)
        }finally{
            setLoading(false)
        }
    }


    const filterMovies = () => {

        if(selectedGender===""){
            setFilteredMovies(movies)
        }else{
            const fm = movies.filter(movie=>{
                if(movie.genre_ids.includes(Number(selectedGender))){
                    return movie
                }
            })

            setFilteredMovies(fm)
        }
    }

    useEffect(()=>{
        getGenders()
    }, [])

    useEffect(() => {
        getMovies()
    }, [page])


    useEffect(() => {
        filterMovies()
    }, [movies, selectedGender])
    
    return <div className='contenedor'>
        <Search 
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            genders={genders}
        />
        <section className='main_cards'>


            {
                filteredMovies.map((movie) =>{
                    return <Card key={movie.id} movie={movie}/>
                })
            }
        </section>
        {
            loading ? <p>cargando...</p> :
            <Button onClick={addPage}>Ver Más</Button>
        }
        
    </div>
}



