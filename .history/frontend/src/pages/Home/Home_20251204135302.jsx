import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import RestaurantGallery from '../../components/AppDownload/RestaurantGallery'


const Home = () => {

  const [category, setCategory] = useState('All')
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
   <RestaurantGallery/>
    </div>
  )
}

export default Home