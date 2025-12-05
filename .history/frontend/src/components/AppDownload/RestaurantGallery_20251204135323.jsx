import React from 'react'
import './RestaurantGallery.css'
import { assets } from '../../assets/assets'

const RestaurantGallery = () => {
  // Restaurant images data
  const galleryImages = [
    { id: 1, src: assets.restaurant_interior_1, alt: "Elegant Dining Area", caption: "Our elegant dining space" },
    { id: 2, src: assets.restaurant_interior_2, alt: "Cozy Corner", caption: "Perfect for intimate dinners" },
    { id: 3, src: assets.restaurant_interior_3, alt: "Chef in Kitchen", caption: "Our master chef at work" },
    { id: 4, src: assets.dish_specialty_1, alt: "Signature Dish", caption: "Award-winning signature dish" },
    { id: 5, src: assets.restaurant_exterior, alt: "Restaurant Exterior", caption: "Our beautiful exterior" },
    { id: 6, src: assets.dining_experience, alt: "Fine Dining Experience", caption: "Unforgettable dining moments" },
  ]

  // Restaurant info
  const restaurantInfo = {
    name: "Tomato Bistro",
    slogan: "Where flavor meets passion",
    description: "Established in 2010, Tomato Bistro has been serving authentic Italian cuisine with a modern twist. Our commitment to fresh ingredients and traditional recipes has made us a beloved destination for food enthusiasts.",
    features: [
      "Farm-to-table fresh ingredients",
      "Award-winning wine selection",
      "Cozy and elegant ambiance",
      "Seasonal menu innovations"
    ],
    hours: {
      weekdays: "11:00 AM - 10:00 PM",
      weekends: "11:00 AM - 11:00 PM"
    }
  }

  return (
    <div className='restaurant-gallery' id='restaurant-gallery'>
      {/* Header Section */}
      <div className="gallery-header">
        <h1>Welcome to <span className="restaurant-name">{restaurantInfo.name}</span></h1>
        <p className="slogan">{restaurantInfo.slogan}</p>
      </div>

      {/* Main Gallery Grid */}
      <div className="gallery-main">
        <div className="gallery-description">
          <h2>Our Story</h2>
          <p>{restaurantInfo.description}</p>
          
          <div className="restaurant-features">
            <h3>What Makes Us Special</h3>
            <ul>
              {restaurantInfo.features.map((feature, index) => (
                <li key={index}>
                  <span className="feature-icon">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="operating-hours">
            <h3>Operating Hours</h3>
            <div className="hours-grid">
              <div className="hours-day">
                <span>Monday - Friday</span>
                <span>{restaurantInfo.hours.weekdays}</span>
              </div>
              <div className="hours-day">
                <span>Saturday - Sunday</span>
                <span>{restaurantInfo.hours.weekends}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery Grid */}
        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <div className="gallery-item" key={image.id}>
              <img src={image.src} alt={image.alt} className="gallery-image" />
              <div className="image-caption">
                <p>{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Slogans/Call to Action */}
      <div className="gallery-cta">
        <h2>Experience Culinary Excellence</h2>
        <div className="slogan-cards">
          <div className="slogan-card">
            <div className="slogan-icon">🍅</div>
            <h3>Fresh & Organic</h3>
            <p>Only the freshest ingredients from local farms</p>
          </div>
          <div className="slogan-card">
            <div className="slogan-icon">👨‍🍳</div>
            <h3>Master Chefs</h3>
            <p>Expert chefs with decades of experience</p>
          </div>
          <div className="slogan-card">
            <div className="slogan-icon">🍷</div>
            <h3>Perfect Pairings</h3>
            <p>Curated wine selection to complement every dish</p>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="reservation-cta">
          <p>Ready for an unforgettable dining experience?</p>
          <button className="reservation-btn">Make a Reservation</button>
        </div>
      </div>
    </div>
  )
}

export default RestaurantGallery