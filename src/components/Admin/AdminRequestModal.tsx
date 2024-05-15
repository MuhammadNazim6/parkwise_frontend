import React from 'react'

function AdminRequestModal({ isOpen, onClose, selectedLot, acceptRequestFn, rejectRequestFn }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 modal-box max-w-5xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Parking lot Details</h2>
        <div className="text-gray-700 md:flex justify-evenly">
          <div className="text-lg space-y-7">
            <p><strong className='mr-2'>Parking lot Name:</strong> {selectedLot.parkingName}</p>
            <p><strong className='mr-2'>Date:</strong> {new Date(selectedLot.requestDate).toLocaleDateString()}</p>
            <p><strong className='mr-2'>Available Space:</strong> {selectedLot.availableSpace}</p>
            <p className='text-wrap w-28'>
              <strong>Address:</strong>{' '}
              {selectedLot.addressId.buildingOrAreaName}{' '}
              {selectedLot.addressId.street}{' '}
              {selectedLot.addressId.pinNumber}{' '}
              {selectedLot.addressId.kannur}{' '}
              {selectedLot.addressId.state}{' '}
              {selectedLot.addressId.country}
            </p>
            <p><strong className='mr-2'>Time:</strong> {selectedLot.startTime} - {selectedLot.endTime}</p>

          </div>
          <div className="text-lg md:mt-0 mt-4 space-y-7">
            <p><strong className='mr-2'>provider Name:</strong> {selectedLot.name}</p>
            <p><strong className='mr-2'>email:</strong>{selectedLot.email}</p>
            <p><strong className='mr-2'>Hourly charge:</strong>Rs {selectedLot.pricePerHour}</p>
            <p><strong className='mr-2'>Water service:</strong> {selectedLot.waterServicePrice > 0 ? '✔️' : '❌'}</p>
            <p><strong className='mr-2'>Air filling:</strong> {selectedLot.airPressureCheckPrice > 0 ? '✔️' : '❌'}</p>
            <p><strong className='mr-2'>Ev charging:</strong> {selectedLot.evChargeFacilityPrice > 0 ? '✔️' : '❌'}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-around md:w-2/5">
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-[#574476] text-white rounded-xs w-24">Close</button>
            <button onClick={() => acceptRequestFn(selectedLot._id)} className="mt-4 px-4 py-2 bg-green-900 text-white rounded-xs w-24">Accept</button>
            <button onClick={() => rejectRequestFn(selectedLot._id)} className="mt-4 px-4 py-2 bg-red-900 text-white rounded-xs w-24">Reject</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRequestModal