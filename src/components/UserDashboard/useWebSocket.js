import  {useContext, useEffect} from 'react';
import AuthContext from '../../context/AuthContext';


const useWebSocket= ()=>{
  let [custusersocket, setCustusersoket] = useState(() =>
    localStorage.getItem("custauthTokens")
      ? jwtDecode(localStorage.getItem("custauthTokens"))
      : null
  );

    let { socketbaseURL,custuser } =  useContext(AuthContext)
    
    const websocket = new WebSocket(`${socketbaseURL}/ws/user-notifications/${custusersocket.user_id}`)
useEffect(()=>{

    websocket.onopen = ()=>{
        console.log('connectdwesocket')
      
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