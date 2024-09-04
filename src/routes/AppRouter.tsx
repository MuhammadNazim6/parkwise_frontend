import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import MainLoader from '@/assets/Animation/MainLoader.json'
import Lottie from 'lottie-react'


const UserRoutes = lazy(() => import('./UserRoutes'));
const ProviderRoutes = lazy(() => import('./ProviderRoutes'));
const AdminRoutes = lazy(() => import('./AdminRoutes'));

function AppRouter() {
  return (
    <Suspense fallback={<div className='flex justify-center items-center h-screen'>
      <Lottie animationData={MainLoader} className='w-36' />
      </div>}>
      <Routes>
        <Route path='/*' element={<UserRoutes />} />
        <Route path='/provider/*' element={<ProviderRoutes />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
      </Routes>
    </Suspense>

  )
}

export default AppRouter