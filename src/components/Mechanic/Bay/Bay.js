import React, { useContext, useEffect, useState } from "react";
import useAuthAxios from "../../../utils/useAuthAxios";
import { Button } from "@material-tailwind/react";
import AuthContext from "../../../context/AuthContext";

function Bay() {


  const [bays, setBays] = useState([]);
  let authApi = useAuthAxios();
    let {user} = useContext(AuthContext)
  useEffect(() => {
    getBays();
  }, []);

  async function getBays() {
    await authApi
      .get("mechanic/getbays")
      .then((res) => {
        console.log(res);
        setBays(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

//   {"id":2,"bay":[{"id":2,"current_job":{"id":2,"user":{"username":"aswanthanu"},
//   "car":{"model_name":"ALTO","model_year":"2022"},"advisor":{"username":"advisor1"},
//   "created_at":"2023-01-23T02:29:20.269407+05:30","status":"in-bay","finished_at":null,
//   "is_deleted":false},"bay":2,"mechanic_1":14,"mechanic_2":null}],"attendable":true,
//   "bay_number":2,"status":"busy","mechanic_1":null}





async function Bayjoin(e){
    e.preventDefault()
console.log(user.user_id)
console.log(e.target.bay_id.value)

await authApi.patch(`mechanic/join-bay/${e.target.bay_id.value}`,{
    "mechanic_1":user.user_id
}).then((res)=>{
    getBays();

}).catch()
}

async function BayExit(e){
    e.preventDefault()
console.log(user.user_id)
console.log(e.target.bay_id.value)

await authApi.patch(`mechanic/join-bay/${e.target.bay_id.value}`,{
    "mechanic_1":null
}).then((res)=>{
    getBays();

}).catch()
}






  return (
    <div className="p-4">
        <div className="w-full my-4 after:content-['']  after:block after:bottom-0 after:rounded-lg after:mt-2 after:w-full after:h-[2px] after:bg-gray-300">
            <span className="text-gray-400 text-5xl">Bay...</span>
        </div>
      <div>
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-4">
          {bays.map((data, index) => {
            return (
              <div
                key={index}
                className={`${data.status==='free'?'bg-green-200':'bg-red-200'} rounded-md shadow-lg`}
              >
                <div className="w-full p-2" >
                  <div className="w-full flex justify-center">
                    <div className="bg-white rounded-full w-12 h-12 grid place-items-center">
                      <span className="text-2xl ">{data.bay_number}</span>
                    </div>
               
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex justify-center">Status:
                        </div>
                        <div className="flex justify-center">
                        <span>{data.status}</span>
                            </div>
                   
                  </div>
                  <div>
                    {data.related_bay.map((data, index) => {
                      return (
                        <div key={index}>
                          <div>Car : {data.current_job.car.model_name}</div>
                         
                          <div>Advisor : {data.current_job.advisor.username}</div>

                          <div>
                          <div>    
                            </div>
                           
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-center py-2 "> 
              <form onSubmit={Bayjoin}>
                        <input name='bay_id' type='hidden' defaultValue={data.id}/>
                        
              {data.attendable ?     <Button type='submit' className="bg-myblue-600">Join</Button> :''}
              </form>
<form onSubmit={BayExit}>
<input name='bay_id' type='hidden' defaultValue={data.id}/>
{data.is_attending ? <Button type='submit' className="bg-myblue-600">Exit</Button> :''}
</form>
                   
              
                
                    </div>
                </div>
              </div>
            );
          })}
          
        </div>
      </div>
    </div>
  );
}

export default Bay;
