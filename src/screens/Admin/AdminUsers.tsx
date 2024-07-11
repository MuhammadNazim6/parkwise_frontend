import React, { useEffect, useState } from "react";
import { useGetUsersMutation, useBlockUnblockUserMutation } from "@/redux/slices/adminSlice";
import { useToast } from "@/components/ui/use-toast"
import Lottie from 'lottie-react'
import adminLoader from '../../assets/Animation/loaderAdmin.json'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

function AdminUsers() {
  const [getUsers, { isLoading }] = useGetUsersMutation();
  const [blockUnblock] = useBlockUnblockUserMutation();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)

  const { toast } = useToast()


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(page).unwrap();
        if(response.success){
          setUsers(response.data.users);
          setTotalPages(response.data.totalPages)
        }

      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [getUsers, page]);

  const handleBlockUnblock = async (email) => {
    const response = await blockUnblock({ email }).unwrap()
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.email === email ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
    toast({
      title: `${response.message}`,
      description: "",
    })
  }

  const handlePrevPageClick = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  const handleNextPageClick = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-100  pt-4 h-screen">
      <div className="h-full md:w-2/3 w-full">
        <p className="sm:text-2xl md:text-2xl text-lg text-center md:m-4 text-black font-bold p-3">
          Registered users
        </p>
        {!isLoading ? (users.length > 0 ? (
          <>
            {users.map((user) => (
              <div key={user._id} className="flex bg-gray-100">
                <div className="flex-grow md:w-2/3">
                  <div className="bg-white shadow-lg rounded-md p-4 mt-3 cursor-pointer transition-transform hover:scale-[1.002] ease-in-out duration-300">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-lg">{user.name}</div>
                      <div className="text-gray-500 text-sm">
                        {user.isBlocked ? (
                          <button onClick={() => handleBlockUnblock(user.email)} className="bg-green-800 text-white md:px-5 p-2 rounded-sm hover:bg-[#155d28] transition-transform ease-in-out w-28">
                            Unblock
                          </button>
                        ) : (
                          <button onClick={() => handleBlockUnblock(user.email)} className="bg-red-800 text-white p-2 md:px-5 rounded-sm hover:bg-[#8e1e1e] transition-transform ease-in-out w-28">
                            Block
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 mt-2">{user.email}</div>
                    <div className="text-xs text-gray-500 mt-2">{user.mobile ? user.mobile : null}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="fixed inset-x-0 bottom-5 md:flex justify-center">
              <Pagination className="">
                <PaginationContent className="bg p-1 glass rounded-lg bg-gray-200">
                  <PaginationItem className="cursor-pointer">
                    <PaginationPrevious onClick={handlePrevPageClick} />
                  </PaginationItem>
                  <Pagination>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <PaginationItem key={index} className="cursor-pointer">
                        <PaginationLink isActive={page === index + 1} onClick={() => setPage(index + 1)}>{index + 1}</PaginationLink>
                      </PaginationItem>
                    ))}
                  </Pagination>
                  <PaginationItem className="cursor-pointer">
                    <PaginationNext onClick={handleNextPageClick} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        ) : (<div className="flex bg-gray-100 justify-center items-center h-96">
          <div className="text-gray-400 text-xl">No Users found</div>
        </div>)) :
          (
            <div className="flex justify-center items-center h-[450px]">
              <Lottie animationData={adminLoader} className='w-[150px]' />
            </div>
          )
        }
      </div>
    </div>
  );
}

export default AdminUsers;
