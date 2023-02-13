import  {useContext, useEffect} from 'react';
import AuthContext from '../../../context/AuthContext';

const useWebSocket= ()=>{
    let { socketbaseURL } =  useContext(AuthContext)
    const websocket = new WebSocket(`${socketbaseURL}/ws/request-server`)
useEffect(()=>{
    
    websocket.onopen = ()=>{
        console.log('connectd')
    }
    // websocket.onmessage = (event) => {

    //     console.log("onmessage")
    //     const data = JSON.parse(event.data);
    //   }
    websocket.onclose=()=>{
      console.log("disconnecting ")
    }

    return () => {
      websocket.close()
    }

     
}, [])
return websocket

}
export default useWebSocket;