import React, { useState, useEffect } from 'react'
import { useGetProvidersMutation, useBlockUnblockProviderMutation } from '@/redux/slices/adminSlice';
import { useToast } from "@/components/ui/use-toast"


function AdminProviders() {
  const [getProviders] = useGetProvidersMutation()
  const [blockUnblock] = useBlockUnblockProviderMutation()
  const [providers, setProviders] = useState([]);
  const { toast } = useToast()


  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const providersData = await getProviders().unwrap();
        console.log(providersData);
        
        setProviders(providersData.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchProviders();
  }, [getProviders]);

  const handleBlockUnblock = async (email) => {
    const response = await blockUnblock({ email }).unwrap()
    setProviders((prev) =>
      prev.map((provider) =>
        provider.email === email ? { ...provider, isBlocked: !provider.isBlocked } : provider
      )
    );
    toast({
      title: `${response.message}`,
    })
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen py-10">
      <div className="h-full sm:w-2/3 w-full">
        <p className='sm:text-2xl md:text-3xl text-lg text-center md:m-4 text-black font-bold p-3'>Providers list</p>
        {providers.length > 0 ?
          (providers.map((provider) => (
            <div key={provider._id} className="flex bg-gray-100">
              <div className="flex-grow md:w-2/3">
                <div className="bg-white shadow-lg rounded-md p-4 mt-3 cursor-pointer transition-transform hover:scale-[1.002] ease-in-out duration-300">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-lg">{provider.name}</div>
                    <div className="text-gray-500 text-sm">
                      {provider.isBlocked ? (
                        <button onClick={() => handleBlockUnblock(provider.email)} className="bg-green-800 text-white md:px-5 p-2 rounded-sm hover:bg-[#155d28] transition-transform ease-in-out w-28">
                          Unblock
                        </button>
                      ) : (
                        <button onClick={() => handleBlockUnblock(provider.email)} className="bg-red-800 text-white p-2 md:px-5 rounded-sm hover:bg-[#8e1e1e] transition-transform ease-in-out w-28">
                          Block
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mt-2">{provider.email}</div>
                  {/* <div className="text-xs text-gray-500 mt-2">{user.mobile}</div> */}
                </div>
              </div>
            </div>
          ))
          ) : (<div className="flex bg-gray-100 justify-center items-center h-64">
            <div className="text-gray-700 text-lg">No providers found</div>
          </div>)
        }
      </div>
    </div>
  )
}

export default AdminProviders