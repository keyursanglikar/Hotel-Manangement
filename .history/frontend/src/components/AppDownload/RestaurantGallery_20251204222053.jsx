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




import React, { useState } from 'react'
import './RestaurantGallery.css'

const RestaurantGallery = () => {
  // Placeholder images - replace these with your actual images
  const placeholderImages = [
    "https://mindtrip.ai/cdn-cgi/image/format=webp,w=960/https://images.mindtrip.ai/restaurants/673c/be77/b603/2db6/5857/52d3/bf79/e011",
    "https://images.mindtrip.ai/restaurants/dffa/6fe7/d584/8005/2971/5718/4f0a/8021",
    "https://mindtrip.ai/cdn-cgi/image/format=webp,w=960/https://images.mindtrip.ai/restaurants/9f82/ac96/cfd7/b329/c005/e8ad/e1d4/53ef",
    "https://mindtrip.ai/cdn-cgi/image/format=webp,w=960/https://images.mindtrip.ai/restaurants/85ad/65d9/1a6a/e71f/cb25/9fe5/3371/64d7",
    "https://mindtrip.ai/cdn-cgi/image/format=webp,w=960/https://images.mindtrip.ai/restaurants/26a5/edfe/8451/53a5/f15f/1697/5cd9/2b52",
    "https://mindtrip.ai/cdn-cgi/image/format=webp,w=960/https://images.mindtrip.ai/restaurants/9f82/ac96/cfd7/b329/c005/e8ad/e1d4/53ef",
    "https://mindtrip.ai/cdn-cgi/image/format=webp,w=960/https://images.mindtrip.ai/restaurants/04b9/a83f/9b20/00dd/367f/7833/eadd/53fd",
    "https://mindtrip.ai/cdn-cgi/image/format=webp,w=960/https://images.mindtrip.ai/restaurants/cb63/fa2a/b07b/5e49/1aca/e544/ff2a/e89b",

  ]

  // Gallery images data with fallback URLs
  const galleryImages = [
    { 
      id: 1, 
      src: placeholderImages[0], 
      alt: "Restaurant Interior",
      category: "interior",
      caption: "Elegant dining area with comfortable seating"
    },
    { 
      id: 2, 
      src: placeholderImages[1], 
      alt: "Dining Area",
      category: "interior",
      caption: "Our main dining hall with traditional decor"
    },
    { 
      id: 3, 
      src: placeholderImages[2], 
      alt: "Food Display",
      category: "food",
      caption: "Freshly prepared traditional dishes"
    },
    { 
      id: 4, 
      src: placeholderImages[3], 
      alt: "Special Thali",
      category: "food",
      caption: "Our signature Maharashtrian thali"
    },
    { 
      id: 5, 
      src: placeholderImages[4], 
      alt: "Signature Dish",
      category: "food",
      caption: "Authentic local cuisine"
    },
    { 
      id: 6, 
      src: placeholderImages[5], 
      alt: "Traditional Cuisine",
      category: "food",
      caption: "Homemade recipes passed through generations"
    },
    { 
      id: 7, 
      src: placeholderImages[6], 
      alt: "Hotel Exterior",
      category: "exterior",
      caption: "Beautiful entrance and exterior view"
    },
    { 
      id: 8, 
      src: placeholderImages[7], 
      alt: "Evening Ambience",
      category: "ambience",
      caption: "Warm and inviting evening atmosphere"
    },
    { 
      id: 9, 
      src: placeholderImages[8], 
      alt: "Kitchen View",
      category: "kitchen",
      caption: "Our hygienic and modern kitchen"
    },
  ]

  const [selectedImage, setSelectedImage] = useState(galleryImages[0])
  const [activeFilter, setActiveFilter] = useState("all")
  const [imageError, setImageError] = useState({})

  const filters = [
    { id: "all", label: "All Photos" },
    { id: "food", label: "Food" },
    { id: "interior", label: "Interior" },
    { id: "exterior", label: "Exterior" },
    { id: "ambience", label: "Ambience" },
    { id: "kitchen", label: "Kitchen" },
  ]

  const filteredImages = activeFilter === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter)

  const handleImageError = (id) => {
    setImageError(prev => ({...prev, [id]: true}))
  }

  const getImageSrc = (image) => {
    if (imageError[image.id]) {
      return `https://via.placeholder.com/800x600/cccccc/666666?text=${encodeURIComponent(image.alt)}`
    }
    return image.src
  }

  // Restaurant information
  const restaurantInfo = {
    name: "Hotel Shree",
    location: "Satara, Maharashtra",
    rating: "4.1",
    reviews: "1,234 reviews",
    description: "A legendary food destination in Satara serving authentic Maharashtrian cuisine since 1985. Known for its traditional recipes and warm hospitality.",
    highlights: [
      "Authentic Maharashtrian Thali",
      "Family-friendly ambiance",
      "Affordable pricing",
      "Quick service",
      "Vegetarian specialty",
      "Clean and hygienic kitchen"
    ],
    timing: "7:00 AM - 11:00 PM",
    bestFor: ["Family Dining", "Traditional Food", "Budget Meals", "Local Cuisine", "Lunch", "Dinner"],
    contact: "+91 9876543210",
    address: "Main Road, Satara, Maharashtra 415001"
  }

  return (
    <div className='restaurant-gallery' id='restaurant-gallery'>
      {/* Restaurant Header */}
      <div className="restaurant-header">
        <div className="restaurant-title-section">
          <h1>{restaurantInfo.name}</h1>
          <div className="location-badge">
            <span className="location-icon">📍</span>
            <span>{restaurantInfo.location}</span>
          </div>
        </div>
        
        <div className="restaurant-rating">
          <div className="rating-badge">
            <span className="rating-star">⭐</span>
            <span className="rating-value">{restaurantInfo.rating}</span>
          </div>
          <p className="reviews-count">{restaurantInfo.reviews}</p>
        </div>
      </div>

      {/* Main Gallery with Featured Image */}
      <div className="gallery-main-section">
        {/* Featured Image */}
        <div className="featured-image-container">
          <div className="featured-image-wrapper">
            <img 
              src={getImageSrc(selectedImage)} 
              alt={selectedImage.alt} 
              className="featured-image"
              onError={() => handleImageError(selectedImage.id)}
            />
            <div className="image-caption-overlay">
              <p>{selectedImage.caption}</p>
            </div>
            <div className="image-controls">
              <button 
                className="control-btn prev-btn"
                onClick={() => {
                  const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
                  setSelectedImage(filteredImages[prevIndex])
                }}
              >‹</button>
              <button 
                className="control-btn next-btn"
                onClick={() => {
                  const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
                  const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
                  setSelectedImage(filteredImages[nextIndex])
                }}
              >›</button>
            </div>
          </div>
          
          {/* Restaurant Info Card */}
          <div className="info-card">
            <h3>About {restaurantInfo.name}</h3>
            <p className="description">{restaurantInfo.description}</p>
            
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">🕐 Timing</span>
                <span className="info-value">{restaurantInfo.timing}</span>
              </div>
              <div className="info-item">
                <span className="info-label">📞 Contact</span>
                <span className="info-value">{restaurantInfo.contact}</span>
              </div>
              <div className="info-item">
                <span className="info-label">📍 Address</span>
                <span className="info-value">{restaurantInfo.address}</span>
              </div>
            </div>
            
            <div className="best-for-section">
              <h4>Best For</h4>
              <div className="tags">
                {restaurantInfo.bestFor.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="highlights">
              <h4>Highlights</h4>
              <ul>
                {restaurantInfo.highlights.map((highlight, index) => (
                  <li key={index}>
                    <span className="highlight-icon">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button className="direction-btn">
              <span>📍</span> Get Directions
            </button>
          </div>
        </div>

        {/* Gallery Filters */}
        <div className="gallery-filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter(filter.id)
                // Set first image of filtered category as selected
                const firstImage = galleryImages.find(img => 
                  filter.id === "all" ? true : img.category === filter.id
                )
                if (firstImage) setSelectedImage(firstImage)
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Thumbnail Grid */}
        <div className="thumbnail-grid">
          {filteredImages.map(image => (
            <div 
              key={image.id} 
              className={`thumbnail-item ${selectedImage.id === image.id ? 'active' : ''}`}
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={getImageSrc(image)} 
                alt={image.alt}
                onError={() => handleImageError(image.id)}
              />
              <div className="thumbnail-overlay">
                <span className="view-icon">👁️</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Restaurant Features */}
      <div className="restaurant-features">
        <h2>Why Choose {restaurantInfo.name}?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🍛</div>
            <h3>Authentic Taste</h3>
            <p>Traditional recipes passed down through generations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍👩‍👧‍👦</div>
            <h3>Family Friendly</h3>
            <p>Perfect for family gatherings and celebrations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Value for Money</h3>
            <p>Quality food at affordable prices</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Quick Service</h3>
            <p>Minimal waiting time even during peak hours</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Experience Authentic Maharashtrian Hospitality</h2>
          <p>Visit us today and taste the legacy of traditional cuisine</p>
          <div className="cta-buttons">
            <button className="primary-cta">
              <span>📞</span> {restaurantInfo.contact}
            </button>
            <button className="secondary-cta">
              <span>📍</span> Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantGallery