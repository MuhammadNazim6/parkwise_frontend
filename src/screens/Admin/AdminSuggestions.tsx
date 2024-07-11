import React, { useEffect, useState } from "react";
import Lottie from 'lottie-react'
import adminLoader from '../../assets/Animation/loaderAdmin.json'
import { useFetchAppSuggestionsMutation } from "@/redux/slices/adminSlice";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

function AdminSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [getSuggestions, { isLoading }] = useFetchAppSuggestionsMutation()
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)


  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await getSuggestions(page).unwrap();
        if (response.success) {
          setSuggestions(response.data.suggestions);
          setTotalPages(response.data.totalPages)
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };
    fetchFeedbacks();
  }, [page]);


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
          App Suggestions
        </p>

        {!isLoading ? (
          suggestions.length > 0 ? (
            <>
              {
                suggestions.map((item) => (
                  <div key={item._id} className="flex bg-gray-100">
                    <div className="flex-grow md:w-2/3">
                      <div className="bg-white shadow-lg rounded-md p-4 mt-3 cursor-pointer transition-transform hover:scale-[1.002] ease-in-out duration-300 flex justify-between">
                        <div className="flex-grow space-y-2">
                          <p className="text-sm text-slate-500"><span className="text-black">Message:</span> {item.message}</p>
                          {item.email && (<p className="text-sm text-slate-500"><span className="text-black">Email:</span> {item.email}</p>)}
                          <p className="text-sm text-slate-500"><span className="text-black">Url:</span> {item.url}</p>
                        </div>
                        <div className=""><p>
                          {item.feedbackType}
                        </p></div>
                      </div>
                    </div>
                  </div>
                ))
              }

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
            <div className="text-gray-400 text-xl">No Feedbacks found</div>
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

export default AdminSuggestions;
