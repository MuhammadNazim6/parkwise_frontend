import React, { useState } from 'react'
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


  const [addFeedback] = useAddFeedbackMutation()

  const { toast } = useToast()


  const handleReviewSubmit = async () => {
    const userId = userInfo.id;
    const parkingLotId = lotId;
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
                  value={rating ? rating : ratingToEdit}
                  onChange={setRating}
                  isRequired
                />
              </div>
              <textarea className='w-full' name='review' id='review' placeholder='Add your review here...' value={review ? review : reviewToEdit} onChange={(e) => setReview(e.target.value)} />
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