import React, { useState, useEffect } from 'react';
import UserNavbar from '../../components/User/UserNavbar';
import { PiFunnelSimpleBold } from "react-icons/pi";
import { Input } from "@/components/ui/input"
import { IoMdBatteryCharging } from "react-icons/io";
import MapComponent from '@/components/User/MapComponent';

const products = [
  { id: 1, name: 'Product 1', category: 'Electronics', price: 199.99 },
  { id: 2, name: 'Product 2', category: 'Clothing', price: 29.99 },
  { id: 3, name: 'Product 3', category: 'Electronics', price: 149.99 },
  { id: 4, name: 'Product 4', category: 'Books', price: 9.99 },
  // Add more products as needed
];

function UserHome() {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const [debouncedCategoryFilter, setDebouncedCategoryFilter] = useState(categoryFilter);
  const [debouncedPriceFilter, setDebouncedPriceFilter] = useState(priceFilter);

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedCategoryFilter(categoryFilter);
      setDebouncedPriceFilter(priceFilter);
    }, 300); // Adjust the delay as needed (e.g., 300ms)

    return () => clearTimeout(delay);
  }, [categoryFilter, priceFilter]);


  const filteredProducts = products.filter((product) =>
    product.category.toLowerCase().includes(categoryFilter.toLowerCase()) &&
    (priceFilter === '' || product.price <= parseFloat(priceFilter))
  );

  const resetFilters = () => {
    setCategoryFilter('');
    setPriceFilter('');
  };


  return (
    <>
      <UserNavbar />
      <div className="md:flex  md:justify-between h-screen">
        <div className="md:w-1/2 text-center h-1/2 m-4">
          {/* <div className="">
            <input type="text" className='bg-orange-600 w-2/3 h-10 p-2 mt-7 text-lg rounded-l-lg' placeholder='Search for available parking lots...' />
            <button className='bg-secondary-blue text-white p-2 rounded-r-lg h-10 w-auto'><PiFunnelSimpleBold /></button>
          </div> */}
          <div className="App">
            <div className="filters">
              <Input className='bg-gray-200 mt-3 h-11 ' placeholder='Search for parking lots..' value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} />
              {/* <input
          type="checkbox"
          placeholder="PLACEHOLDER"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className='h-8 '
        /> */}
              {/* <button onClick={resetFilters}>Reset</button> */}

            </div>
            {/* Use debouncedCategoryFilter and debouncedPriceFilter for filtering */}
            <ul className='mt-6 overflow-y-auto h-96 md:h-96'>
  {filteredProducts.map((product) => (
    <div key={product.id} className='bg-primary-blue md:hover:bg-blue-200  m-3 rounded-md flex  md:flex-row justify-between hover:scale-[1.004] transition-all ease-in-out cursor-pointer p-2'>
      <div className="p-3 md:ml-4">
        <div className="text-start">
          <p className='text-lg '>Metro parking</p>
          <p className='text-sm md:text-sm line-clamp-1 text-gray-700'>Secura mall, opp TK building hbsadlfkbjhasdlfkjbsa jljhjk</p>
          <div className="flex items-center">
            <IoMdBatteryCharging class="text-green-700" />
            <p className="text-gray-700">Ev</p>
          </div>
        </div>
      </div>
      <div className="md:ml-2 justify flex justify-items-end">
        <p className='p-9'>Available</p>
      </div>
    </div>
  ))}
</ul>
          </div>

          {/* _________________________________________________________________ */}
          {/* <div className="flex justify-end pr-16">
            <button className='bg-secondary-blue text-white rounded-lg h-10 mt-7 w-auto p-2'>Show nearby spots</button>
          </div> */}
        </div>
        <div className=" md:w-1/2 h-1/2">
        {/* <div id="map"></div> */}
        <MapComponent/>
        </div>
      </div>
    </>
  )
}

export default UserHome