// import React, {useState } from 'react'
// import './Add.css'
// import { assets } from '../../assets/assets'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const Add = ({url}) => {

//     const [image, setImage] = useState(false);
//     const [data, setData] = useState({
//         name:'',
//         description:'',
//         price:'',
//         category:'Salad'
//     })

//     const onChangeHandler = (event) =>{
//         const name = event.target.name;
//         const value = event.target.value;
//         setData(data=>({...data,[name]:value}))
//     }

//     const onSubmitHandler = async (event) =>{
//         event.preventDefault();
//         const formData = new FormData();
//         formData.append('name', data.name)
//         formData.append('description', data.description)
//         formData.append('price', Number(data.price))
//         formData.append('category', data.category)
//         formData.append('image', image)
//         const response = await axios.post(`${url}/api/food/add`, formData);

//         if(response.data.success){
//             setData({
//                 name:'',
//                 description:'',
//                 price:'',
//                 category:'Salad'
//             })
//             setImage(false);
//             toast.success(response.data.message)
//         }else{
//             toast.error(response.data.message)
//         }
//     }

//   return (
//     <div className='add'>
//         <form  className="flex-col" onSubmit={onSubmitHandler}>
//             <div className="add-img-upload flex-col">
//                 <p>Upload Image</p>
//                 <label htmlFor="image">
//                     <img src={image? URL.createObjectURL(image):assets.upload_area} alt="" />
//                 </label>
//                 <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
//             </div>
//             <div className="add-product-name flex-col">
//                 <p>Product name</p>
//                 <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type Here' />
//             </div>
//             <div className="add-product-description flex-col">
//                 <p>Product description</p>
//                 <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write content here' required></textarea>
//             </div>
//             <div className="add-category-price">
//                 <div className="add-category flex-col">
//                     <p>Product category</p>
//                     <select onChange={onChangeHandler}  name="category">
//                         <option value="Salad">Salad</option>
//                         <option value="Rolls">Rolls</option>
//                         <option value="Deserts">Deserts</option>
//                         <option value="Sandwich">Sandwich</option>
//                         <option value="Cake">Cake</option>
//                         <option value="Pure Veg">Pure Veg</option>
//                         <option value="Pasta">Pasta</option>
//                         <option value="Noodles">Noodles</option>
//                     </select>
//                 </div>
//                 <div className="add-price flex-col">
//                     <p>Product price</p>
//                     <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20'/>
//                 </div>
//             </div>
//             <button type='submit' className='add-btn'>ADD</button>
//         </form>
//     </div>
//   )
// }

// export default Add



// frontend/admin/src/pages/Add/Add.jsx
import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad'
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  // Function to refresh food list after adding
  const refreshFoodList = async () => {
    try {
      // You can make an API call to refresh the list if needed
      // Or you can redirect to list page
      console.log("Food added successfully, list should be refreshed");
    } catch (error) {
      console.error("Error refreshing food list:", error);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Validation
    if (!image) {
      toast.error("Please select an image");
      return;
    }
    
    if (!data.name || !data.description || !data.price) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setLoading(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);
    
    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        // Reset form
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Salad'
        });
        setImage(null);
        
        // Clear the file input
        const fileInput = document.getElementById('image');
        if (fileInput) {
          fileInput.value = '';
        }
        
        toast.success(response.data.message);
        
        // Refresh the food list
        await refreshFoodList();
        
        // Optionally redirect to list page
        // navigate('/list');
      } else {
        toast.error(response.data.message || 'Failed to add food');
      }
    } catch (error) {
      console.error('Error adding food:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add food. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img 
              src={image ? URL.createObjectURL(image) : assets.upload_area} 
              alt="Upload preview" 
            />
          </label>
          <input 
            onChange={(e) => setImage(e.target.files[0])} 
            type="file" 
            id='image' 
            accept="image/*"
            required 
            disabled={loading}
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name <span style={{color: 'red'}}>*</span></p>
          <input 
            onChange={onChangeHandler} 
            value={data.name} 
            type="text" 
            name='name' 
            placeholder='Type Here' 
            required 
            disabled={loading}
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description <span style={{color: 'red'}}>*</span></p>
          <textarea 
            onChange={onChangeHandler} 
            value={data.description} 
            name="description" 
            rows='6' 
            placeholder='Write content here' 
            required
            disabled={loading}
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select 
              onChange={onChangeHandler} 
              name="category" 
              value={data.category}
              disabled={loading}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Beverages">Noodles</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price <span style={{color: 'red'}}>*</span></p>
            <input 
              onChange={onChangeHandler} 
              value={data.price} 
              type="number" 
              name='price' 
              placeholder='$20' 
              min="0"
              step="0.01"
              required 
              disabled={loading}
            />
          </div>
        </div>
        <button 
          type='submit' 
          className='add-btn' 
          disabled={loading}
        >
          {loading ? 'Adding...' : 'ADD'}
        </button>
      </form>
    </div>
  );
};

export default Add;