import React from 'react'
import { useParams } from 'react-router-dom'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'

function VideoCallRoom() {
  const {roomId} = useParams()

  const videoChat = async (element)=>{
    const appId = 400802695
    const serverSecret = "c95bc2eff9d4b4ee65a9a5a64659ca5a"
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId ,'12345', "Nazim")
    const zc = ZegoUIKitPrebuilt.create(kitToken)
    zc.joinRoom({
      container: element,
      scenario:{
        mode:ZegoUIKitPrebuilt.OneONoneCall,

      }

    })
  }

  return (
    <div>
        <div ref={videoChat}/>
    </div>
  )
}

export default VideoCallRoom