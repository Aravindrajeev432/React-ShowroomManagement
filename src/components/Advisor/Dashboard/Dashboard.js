import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import useAuthAxios from "../../../utils/useAuthAxios";

export default function Dashboard() {
  let { user } = useContext(AuthContext);
  const [onlinedata, setOnlinedata] = useState(false);
  const [dashboard,setDashboard] = useState({})
  let authApi = useAuthAxios();

  useEffect(() => {
    GetOnlineStatus();
    getDashboardData();
  }, []);

  async function GetOnlineStatus() {
    await authApi
      .get(`advisor/makeonline/${user.user_id}`)
      .then((res) => {
        setOnlinedata(res.data.online);
      })
      .catch((err) => {});
  }

  async function MakeOnline(e) {
    console.log(user.user_id);

    await authApi
      .patch(`advisor/makeonline/${user.user_id}`, { online: e.target.checked })
      .then((res) => {
        console.log("check here");
        console.log(res);
        setOnlinedata(res.data.online);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getDashboardData(){
    await authApi.get('advisor/dashboard-data').then((res)=>{
      console.log(res)
      setDashboard(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }


  return (
    <div className="p-2">
  <div className="grid grid-cols-3 gap-x-4">
    <div className=" text-myblue-600 rounded-md p-4 bg-gray-100 border-2 border-myblue-600 shadow-lg"> 
<div className="flex justify-center">
  <span className="text-2xl">Services Done</span>

</div>
<div className="flex justify-center">
<span className="text-5xl">{dashboard.service_done}</span>
</div>
    </div>

    <div className=" text-myblue-600 rounded-md p-4 bg-gray-100 border-2 border-myblue-600 shadow-lg"> 
<div className="flex justify-center">
  <span className="text-2xl">Ongoing Jobs</span>

</div>
<div className="flex justify-center">
<span className="text-5xl">{dashboard.ongoing_jobs}</span>
</div>
    </div>
    <div className=" text-myblue-600 rounded-md p-4 bg-gray-100 border-2 border-myblue-600 shadow-lg"> 
<div className="flex justify-center">
  <span className="text-2xl">Free Bays</span>

</div>
<div className="flex justify-center">
<span className="text-5xl">{dashboard.free_bays}</span>
</div>
    </div>



  </div>
  <div className="p-2">



            <div className="p-2 shadow-lg w-max ">
              <div>
               <h1 className="">Make Me Online</h1> 
              </div>
              <div>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="checkbox"
                  className="sr-only peer"
                  onChange={(e) => {
                    MakeOnline(e);
                  }}
                  checked={onlinedata}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600" />
                <span className="ml-3 text-sm font-medium text-gray-900 ">
                  I' am in
                </span>
              </label>
              </div>

            </div>
            </div>


    </div>
  );
}
