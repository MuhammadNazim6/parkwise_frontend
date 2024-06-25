import React, { useEffect, useState } from 'react'
import { useFetchFeedbacksMutation } from '@/redux/slices/providerSlice'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Rating } from '@smastrom/react-rating'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { MdChatBubbleOutline } from "react-icons/md";




function ProvFeedbacks() {
  const { providerInfo } = useSelector((state: RootState) => state.auth)

  const [feedbacks, setFeedbacks] = useState([])

  const [getFeedbacks, { isLoading }] = useFetchFeedbacksMutation()

  const navigate = useNavigate()
  useEffect(() => {
    handleGetFeedbacks()
  }, [])

  const handleGetFeedbacks = async () => {
    const res = await getFeedbacks(providerInfo.id).unwrap()
    if (res.success) {
      setFeedbacks(res.data)
    }
  }
  return (
    <>
      <motion.div initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.2, duration: 0.4, ease: 'easeIn' }
        }}
        className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg dark:border-gray-700 h-screen">
          <h1 className='text-xl font-semibold text-gray-500'>User Feedbacks: {feedbacks && feedbacks.length}</h1>
          <div className="">
            {feedbacks && (
              feedbacks.length ? (

                <div className="flex flex-col md:grid md:grid-cols-2 gap-4 p-4 rounded  md:px-32 min-h-64">
                  {feedbacks.map((feedback, index) => (
                    <div key={index} className="border-b-2 h-36 p-4 text-black rounded relative">
                      <div className="flex justify-between">
                        <h1 className="font-semibold text-slate-700 text-[17px]">{feedback.userId.name}</h1>

                      </div>
                      <Rating
                        style={{ maxWidth: 65 }}
                        value={feedback.rating}
                        readOnly
                      />
                      <p className="mt-1 text-slate-600 md:text-md text-sm">{feedback.review}</p>

                      <div className="absolute bottom-2 left-4 mt-2 mr-2 flex items-center justify-center cursor-pointer bg-blue-400 p-2 rounded-sm text-white active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out"
                        onClick={() => navigate(`/provider/chats?ID=${feedback.userId._id}`)}>
                        <button>
                          <MdChatBubbleOutline  className='text-sm font-semibold ' />
                        </button>
                        <p className="text-sm ml-1">Chat now</p>

                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                'No feedbacks'
              )
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default ProvFeedbacks