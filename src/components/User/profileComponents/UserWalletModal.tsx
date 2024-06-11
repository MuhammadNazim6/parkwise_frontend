import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { useToast } from "@/components/ui/use-toast"
import { PiContactlessPaymentLight } from "react-icons/pi";
import { Fade, ScaleFade, Slide, SlideFade, Collapse, Box } from '@chakra-ui/react'
import { RiHistoryLine } from "react-icons/ri";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'


const UserWalletModal = ({ isOpen, onClose, wallet }) => {
  const { toast } = useToast()
  const { isOpen: isCollapseOpen, onToggle } = useDisclosure()

  console.log(wallet);

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={'2xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>My wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={9}>
          <div className="flex justify-center font-mono">
            <div className="h-48 bg-black glass rounded-lg w-80 relative shadow-3xl">
              <div className="text-gray-100 absolute top-7 left-6 text-lg">
                Parkwise
              </div>
              <div className="text-gray-100 absolute bottom-14 text-xl left-7 tracking-[4px]">
                Rs {wallet.balance}
              </div>
              <div className="text-gray-100 absolute bottom-5 left-6 tracking-[4px]">
                **** **** **34
              </div>
              <div className="text-gray-100 absolute bottom-6 right-5">
                <div className="rounded-full w-7 h-7 bg-yellow-100"></div>
              </div>
              <div className="text-gray-100 absolute bottom-6 right-9">
                <div className="rounded-full w-7 h-7 bg-red-200"></div>
              </div>
              <div className="text-gray-100 absolute top-6 right-5">
                <PiContactlessPaymentLight className='text-4xl text-gray-300' />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-7">
            <Button className='flex justify-center items-center space-x-2' onClick={onToggle}><span>View history</span><RiHistoryLine /></Button>
          </div>
          <Collapse in={isCollapseOpen} animateOpacity>
            <Box
              p='40px'
              color='white'
              mt='4'
              bg='gray.100'
              rounded='md'
              shadow='md'
            >
              <TableContainer className='w-full'>
                <Table className='table-fixed w-8/12'>
                  <Thead>
                    <Tr>
                      <Th className='px-4 py-2 w-1/2 text-center '>Amount</Th>
                      <Th className='px-4 py-2 w-1/2 text-center'>Type</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {wallet.history.map((his) => {
                      return (<Tr className='text-black'>
                        <Td className='px-4 py-2 text-center'>Rs {his.amount}</Td>
                        <Td className='px-4 py-2 text-center'>{his.transactionType}</Td>
                      </Tr>)
                    })}
                  </Tbody>
                </Table>
              </TableContainer>


            </Box>
          </Collapse>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UserWalletModal