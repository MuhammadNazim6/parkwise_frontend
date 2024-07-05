import React from 'react'
import ProDashboardContent from '@/components/Provider/ProDashboardContent'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { motion } from "framer-motion"


function ProvDashboard() {
  const { providerInfo } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {providerInfo.approvalStatus !== "true" ? (
       <motion.div initial={{ opacity: 0 }}
       animate={{
         opacity: 1,
         transition: { delay: 0.1, duration: 0.2, ease: 'easeIn' }
       }}  className='flex place-content-center ml-52 mt-14'>
          <div className="bg-green-400/30 shadow-lg rounded-md p-4 mt-4 cursor-pointer transition-transform hover:scale-[1.006] ease-in-out duration-300">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-lg text-center w-full">Add your parking lot now</div>
            </div>
            <div className="text-gray-900 mt-2 text-sm">You can access the dashboard and other facilities once admin have accepted the aprking provider request.</div>
          </div>
          </motion.div>
      ):(
        <ProDashboardContent />
      )}
    </>
  )
}

export default ProvDashboard