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
import { assets } from "../../assets/a";
import "./FoodItem.css";
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ id, name, price, description, image, category }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  
  // Helper function to get correct image URL
  const getImageUrl = (img) => {
    console.log("getImageUrl received:", img);
    
    // If no image, return empty
    if (!img) return '';
    
    // Check if it's an imported image (already a URL string from assets)
    if (typeof img === 'string' && img.startsWith('blob:')) {
      return img; // This is a blob URL from FileReader
    }
    
    // Check if it's a full URL
    if (typeof img === 'string' && (img.startsWith('http') || img.startsWith('data:'))) {
      return img;
    }
    
    // Check if it's an asset key (like 'food_1')
    if (typeof img === 'string' && assets[img]) {
      console.log(`Found in assets: ${img} =`, assets[img]);
      return assets[img];
    }
    
    // Check if it's already an imported image (ES module default export)
    if (typeof img === 'object' && img.default) {
      return img.default;
    }
    
    // If it's a relative path that starts with /src/assets/
    if (typeof img === 'string' && img.startsWith('/src/assets/')) {
      // This is a Vite static asset path
      console.log("Vite asset path detected:", img);
      return img;
    }
    
    // For backend uploaded images
    if (typeof img === 'string') {
      // Check if it already has uploads path
      if (img.includes('uploads/')) {
        return `http://localhost:4000/${img}`;
      }
      return `http://localhost:4000/uploads/${img}`;
    }
    
    // If it's the actual imported image object
    return img || '';
  };

  const imageUrl = getImageUrl(image);
  console.log(`FoodItem: ${name}, Image type: ${typeof image}, URL:`, imageUrl);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img 
          src={imageUrl} 
          className="food-item-image" 
          alt={name} 
          onError={(e) => {
            console.error(`Failed to load image for ${name}:`, image, "URL:", imageUrl);
            e.target.onerror = null;
            // Try alternative loading method
            if (typeof image === 'string' && image.startsWith('/src/assets/')) {
              // For Vite, try to load from public folder
              const filename = image.split('/').pop();
              e.target.src = `/assets/${filename}`;
            } else {
              e.target.src = '/placeholder.jpg';
            }
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