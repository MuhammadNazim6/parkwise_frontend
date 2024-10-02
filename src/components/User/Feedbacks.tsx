import { useCheckIsAllowedToRateMutation, useFetchFeedbacksMutation } from '@/redux/slices/userApiSlice'
import React, { useEffect, useState } from 'react'
import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating'
import { useDisclosure } from '@chakra-ui/react'
import AddReviewModal from './AddReviewModal'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Lottie from 'lottie-react'
import boxLoader from '../../assets/Animation/boxLoader.json'
import UserLoginModal from '@/screens/Users/UserLoginModal';
import DeleteReviewModal from './DeleteReviewModal'

function Feedbacks({ lotId }) {
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const { isOpen: isLoginModalOpen, onOpen: openLoginModal, onClose: closeLoginModal } = useDisclosure()
  const { isOpen: reviewModalIsOpen, onOpen: openReviewModal, onClose: closeReviewModal } = useDisclosure()
  const { isOpen: isDeleteReviewModalOpen, onOpen: openDeleteReviewModal, onClose: closeDeleteReviewModal } = useDisclosure()
  const [feedbacks, setFeedbacks] = useState([])
  const [avgRating, setAvgRating] = useState(2)
  const [ratingToEdit, setRatingToEdit] = useState(0)
  const [reviewToEdit, setReviewToEdit] = useState('')
  const [isAllowedToRate, setIsAllowedToRate] = useState(true)

  const [fetchFeedbacks, { isLoading: isLoadingFeedbacks }] = useFetchFeedbacksMutation()
  const [checkIsAllowedToRate] = useCheckIsAllowedToRateMutation()

  useEffect(() => {
    handleFetchFeedback()
  }, [])


  useEffect(() => {
    calculateAvgRating();
    handleCheckIsAllowedToRate()
  }, [feedbacks]);


  const handleFetchFeedback = async () => {
    const res = await fetchFeedbacks(lotId).unwrap()
    if (res.success) {
      setFeedbacks([...res.data]);
      if (userInfo) {
        res.data.forEach((feedback) => {
          if (feedback.userId._id === userInfo.id) {
            setRatingToEdit(feedback.rating)
            setReviewToEdit(feedback.review)
          }
        })
      }
    }
  }

  const handleCheckIsAllowedToRate = async () => {
    if(!userInfo){
      return
    }
    try {
      const res = await checkIsAllowedToRate({ lotId, userId: userInfo.id }).unwrap()
      if(res.success){
        setIsAllowedToRate(true)
      }
    } catch (error) {
      setIsAllowedToRate(false)
    }
  
  }


  const calculateAvgRating = () => {
    const total = feedbacks.reduce((a, c) => a + c.rating, 0);
    const avg = total / feedbacks.length;
    if (feedbacks.length == 0) {
      setAvgRating(0)
    } else {
      setAvgRating(avg)
    }
  }

  const closeAndUpdate = async () => {
    handleFetchFeedback()
    closeReviewModal()
    closeDeleteReviewModal()
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
                  <p className='text-center text-sm mt-2 text-slate-500'>{avgRating} Stars • {feedbacks.length} {feedbacks.length === 1 ? 'user' : 'users'} have rated</p>

                  {/* Should give conditioning here if user have alredy booked and visited */}
                  <div className='text-center text-lg mt-4 text-slate-800 cursor-pointer hover:text-[19px] transition-all ease-in-out' onClick={userInfo ? openReviewModal : openLoginModal}>
                    {isAllowedToRate && <button className='btn rounded-none btn-outline hover:bg-slate-100 hover:text-gray-400 transition-all'>
                      Add Review
                    </button>}
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
                      {
                        userInfo && (feedback.userId._id === userInfo.id && (<button className="text-slate-700"><p onClick={openReviewModal}>edit</p>  <p className='text-red-500' onClick={openDeleteReviewModal}>delete</p></button>))
                      }
                      <DeleteReviewModal onClose={closeAndUpdate} isOpen={isDeleteReviewModalOpen} feedbackId={feedback._id}/>
                    </div>
                    <Rating
                      style={{ maxWidth: 65 }}
                      value={feedback.rating}
                      readOnly
                    />
                    <p className="mt-1 text-slate-600 md:text-md text-sm">{feedback.review}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center min-h-32 text-xl">
                No reviews
              </div>
            )
            }
            <UserLoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} url={`/user/find/lotDetails/${lotId}`} />
          </div>

        )}
    </>
  )
}

export default Feedbacks