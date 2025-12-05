// import React, { useContext } from 'react'
// import { StoreContext } from '../context/StoreContext'
// import FoodItem from '../FoodItem/FoodItem'
// import './FoodDisplay.css'

// const FoodDisplay = ({category}) => {

//     const {food_list} = useContext(StoreContext)

//   return (
//     <div className='food-display' id='food-display'>
//        <h3>Top Dishes near you</h3>
//        <div className="food-display-list">
//         {food_list.map((item,index)=>{
//           {console.log(category,item.category);}
//           if(category==="All" || category===item.category){
//             return <FoodItem key={index} id={item._id } name={item.name} description={item.description} price={item.price} image={item.image}/>
//           }
//         })}
//        </div>
//     </div>
//   )
// }

// export default FoodDisplay




// import React, { useContext, useEffect } from 'react'
// import { StoreContext } from '../context/StoreContext'
// import FoodItem from '../FoodItem/FoodItem'
// import './FoodDisplay.css'

// const FoodDisplay = ({ category }) => {
//     const { food_list } = useContext(StoreContext)

//     // Debug: Log the food list to see if it's being fetched
//     console.log("Food List from context:", food_list);

//     return (
//         <div className='food-display' id='food-display'>
//             <h3>Top Dishes near you</h3>
//             <div className="food-display-list">
//                 {food_list && food_list.length > 0 ? (
//                     food_list.map((item, index) => {
//                         if (category === "All" || category === item.category) {
//                             return (
//                                 <FoodItem
//                                     key={item._id || index}
//                                     id={item._id}
//                                     name={item.name}
//                                     description={item.description}
//                                     price={item.price}
//                                     image={item.image}
//                                 />
//                             )
//                         }
//                         return null;
//                     })
//                 ) : (
//                     <p>Loading foods...</p>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default FoodDisplay

// // frontend/src/components/FoodDisplay/FoodDisplay.js
// import React, { useContext, useEffect, useState } from 'react'
// import { StoreContext } from '../context/StoreContext'
// import FoodItem from '../FoodItem/FoodItem'
// import './FoodDisplay.css'

// const FoodDisplay = ({ category }) => {
//     const { food_list } = useContext(StoreContext)
//     const [filteredFoods, setFilteredFoods] = useState([])

//     useEffect(() => {
//         if (food_list && food_list.length > 0) {
//             console.log("All foods:", food_list);
            
//             // Filter foods based on category
//             const filtered = food_list.filter((item) => {
//                 const itemCategory = item.category || 'All';
//                 return category === "All" || category === itemCategory;
//             });
            
//             console.log("Filtered foods for category", category, ":", filtered);
//             setFilteredFoods(filtered);
//         }
//     }, [category, food_list])

//     return (
//         <div className='food-display' id='food-display'>
//             <h3>
//                 {category === "All" 
//                     ? "Top Dishes near you" 
//                     : `${category} Dishes`
//                 }
//             </h3>
            
//             {filteredFoods.length === 0 ? (
//                 <div className="no-food-message">
//                     <p>No {category === "All" ? "" : category + " "}dishes available right now.</p>
//                     <p className="sub-message">Check back soon or try another category!</p>
//                 </div>
//             ) : (
//                 <div className="food-display-list">
//                     {filteredFoods.map((item, index) => {
//                         // Generate a unique key
//                         const uniqueKey = item._id 
//                             ? item._id 
//                             : `${item.name}-${index}-${Date.now()}`;
                        
//                         return (
//                             <FoodItem
//                                 key={uniqueKey}
//                                 id={item._id || `static-${index}`}
//                                 name={item.name}
//                                 description={item.description}
//                                 price={item.price}
//                                 image={item.image}
//                                 category={item.category}
//                             />
//                         )
//                     })}
//                 </div>
//             )}
            
//             {/* Debug info (remove in production) */}
//             <div className="debug-info" style={{display: 'none'}}>
//                 <p>Total foods: {food_list?.length || 0}</p>
//                 <p>Filtered foods: {filteredFoods.length}</p>
//                 <p>Current category: {category}</p>
//             </div>
//         </div>
//     )
// }

// export default FoodDisplay







// frontend/src/components/FoodDisplay/FoodDisplay.js
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import './FoodDisplay.css'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext)
  const [filteredFoods, setFilteredFoods] = useState([])
  const [allCategories, setAllCategories] = useState([])

  // Extract all unique categories from food list
useEffect(() => {
  if (food_list && food_list.length > 0) {
    console.log("First 3 food items:", food_list.slice(0, 3));
    console.log("First item image:", food_list[0]?.image);
    console.log("Type of image:", typeof food_list[0]?.image);
    console.log("Is in assets?", assets[food_list[0]?.image]);
  }
}, [food_list]);
      
      // Filter foods based on selected category
      const filtered = food_list.filter((item) => {
        if (category === "All") {
          return true;
        }
        // Handle case-insensitive matching
        return item.category && 
               item.category.toLowerCase() === category.toLowerCase();
      });
      
      console.log(`Filtered ${filtered.length} items for category: ${category}`);
      setFilteredFoods(filtered);
    }
  }, [category, food_list])

  // Get category display name
  const getCategoryDisplayName = () => {
    if (category === "All") return "All Dishes";
    return `${category} Dishes`;
  }

  return (
    <div className='food-display' id='food-display'>
      <div className="food-display-header">
        <h3>{getCategoryDisplayName()}</h3>
        <div className="category-counter">
          <span>{filteredFoods.length} items</span>
        </div>
      </div>
      
      {filteredFoods.length === 0 ? (
        <div className="no-food-message">
          <p>No {category === "All" ? "" : category + " "}dishes available right now.</p>
          <p className="sub-message">Check back soon or try another category!</p>
        </div>
      ) : (
        <div className="food-display-list">
          {filteredFoods.map((item, index) => {
            // Generate a unique key
            const uniqueKey = item._id 
              ? item._id 
              : `${item.name}-${index}-${Date.now()}`;
            
            return (
              <FoodItem
                key={uniqueKey}
                id={item._id || `static-${index}`}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                category={item.category}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default FoodDisplay