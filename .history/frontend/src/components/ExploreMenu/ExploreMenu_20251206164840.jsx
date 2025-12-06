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



// // frontend/src/components/ExploreMenu/ExploreMenu.jsx
// import React, { useRef, useState } from 'react'
// import './ExploreMenu.css'
// import { menu_list } from '../../assets/assets'
// import { assets } from '../../assets/assets'

// const ExploreMenu = ({ category, setCategory }) => {
//   const scrollContainerRef = useRef(null)
//   const [showPrevArrow, setShowPrevArrow] = useState(false)
//   const [showNextArrow, setShowNextArrow] = useState(true)

//   // Define all available categories
//   const allCategories = [
//     "All", 
//     "Salads", 
//     "Biryanis and Rolls", 
//     "Special Dishes", 
//     "Maharashtrian Dishes", 
//     "Veg Dishes and Thalis", 
//     "Non-Veg Dishes and Thalis",
//     "Veg Starters",
//     "Non-Veg Starters",
//     "Pasta", 
//     "Paneer Dishes",
//     "Chinese",
//     "Hot and Cold Beverages"
//   ]

//   const scrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({
//         left: -200,
//         behavior: 'smooth'
//       })
//     }
//   }

//   const scrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({
//         left: 200,
//         behavior: 'smooth'
//       })
//     }
//   }

//   const handleScroll = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
//       setShowPrevArrow(scrollLeft > 0)
//       setShowNextArrow(scrollLeft < scrollWidth - clientWidth - 10)
//     }
//   }

//   // Get category image
//   const getCategoryImage = (cat) => {
//     if (cat === "All") return menu_list[0]?.menu_image || assets.menu_1
//     const menuItem = menu_list.find(item => item.menu_name === cat)
//     return menuItem ? menuItem.menu_image : assets.menu_1
//   }

//   return (
//     <div className='explore-menu' id='explore-menu'>
//       <h1>Explore Our Menu</h1>
//       <p className='explore-menu-text'>Choose from a variety of delicious dishes across different categories</p>
      
//       <div className="explore-menu-container">
//         {showPrevArrow && (
//           <button className="explore-menu-nav prev" onClick={scrollLeft}>
//             <img src={assets.selector_icon} alt="Previous" style={{ transform: 'rotate(180deg)' }} />
//           </button>
//         )}
        
//         <div 
//           className="explore-menu-list" 
//           ref={scrollContainerRef}
//           onScroll={handleScroll}
//         >
//           {allCategories.map((cat, index) => (
//             <div 
//               onClick={() => setCategory(cat)} 
//               key={index} 
//               className="explore-menu-list-item"
//               title={cat}
//             >
//               <img 
//                 className={category === cat ? 'active' : ''} 
//                 src={getCategoryImage(cat)} 
//                 alt={cat} 
//               />
//               <p>{cat}</p>
//             </div>
//           ))}
//         </div>
        
//         {showNextArrow && (
//           <button className="explore-menu-nav next" onClick={scrollRight}>
//             <img src={assets.selector_icon} alt="Next" />
//           </button>
//         )}
//       </div>
      
//       <hr />
//     </div>
//   )
// }

// export default ExploreMenu



// frontend/src/components/ExploreMenu/ExploreMenu.jsx
import React, { useRef, useState } from 'react'
import './ExploreMenu.css'

const ExploreMenu = ({ category, setCategory }) => {
  const scrollContainerRef = useRef(null)
  const [showPrevArrow, setShowPrevArrow] = useState(false)
  const [showNextArrow, setShowNextArrow] = useState(true)

  const categories = [
    "All", 
    "Salads", 
    "Biryanis and Rolls", 
    "Special Dishes", 
    "Maharashtrian Dishes", 
    "Veg Dishes and Thalis", 
    "Non-Veg Dishes and Thalis",
    "Veg Starters",
    "Non-Veg Starters",
    "Pasta", 
    "Paneer Dishes",
    "Chinese",
    "Hot and Cold Beverages"
  ]

  const categoryImages = {
    "All": "/images/menu_1.png",
    "Salads": "/images/menu_1.png",
    "Biryanis and Rolls": "/images/Menu-2.jpg",
    "Special Dishes": "/images/Menu-3.png",
    "Maharashtrian Dishes": "/images/Menu-4.png",
    "Veg Dishes and Thalis": "/images/Menu-5.png",
    "Non-Veg Dishes and Thalis": "/images/Menu-6.png",
    "Veg Starters": "/images/Menu-7.png",
    "Non-Veg Starters": "/images/Menu-8.jpg",
    "Pasta": "/images/Menu-9.jpg",
    "Paneer Dishes": "/images/Menu-10.png",
    "Chinese": "/images/Menu-11.png",
    "Hot and Cold Beverages": "/images/Menu-12.png",
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowPrevArrow(scrollLeft > 0);
      setShowNextArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Choose from a variety of delicious dishes across different categories</p>
      
      <div className="explore-menu-container">
        {showPrevArrow && (
          <button className="explore-menu-nav prev" onClick={scrollLeft}>
            <img src="/images/selector_icon.png" alt="Previous" style={{ transform: 'rotate(180deg)' }} />
          </button>
        )}
        
        <div 
          className="explore-menu-list" 
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          {categories.map((cat, index) => (
            <div 
              onClick={() => setCategory(cat)} 
              key={index} 
              className="explore-menu-list-item"
              title={cat}
            >
              <img 
                className={category === cat ? 'active' : ''} 
                src={categoryImages[cat] || "/images/menu_1.png"} 
                alt={cat} 
              />
              <p>{cat}</p>
            </div>
          ))}
        </div>
        
        {showNextArrow && (
          <button className="explore-menu-nav next" onClick={scrollRight}>
            <img src="/images/selector_icon.png" alt="Next" />
          </button>
        )}
      </div>
      
      <hr />
    </div>
  )
}

export default ExploreMenu