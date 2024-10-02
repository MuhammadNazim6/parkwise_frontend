import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

function VideoCallRoom() {
  const { roomId } = useParams()
  const { userInfo, providerInfo } = useSelector((state: RootState) => state.auth)
  
  const videoChat = async (element) => {
    const appId =  import.meta.env.VITE_APP_ID;
    const serverSecret =  import.meta.env.VITE_SERVER_SECRET
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(parseInt(appId), serverSecret, roomId, userInfo ? userInfo.id : providerInfo.id, userInfo ? userInfo.name : providerInfo.name)
    const zc = ZegoUIKitPrebuilt.create(kitToken)
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,

      }

    })
  }

  return (
    <div>
      <div className='bg-black h-screen' ref={videoChat} />
    </div>
  )
}

export default VideoCallRoom