import React, { useEffect, useState } from 'react'
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
import { useDeleteFeedbackMutation } from '@/redux/slices/userApiSlice';
import { useToast } from "@/components/ui/use-toast"

function DeleteReviewModal({ onClose, isOpen, feedbackId }) {
  const { userInfo } = useSelector((state: RootState) => state.auth)

  const { toast } = useToast()
  const [deleteReview] = useDeleteFeedbackMutation()

  const handleDeleteReview = async () => {
    const userId = userInfo.id;

    const data = {
      userId,
      feedbackId
    }

    const res = await deleteReview(data).unwrap()
    if (res.success) {
      onClose()
      toast({
        title: "Your review has been deleted",
        description: "",
      })
    }
  }

  return (
    <div>
      <Modal onClose={onClose} size='xl' isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='mt-8'>Are you sure?</ModalHeader>
          <ModalBody>
            <div className=''>
              Delete the added review
            </div>
          </ModalBody>
          <ModalFooter className='flex space-x-3'>
            <Button onClick={handleDeleteReview}>Yes</Button>
            <Button onClick={onClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default DeleteReviewModal