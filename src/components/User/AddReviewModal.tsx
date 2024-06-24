import React, { useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button
} from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAddFeedbackMutation } from '@/redux/slices/userApiSlice';
import { useToast } from "@/components/ui/use-toast"

function AddReviewModal({ onClose, isOpen, lotId, reviewToEdit, ratingToEdit }) {
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const [review, setReview] = useState(reviewToEdit);
  const [rating, setRating] = useState(ratingToEdit);
  const [error, setError] = useState('');

  const { toast } = useToast()
  const [addFeedback] = useAddFeedbackMutation()

  const handleReviewSubmit = async () => {
    const userId = userInfo.id;
    const parkingLotId = lotId;
    if (!rating || !review) {
      setError("Kindly fill both review and rating")
      setTimeout(() => {
        setError("")
      }, 3000);
      return
    }
    const data = {
      userId,
      parkingLotId,
      rating,
      review
    }

    const res = await addFeedback(data).unwrap()
    if (res.success) {
      onClose()
      toast({
        title: "Your feedback has been noted",
        description: "",
      })
    }
  }

  return (
    <div>
      <Modal onClose={onClose} size='lg' isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rate and review</ModalHeader>
          <ModalBody>
            <div>
              <div className="flex justify-center items-center h-24">
                <Rating
                  style={{ maxWidth: 160 }}
                  value={rating}
                  onChange={setRating}
                  isRequired
                />
              </div>
              <textarea className='w-full' name='review' id='review' placeholder='Add your review here...' value={review} onChange={(e) => setReview(e.target.value)} />
             <div className="h-8">
             <p className='text-sm text-center mt-2 text-red-700'>{error}</p>
             </div>
            </div>
          </ModalBody>
          <ModalFooter className='flex space-x-3'>
            <Button onClick={handleReviewSubmit}>Submit</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default AddReviewModal