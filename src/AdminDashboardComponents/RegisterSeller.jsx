import React, { useState } from "react";

const CreateSeller = () => {

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:"",
    shopName:"",
    phone:"",
    location:""
  });

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit = (e)=>{
    e.preventDefault();

    console.log(formData);

    // call API
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">

      <input name="name" placeholder="Seller Name" onChange={handleChange} className="w-full border p-2"/>

      <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2"/>

      <input name="password" placeholder="Password" onChange={handleChange} className="w-full border p-2"/>

      <input name="shopName" placeholder="Shop Name" onChange={handleChange} className="w-full border p-2"/>

      <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full border p-2"/>

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Create Seller
      </button>

    </form>
  );
};

export default CreateSeller;