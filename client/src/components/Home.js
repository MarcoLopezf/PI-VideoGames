import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {getVideoGames, getGenres,filterByGenre,filterByCreated,orderAscDesc,orderRating} from'../actions/index';
import VgCard from './VgCard';
import Paginado from './Paginado';
import '../css/Home.css'
import SearchBar from './SearchBar';

function Home() {
  const dispatch=useDispatch()
  const allVideoGames= useSelector((state)=>state.videogames);
  const genres=useSelector((state)=>state.genres)
  const [loading,setLoading]=useState(false)
  const [,setOrder]=useState('')
  const [curretnPage,setCurrentPage]=useState(1)
  const [vgPerPage,]=useState(15)
  const indexOfLastVg=curretnPage*vgPerPage
  const indexOf1vg=indexOfLastVg-vgPerPage
  const curretnVg=allVideoGames.slice(indexOf1vg,indexOfLastVg)
  

  const paginado=(pageNumber)=>{
    setCurrentPage(pageNumber);
  }
  useEffect(()=>{
   dispatch(getVideoGames());
   setLoading(true)
  },[dispatch])
  console.log(allVideoGames[0])
  // const {name, id}=allVideoGames[0]
  // console.log(name, id)

  useEffect(()=>{
    dispatch(getGenres());
  },[dispatch])

  function handleFilterByCreated(e){
    e.preventDefault()
    dispatch(filterByCreated(e.target.value))
    setCurrentPage(1)

  }

  function handleFilterByGenre(e){
    e.preventDefault()
    dispatch(filterByGenre(e.target.value))
    setCurrentPage(1)
  }

  function handleOrderAscDesc(e){
    e.preventDefault()
    dispatch(orderAscDesc(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)

  }
  function handleOrderRating(e){
    e.preventDefault()
    dispatch(orderRating(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)

  }

  return (<div  className='fondo-home'>
    <div>
    <h2 className='flexbox'>Videogames individual proyect</h2>
    <Link to='/create'>Crear Videojuego</Link>
    <div>
      <SearchBar/>
    </div>
    <div>
      <select onChange={e=>handleOrderAscDesc(e)}>
        <option value='none'>None</option>
        <option value='asc'>A-Z</option>
        <option value='desc'>Z-A</option>
      </select>
    </div>
    <div>
        <h3>Rating:</h3>
      <select onChange={e=>handleOrderRating(e)}>
      <option hidden={true} value='all'>all</option>
        <option value='may'>Best</option>
        <option value='men'>Worst</option>
      </select>
     </div> 
     <div>
        <h3>Filter By:</h3>
        <h4>Created/Existing:</h4>
      <select onChange={e=>handleFilterByCreated(e)}>
        <option value='all'>All</option>
        <option value='Created'>Created</option>
        <option value='Existing'>Existing</option>
      </select>
     </div>
     <div>
       <h4>Genre:</h4>
          <select onChange={e=>handleFilterByGenre(e)}>
            <option value="todos">
              All
            </option>
            {genres.map((e) => {
              return (
                <option key={e.id}  value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div> 
     <div>
       {<Paginado 
       vgPerPage={vgPerPage}
       allVideogames={allVideoGames.length}
       paginado={paginado}
       />}
       <div className='container'>
    {loading?(
      curretnVg.length>0?(
      curretnVg.map((el)=>{
        return( <VgCard
          id={el.id}
          key={el.id}
          name={el.name}
          background_image={el.background_image}
          genres={el.genres}
          rating={el.rating}
          description={el.description}
          />)
        })) :(
          <img src='https://blog.lootcrate.com/wp-content/uploads/2018/02/pacman_ghosts_header.gif' alt='https://wall.alphacoders.com/big.php?i=5185&lang=Spanish'/>
        )):
        <img src='https://blog.lootcrate.com/wp-content/uploads/2018/02/pacman_ghosts_header.gif' alt='https://wall.alphacoders.com/big.php?i=5185&lang=Spanish'/>

      }
      </div>
      </div>
    </div>  
    {<Paginado 
       vgPerPage={vgPerPage}
       allVideogames={allVideoGames.length}
       paginado={paginado}
       curretnPage={curretnPage}
       />}
  </div>
  )
}

export default Home