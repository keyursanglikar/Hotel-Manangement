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
  
  // Helper function to get image URL
  const getImageUrl = (img) => {
    if (!img) return '';
    
    // If it's already a string URL (from backend)
    if (typeof img === 'string') {
      // Check if it's a backend uploaded image
      if (img.includes('uploads/') || img.includes('http')) {
        return `http://localhost:4000/uploads/${img}`;
      }
      
      // Check if it's an asset key
      if (assets[img]) {
        return assets[img];
      }
      
      // If it's just a filename without path
      return `http://localhost:4000/uploads/${img}`;
    }
    
    // If it's an imported image (static asset)
    return img;
  };

  const imageUrl = getImageUrl(image);
  console.log(`FoodItem: ${name}, Image: ${image}, URL: ${imageUrl}`);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img 
          src={imageUrl} 
          className="food-item-image" 
          alt={name} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder.jpg';
            console.log("Failed to load image:", image, "URL:", imageUrl);
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