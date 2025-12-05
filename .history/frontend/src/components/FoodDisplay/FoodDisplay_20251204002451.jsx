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



// frontend/src/components/FoodDisplay/FoodDisplay.js
import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import './FoodDisplay.css'

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext)

    return (
        <div className='food-display' id='food-display'>
            <h3>Top Dishes near you</h3>
            <div className="food-display-list">
                {food_list && food_list.length > 0 ? (
                    food_list.map((item, index) => {
                        if (category === "All" || category === item.category) {
                            return (
                                <FoodItem
                                    key={item._id || index}
                                    id={item._id}
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    image={item.image}
                                />
                            )
                        }
                        return null;
                    })
                ) : (
                    <div className="no-food-message">
                        <p>No dishes available. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FoodDisplay