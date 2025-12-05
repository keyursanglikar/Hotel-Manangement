// import React, { useContext } from "react";
// import { assets } from "../../assets/assets";
// import "./FoodItem.css";
// import { StoreContext } from '../context/StoreContext';

// const FoodItem = ({ id, name, price, description, image }) => {
//   const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

//   return (
//     <div className="food-item">
//       <div className="food-item-img-container">
//         {/* <img src={image} className="food-item-image" alt="" /> */}
//         <img 
//     src={`http://localhost:4000/uploads/${image}`} 
//     className="food-item-image" 
//     alt={name} 
// />

//         {!cartItems[id] ? (    //changes made 
//           <img
//             className="add"
//             src={assets.add_icon_white}
//             onClick={() => addToCart(id)}
//             alt=""
//           />
//         ) : (
//           <div className="food-item-counter">
//             <img
//               onClick={() => removeFromCart(id)}
//               src={assets.remove_icon_red}
//               alt=""
//             />
//             <p>{cartItems[id]}</p>
//             <img
//               onClick={() => addToCart(id)}
//               src={assets.add_icon_green}
//               alt=""
//             />
//           </div>
//         )}
//       </div>
//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//           <p>{name}</p>
//           <div className="star">
//             <img src={assets.rating_starts}  alt="" /> 
//           </div>
//         </div>
//         <p className="food-item-desc">{description}</p>
//         <p className="food-item-price">₹{price}</p>
//       </div>
//     </div>
//   );
// };

// export default FoodItem;



// frontend/src/components/FoodItem/FoodItem.js
import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ id, name, price, description, image, category }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  
  // Helper function to get correct image URL
  const getImageUrl = (imgName) => {
    if (!imgName) return '';
    
    // If it's already a full URL or from assets, return as-is
    if (imgName.startsWith('http') || imgName.startsWith('data:')) {
      return imgName;
    }
    
    // Check if it's a static asset (has image property in assets)
    if (assets[imgName]) {
      return assets[imgName];
    }
    
    // For backend images
    return `http://localhost:4000/uploads/${imgName}`;
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img 
          src={getImageUrl(image)} 
          className="food-item-image" 
          alt={name} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = assets.placeholder_image || '/placeholder.jpg';
          }}
        />
        
        {!cartItems[id] || cartItems[id] === 0 ? (
          <img
            className="add"
            src={assets.add_icon_white}
            onClick={() => addToCart(id)}
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <div className="star">
            <img src={assets.rating_starts} alt="Rating" /> 
          </div>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
        {category && (
          <div className="food-item-category">
            <span className="category-tag">{category}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItem;