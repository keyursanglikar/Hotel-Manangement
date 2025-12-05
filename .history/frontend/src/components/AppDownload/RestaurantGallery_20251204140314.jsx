// import React, { useState } from 'react'
// import './RestaurantGallery.css'
// import { assets } from '../../assets/assets'

// const RestaurantGallery = () => {
//   // Gallery images data
//   const galleryImages = [
//     { id: 1, src: assets.restaurant_interior_1, alt: "Restaurant Interior", category: "interior" },
//     { id: 2, src: assets.restaurant_interior_2, alt: "Dining Area", category: "interior" },
//     { id: 3, src: assets.restaurant_interior_3, alt: "Main Hall", category: "interior" },
//     { id: 4, src: assets.restaurant_food_1, alt: "Special Thali", category: "food" },
//     { id: 5, src: assets.restaurant_food_2, alt: "Signature Dish", category: "food" },
//     { id: 6, src: assets.restaurant_food_3, alt: "Traditional Cuisine", category: "food" },
//     { id: 7, src: assets.restaurant_exterior, alt: "Hotel Exterior", category: "exterior" },
//     { id: 8, src: assets.restaurant_ambience, alt: "Evening Ambience", category: "ambience" },
//     { id: 9, src: assets.restaurant_kitchen, alt: "Kitchen View", category: "kitchen" },
//   ]

//   const [selectedImage, setSelectedImage] = useState(galleryImages[0])
//   const [activeFilter, setActiveFilter] = useState("all")

//   const filters = [
//     { id: "all", label: "All Photos" },
//     { id: "food", label: "Food" },
//     { id: "interior", label: "Interior" },
//     { id: "exterior", label: "Exterior" },
//     { id: "ambience", label: "Ambience" },
//   ]

//   const filteredImages = activeFilter === "all" 
//     ? galleryImages 
//     : galleryImages.filter(img => img.category === activeFilter)

//   // Restaurant information
//   const restaurantInfo = {
//     name: "Hotel Shree",
//     location: "Satara, Maharashtra",
//     rating: "4.1",
//     reviews: "1,234 reviews",
//     description: "A legendary food destination in Satara serving authentic Maharashtrian cuisine since 1985. Known for its traditional recipes and warm hospitality.",
//     highlights: [
//       "Authentic Maharashtrian Thali",
//       "Family-friendly ambiance",
//       "Affordable pricing",
//       "Quick service",
//       "Vegetarian specialty"
//     ],
//     timing: "7:00 AM - 11:00 PM",
//     bestFor: ["Family Dining", "Traditional Food", "Budget Meals", "Local Cuisine"]
//   }

//   return (
//     <div className='restaurant-gallery' id='restaurant-gallery'>
//       {/* Restaurant Header */}
//       <div className="restaurant-header">
//         <div className="restaurant-title-section">
//           <h1>{restaurantInfo.name}</h1>
//           <div className="location-badge">
//             <span className="location-icon">📍</span>
//             <span>{restaurantInfo.location}</span>
//           </div>
//         </div>
        
//         <div className="restaurant-rating">
//           <div className="rating-badge">
//             <span className="rating-star">⭐</span>
//             <span className="rating-value">{restaurantInfo.rating}</span>
//           </div>
//           <p className="reviews-count">{restaurantInfo.reviews}</p>
//         </div>
//       </div>

//       {/* Main Gallery with Featured Image */}
//       <div className="gallery-main-section">
//         {/* Featured Image */}
//         <div className="featured-image-container">
//           <div className="featured-image-wrapper">
//             <img 
//               src={selectedImage.src} 
//               alt={selectedImage.alt} 
//               className="featured-image"
//             />
//             <div className="image-controls">
//               <button className="control-btn prev-btn">‹</button>
//               <button className="control-btn next-btn">›</button>
//             </div>
//           </div>
          
//           {/* Restaurant Info Card */}
//           <div className="info-card">
//             <h3>About {restaurantInfo.name}</h3>
//             <p className="description">{restaurantInfo.description}</p>
            
//             <div className="info-grid">
//               <div className="info-item">
//                 <span className="info-label">Timing</span>
//                 <span className="info-value">{restaurantInfo.timing}</span>
//               </div>
//               <div className="info-item">
//                 <span className="info-label">Best For</span>
//                 <div className="tags">
//                   {restaurantInfo.bestFor.map((tag, index) => (
//                     <span key={index} className="tag">{tag}</span>
//                   ))}
//                 </div>
//               </div>
//             </div>
            
//             <div className="highlights">
//               <h4>Highlights</h4>
//               <ul>
//                 {restaurantInfo.highlights.map((highlight, index) => (
//                   <li key={index}>
//                     <span className="highlight-icon">✓</span>
//                     {highlight}
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             <button className="direction-btn">
//               <span>📍</span> Get Directions
//             </button>
//           </div>
//         </div>

//         {/* Gallery Filters */}
//         <div className="gallery-filters">
//           {filters.map(filter => (
//             <button
//               key={filter.id}
//               className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
//               onClick={() => setActiveFilter(filter.id)}
//             >
//               {filter.label}
//             </button>
//           ))}
//         </div>

//         {/* Thumbnail Grid */}
//         <div className="thumbnail-grid">
//           {filteredImages.map(image => (
//             <div 
//               key={image.id} 
//               className={`thumbnail-item ${selectedImage.id === image.id ? 'active' : ''}`}
//               onClick={() => setSelectedImage(image)}
//             >
//               <img src={image.src} alt={image.alt} />
//               <div className="thumbnail-overlay">
//                 <span className="view-icon">👁️</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Restaurant Features */}
//       <div className="restaurant-features">
//         <h2>Why Choose {restaurantInfo.name}?</h2>
//         <div className="features-grid">
//           <div className="feature-card">
//             <div className="feature-icon">🍛</div>
//             <h3>Authentic Taste</h3>
//             <p>Traditional recipes passed down through generations</p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">👨‍👩‍👧‍👦</div>
//             <h3>Family Friendly</h3>
//             <p>Perfect for family gatherings and celebrations</p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">💰</div>
//             <h3>Value for Money</h3>
//             <p>Quality food at affordable prices</p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">⚡</div>
//             <h3>Quick Service</h3>
//             <p>Minimal waiting time even during peak hours</p>
//           </div>
//         </div>
//       </div>

//       {/* Call to Action */}
//       <div className="cta-section">
//         <div className="cta-content">
//           <h2>Experience Authentic Maharashtrian Hospitality</h2>
//           <p>Visit us today and taste the legacy of traditional cuisine</p>
//           <div className="cta-buttons">
//             <button className="primary-cta">
//               <span>📞</span> Call for Reservation
//             </button>
//             <button className="secondary-cta">
//               <span>📍</span> View on Map
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RestaurantGallery