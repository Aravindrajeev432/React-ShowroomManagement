import  {useContext, useEffect} from 'react';
import AuthContext from '../../context/AuthContext';


const useWebSocket= ()=>{
    let { socketbaseURL,custuser } =  useContext(AuthContext)
    
    const websocket = new WebSocket(`${socketbaseURL}/ws/user-notifications/${custuser.user_id}`)
useEffect(()=>{
  console.log(custuser.user_id)
    websocket.onopen = ()=>{
        console.log('connectdwesocket')
        console.log(custuser.user_id)
    }
    websocket.onmessage = (event) => {

        
      }
    websocket.onclose=()=>{
      console.log("disconnecting wesocket")
    }

    return () => {
      websocket.close()
    }

     
}, [])
return websocket

}
export default useWebSocket;