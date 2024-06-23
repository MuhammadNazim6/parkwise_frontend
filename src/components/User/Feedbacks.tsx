import { useFetchFeedbacksMutation } from '@/redux/slices/userApiSlice'
import React, { useEffect, useState } from 'react'
import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating'
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { useDisclosure } from '@chakra-ui/react'
import AddReviewModal from './AddReviewModal'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Lottie from 'lottie-react'
import boxLoader from '../../assets/Animation/boxLoader.json'



function Feedbacks({ lotId }) {
  const { userInfo } = useSelector((state: RootState) => state.auth)

  const { isOpen: reviewModalIsOpen, onOpen: openReviewModal, onClose: closeReviewModal } = useDisclosure()
  // const [feedbacks, setFeedbacks] = useState([{
  //   parkingLotId: '60af884f4d1a4b8f8b8d1234',
  //   userId: '60af884f4d1a4b8f8b8d5678',
  //   rating: 4.5,
  //   review: 'Great parking space with easy access and plenty of room.',
  //   name: 'John Doe',
  //   time: new Date('2023-06-01')  // Example date
  // },
  // {
  //   parkingLotId: '60af884f4d1a4b8f8b8d2345',
  //   userId: '60af884f4d1a4b8f8b8d6789',
  //   rating: 3.8,
  //   review: 'Decent parking lot, but a bit crowded during peak hours.',
  //   name: 'Jane Smith',
  //   time: new Date('2023-06-02')  // Example date
  // },
  // {
  //   parkingLotId: '60af884f4d1a4b8f8b8d3456',
  //   userId: '60af884f4d1a4b8f8b8d7890',
  //   rating: 5.0,
  //   review: 'Excellent parking facilities with top-notch security.',
  //   name: 'Alice Johnson',
  //   time: new Date('2023-06-03')  // Example date
  // },
  // {
  //   parkingLotId: '60af884f4d1a4b8f8b8d4567',
  //   userId: '60af884f4d1a4b8f8b8d8901',
  //   rating: 2.5,
  //   review: 'Parking lot needs better lighting and more spaces.',
  //   name: 'Bob Brown',
  //   time: new Date('2023-06-04')  // Example date
  // },
  // {
  //   parkingLotId: '60af884f4d1a4b8f8b8d5678',
  //   userId: '60af884f4d1a4b8f8b8d9012',
  //   rating: 4.0,
  //   review: 'Good location, reasonable pricing, and clean environment.',
  //   name: 'Emily Wilson',
  //   time: new Date('2023-06-05')  // Example date
  // }])

  const [feedbacks, setFeedbacks] = useState([])
  const [avgRating, setAvgRating] = useState(2)
  const [ratingToEdit, setRatingToEdit] = useState(0)
  const [reviewToEdit, setReviewToEdit] = useState('')




  const [fetchFeedbacks, { isLoading: isLoadingFeedbacks }] = useFetchFeedbacksMutation()


  useEffect(() => {
    handleFetchFeedback()
  }, [])

  const handleFetchFeedback = async () => {
    const res = await fetchFeedbacks(lotId).unwrap()
    if (res.success) {
      setFeedbacks(() => [...res.data])
      console.log(res.data);
      calculateAvgRating()
      res.data.forEach((feedback) => {
        if (feedback.userId._id === userInfo.id) {
          setRatingToEdit(feedback.rating)
          setReviewToEdit(feedback.review)
        }
      })
    }
  }

  const closeAndUpdate = async () => {
    handleFetchFeedback()
    closeReviewModal()
  }

  const calculateAvgRating = () => {
    const total = feedbacks.reduce((a, c) => {
      return a.rating + c.rating
    })
    const avg = total / feedbacks.length
    setAvgRating(avg)
  }

  return (
    <>
      {isLoadingFeedbacks ? 
      (<div className="flex justify-center items-center mt-5 min-h-96">
        <Lottie animationData={boxLoader} className='w-28' />
      </div>) :
        (
          <div>
            <div className="flex p-4 rounded space-x-4 mt-24">
              <div className="text-whte rounded flex-grow flex justify-center items-center space-x-5">

                <div className="min-h-40">
                  <div className="flex justify-center items-center">
                    <Rating
                      style={{ maxWidth: 130 }}
                      value={avgRating}
                      readOnly

                    />
                  </div>
                  <p className='text-center text-sm mt-2 text-slate-500'>{avgRating} Stars • 16 users have rated</p>

                  {/* Should give conditioning here if user have alredy booked and visited */}
                  <div className='text-center text-lg mt-4 text-slate-800 cursor-pointer hover:text-[19px] transition-all ease-in-out' onClick={openReviewModal}>
                    <button className='btn rounded-none btn-outline hover:bg-slate-100 hover:text-gray-400 transition-all'>
                      Add Review
                    </button>
                  </div>


                  <AddReviewModal onClose={closeAndUpdate} isOpen={reviewModalIsOpen} lotId={lotId} reviewToEdit={reviewToEdit} ratingToEdit={ratingToEdit} />


                </div>
              </div>
            </div>
            {feedbacks.length ? (
              <div className="flex flex-col md:grid md:grid-cols-2 gap-4 p-4 rounded  md:px-32 min-h-64">
                {feedbacks.map((feedback, index) => (
                  <div key={index} className="border-b-2 h-36 p-4 text-black rounded relative">
                    <div className="flex justify-between">
                      <h1 className="font-semibold text-slate-700 text-[17px]">{feedback.userId.name}</h1>
                      {feedback.userId._id === userInfo.id && (<button className="text-slate-700" onClick={openReviewModal}>edit</button>)}
                    </div>
                    <Rating
                      style={{ maxWidth: 65 }}
                      value={feedback.rating}
                      readOnly
                    />
                    <p className="mt-1 text-slate-600 md:text-md text-sm">{feedback.review}</p>

                    {/* Helpful text and buttons */}
                    <div className="absolute bottom-2 left-4 mt-2 mr-2 flex items-center">
                      <p className="text-gray-500 md:text-sm text-xs mr-2">Helpful?</p>
                      <button
                        // onClick={() => handleThumbUp(review._id)} // Assuming review has an _id field
                        className="p-1"
                      >
                        <FaRegThumbsUp className='text-xs text-slate-600' />
                      </button>
                      <button
                        // onClick={() => handleThumbDown(review._id)} // Assuming review has an _id field
                        className="p-1 focus:outline-none ml-1"
                      >
                        <FaRegThumbsDown className='text-xs text-slate-600' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center min-h-32 text-xl">
                No reviews
              </div>
            )
            }
          </div>

        )}
    </>
  )
}

export default Feedbacks