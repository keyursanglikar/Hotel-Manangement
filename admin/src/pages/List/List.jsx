// import React, { useEffect, useState } from 'react'
// import './List.css'
// import axios from 'axios'
// import { toast } from 'react-toastify';

// const List = ({url}) => {

//   const [list, setList] = useState([]);

//   const fetchList = async () =>{
//     const response = await axios.get(`${url}/api/food/list`)
   
//     if(response.data.success){
//       setList(response.data.data)
//     }
//     else{
//       toast.error("Error")
//     }
//   }

//   const removeFood = async (foodId) =>{

//     try {
//       const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
//       await fetchList();
      
//       if (response.data.success) {
//         toast.success(response.data.message);
//       } else {
//         throw new Error(response.data.message || 'Error occurred while removing food.');
//       }
//     } catch (error) {
//       console.log(error);
      
//       // Check if the error has a message and display it in the toast.
//       const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred.';
//       toast.error(errorMessage);
//     }
    
//   }

//   useEffect(()=>{
//     fetchList();
//   },[])
//   return (
//     <div className='list add flex-col'>
//       <p>All Foods List</p>
//       <div className="list-table">
//         <div className="list-table-format title">
//             <b>Image</b>
//             <b>Name</b>
//             <b>Category</b>
//             <b>Price</b>
//             <b>Action</b>
//         </div>
//         {list.map((item,index)=>{
//           return(
//             <div key={index} className="list-table-format">
//               <img src={`${url}/images/`+item.image} alt="" />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>${item.price}</p>
//               <p onClick={()=> removeFood(item._id)} className='cursor'>X</p>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default List



// // frontend/admin/src/pages/List/List.js
// import React, { useEffect, useState } from 'react'
// import './List.css'
// import axios from 'axios'
// import { toast } from 'react-toastify';

// const List = ({url}) => {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchList = async () =>{
//     setLoading(true);
//     try {
//       const response = await axios.get(`${url}/api/food/list`);
//       console.log("List response:", response.data);
      
//       if(response.data.success){
//         setList(response.data.data);
//       } else {
//         toast.error("Error fetching food list");
//       }
//     } catch (error) {
//       console.error("Error fetching list:", error);
//       toast.error("Failed to fetch food list");
//     } finally {
//       setLoading(false);
//     }
//   }

//   const removeFood = async (foodId) => {
//     if (!window.confirm("Are you sure you want to remove this food item?")) {
//       return;
//     }
    
//     try {
//       const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
//       await fetchList();
      
//       if (response.data.success) {
//         toast.success(response.data.message);
//       } else {
//         throw new Error(response.data.message || 'Error occurred while removing food.');
//       }
//     } catch (error) {
//       console.log(error);
//       const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred.';
//       toast.error(errorMessage);
//     }
//   }

//   useEffect(()=>{
//     fetchList();
//   },[]);

//   return (
//     <div className='list add flex-col'>
//       <h2>All Foods List</h2>
//       {loading ? (
//         <div className="loading">Loading...</div>
//       ) : (
//         <div className="list-table">
//           <div className="list-table-format title">
//               <b>Image</b>
//               <b>Name</b>
//               <b>Category</b>
//               <b>Price</b>
//               <b>Action</b>
//           </div>
//           {list.length > 0 ? (
//             list.map((item,index)=>{
//               return(
//                 <div key={item._id || index} className="list-table-format">
//                   <img 
//                     src={`${url}/uploads/${item.image}`} 
//                     alt={item.name} 
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = '/placeholder.jpg';
//                     }}
//                   />
//                   <p>{item.name}</p>
//                   <p>{item.category}</p>
//                   <p>${item.price}</p>
//                   <p onClick={()=> removeFood(item._id)} className='cursor'>X</p>
//                 </div>
//               )
//             })
//           ) : (
//             <div className="no-items">
//               <p>No food items found. Add some items!</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// export default List





// frontend/admin/src/pages/List/List.jsx
import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log("List response:", response.data);
      
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Failed to fetch food list");
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (foodId) => {
    if (!window.confirm("Are you sure you want to remove this food item?")) {
      return;
    }
    
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      await fetchList();
      
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        throw new Error(response.data.message || 'Error occurred while removing food.');
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred.';
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <h2>All Foods List</h2>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.length > 0 ? (
            list.map((item, index) => {
              return (
                <div key={item._id || index} className="list-table-format">
                  <img 
                    src={`${url}/uploads/${item.image}`} 
                    alt={item.name} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                  <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
                </div>
              );
            })
          ) : (
            <div className="no-items">
              <p>No food items found. Add some items from the Add page!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default List;