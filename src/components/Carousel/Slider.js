import { useContext, useEffect, useState } from "react"
import { MoviesContext } from "../../context/MoviesContext"
import Description from "./Description"
import SearchBar from "./SearchBar"
import './Slider.css'

const Slider = () => {
    const {popularMovies,setTrigger,setMovieInfo} = useContext(MoviesContext)
    const [slideIndex, setSlideIndex] = useState(1)
    useEffect(()=>{
        const id = setTimeout(()=>{
            if(slideIndex ===5){
                    setSlideIndex(1)
                }
                else{
                    setSlideIndex(slideIndex+1)
                }
        },5000);
        return ()=>clearTimeout(id)
    },[slideIndex])
    

    const moveDot = index => {
        setSlideIndex(index)
    }

    return ( 

        <div className="container-slider">
            <div className="overlay">

            </div>
            <SearchBar/>
            { popularMovies.length >0 && <Description movies={popularMovies.slice(0,5)} index={slideIndex-1} setTrigger={setTrigger} setMovieInfo={setMovieInfo} />}
            {popularMovies.slice(0,5).map((movie, index) => {
                return (
                    <div
                    key={movie.id}
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <img 
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt={movie.title}
                        />
                    </div>
                )
            })}
            <div className="container-dots">
                {Array.from({length: 5}).map((item,index) => (
                    <span key={index}
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    >
                        {index+1}
                    </span>
                ))}
            </div>
        </div>
    );
}
 
export default Slider;