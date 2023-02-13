import {React, useEffect} from 'react'
import useAuthAxios from '../../../utils/useAuthAxios'
export default function PartUpadatorModal(props){
    let authApi = useAuthAxios()
    

    useEffect(()=>{
        console.log("hello loading")
        authApi.get(`parts/update-part/${props.part_id}`).then((res)=>{console.log(res.data)}).catch((err)=>{
            console.log(err)
        })
    },[])
    return(
        <>
        </>
    )
}