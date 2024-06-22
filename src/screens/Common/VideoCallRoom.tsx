import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

function VideoCallRoom() {
  const { roomId } = useParams()
  const { userInfo, providerInfo } = useSelector((state: RootState) => state.auth)

  const videoChat = async (element) => {
    const appId = 400802695
    const serverSecret = "c95bc2eff9d4b4ee65a9a5a64659ca5a"
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId, userInfo ? userInfo.id : providerInfo.id, userInfo ? userInfo.name : providerInfo.name)
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
      <div ref={videoChat} />
    </div>
  )
}

export default VideoCallRoom