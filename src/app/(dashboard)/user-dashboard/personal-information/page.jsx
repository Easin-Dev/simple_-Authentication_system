'use client';

import React, { useRef, useState } from 'react';
import { Pencil } from 'lucide-react';
import { useSession } from 'next-auth/react';

const Page = () => {
  const {data: session} = useSession();
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState('https://i.ibb.co.com/5XJFV6yV/no-author.png'); 

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    retypePassword: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    setEditMode(false);
  };
  
  return (
    <div className=''>
      <h1 className='text-2xl font-semibold text-center mb-6'>Personal Information</h1>
      {/* Profile Picture */}
      <div className='relative w-36 h-36 mx-auto mb-6'>
        <img
          src={image}
          alt='Profile'
          className='w-full h-full object-cover rounded-full border-4 border-white shadow-md'
        />
        {editMode && (
          <>
            <button
              type='button'
              onClick={() => fileInputRef.current.click()}
              className='absolute bottom-5 right-0 bg-blue-600 p-1 rounded-full hover:bg-blue-700'
            >
              <Pencil size={18} className='text-white' />
            </button>
            <input
              type='file'
              ref={fileInputRef}
              accept='image/*'
              className='hidden'
              onChange={handleImageChange}
            />
          </>
        )}
      </div>


      <form className='space-y-4 w-2/3 mx-auto' onSubmit={handleSubmit}>

        <div>
          <label className='block font-medium'>Full Name:</label>
          <input
            type='text'
            name='fullName'
            value={formData.fullName || session?.fullName || session?.user?.name}
            onChange={handleChange}
            readOnly={!editMode}
            className={`w-full ${editMode ? 'bg-white border' : 'bg-gray-100'} px-4 py-2  rounded-md`}
          />
        </div>

        <div>
          <label className='block font-medium'>Email Address:</label>
          <input
            type='email'
            name='email'
            value={formData.email || session?.user?.email || session?.email}
            onChange={handleChange}
            readOnly={!editMode}
            className={`w-full ${editMode ? 'bg-white border' : 'bg-gray-100 '} px-4 py-2 rounded-md`}
          />
        </div>

        {editMode && (
          <>
            <div>
              <label className='block font-medium'>Phone:</label>
              <input
                type='text'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='w-full px-4 py-2 border rounded-md'
              />
            </div>

            <div>
              <label className='block font-medium'>Password</label>
              <div className='grid grid-cols-3 gap-3'>
                <input
                  type='password'
                  name='currentPassword'
                  placeholder='Current Password'
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className='px-2 py-2 border rounded-md'
                />
                <input
                  type='password'
                  name='newPassword'
                  placeholder='New Password'
                  value={formData.newPassword}
                  onChange={handleChange}
                  className='px-2 py-2 border rounded-md'
                />
                <input
                  type='password'
                  name='retypePassword'
                  placeholder='Retype Password'
                  value={formData.retypePassword}
                  onChange={handleChange}
                  className='px-2 py-2 border rounded-md'
                />
              </div>
            </div>
          </>
        )}

        <div className='flex justify-center gap-4 mt-6'>
          {editMode ? (
            <>
              <button
                type='button'
                className='px-6 py-2 rounded border text-blue-600 hover:bg-blue-50'
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='px-6 py-2 rounded bg-blue-600 text-white shadow-md hover:bg-blue-700'
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              type='button'
              onClick={() => setEditMode(true)}
              className='px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700'
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Page;
