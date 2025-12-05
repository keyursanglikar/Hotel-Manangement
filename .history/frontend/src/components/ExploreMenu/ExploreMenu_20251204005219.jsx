// import React from 'react'
// import './ExploreMenu.css'
// import { menu_list } from '../../assets/assets'

// const ExploreMenu = ({category, setCategory}) => {

//   return (
//     <div className='explore-menu' id='explore-menu'>
//         <h1>Explore Our Menu</h1>
//         <p className='explore-menu=text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, exercitationem excepturi temporibus obcaecati voluptas vitae?</p>
//         <div className="explore-menu-list">
//             {menu_list.map((item,index)=>{
//                 return (
//                     <div onClick={()=>setCategory(prev=> prev === item.menu_name ? 'All' : item.menu_name)} key={index} className="explore-menu-list-item">
//                         <img className={category===item.menu_name?'active':''} src={item.menu_image} alt="" />
//                         <p>{item.menu_name}</p>
//                     </div>
//                 )
//             })}
//         </div>
//         <hr/>
//     </div>
//   )
// }

// export default ExploreMenu




// frontend/src/components/ExploreMenu/ExploreMenu.js
import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
  
  // Define all available categories including "All" and new categories
  const allCategories = [
    "All", 
    "Salad", 
    "Rolls", 
    "Deserts", 
    "Sandwich", 
    "Cake", 
    "Pure Veg", 
    "Non Veg",  // New category
    "Pasta", 
    "Noodles", 
    "Beverages" // New category
  ];

  // Map categories to images (you might need to update your assets)
  const categoryImages = {
    "All": menu_list[0]?.menu_image || menu_list[0]?.menu_image,
    "Salad": menu_list.find(item => item.menu_name === "Salad")?.menu_image || menu_list[0]?.menu_image,
    "Rolls": menu_list.find(item => item.menu_name === "Rolls")?.menu_image || menu_list[0]?.menu_image,
    "Deserts": menu_list.find(item => item.menu_name === "Deserts")?.menu_image || menu_list[0]?.menu_image,
    "Sandwich": menu_list.find(item => item.menu_name === "Sandwich")?.menu_image || menu_list[0]?.menu_image,
    "Cake": menu_list.find(item => item.menu_name === "Cake")?.menu_image || menu_list[0]?.menu_image,
    "Pure Veg": menu_list.find(item => item.menu_name === "Pure Veg")?.menu_image || menu_list[0]?.menu_image,
    "Non Veg": menu_list.find(item => item.menu_name === "Non Veg")?.menu_image || menu_list[0]?.menu_image,
    "Pasta": menu_list.find(item => item.menu_name === "Pasta")?.menu_image || menu_list[0]?.menu_image,
    "Noodles": menu_list.find(item => item.menu_name === "Noodles")?.menu_image || menu_list[0]?.menu_image,
    "Beverages": menu_list.find(item => item.menu_name === "Beverages")?.menu_image || menu_list[0]?.menu_image,
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Choose from a variety of delicious dishes across different categories</p>
      
      <div className="explore-menu-list">
        {allCategories.map((cat, index) => {
          return (
            <div 
              onClick={() => setCategory(cat)} 
              key={index} 
              className="explore-menu-list-item"
              title={cat}
            >
              <img 
                className={category === cat ? 'active' : ''} 
                src={categoryImages[cat]} 
                alt={cat} 
              />
              <p>{cat}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu