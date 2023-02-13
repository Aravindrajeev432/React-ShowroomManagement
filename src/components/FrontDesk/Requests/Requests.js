import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import useAuthAxios from "../../../utils/useAuthAxios";
import useWebSocket from './useWebSocket'
import {
  Button,
} from "@material-tailwind/react";
function Requests() {
  let authApi = useAuthAxios();
  let websocket = useWebSocket();
  let { setGloballoader } = useContext(AuthContext);

  const [updator,setUpdator] = useState(false)

  const [reqdata, setReqdata] = useState([]);
  const [reqnext, setReqnext] = useState(null);
  const [reqprev, setReqprev] = useState(null);
  const [pagenumber, setPagenumber] = useState(1);

  useEffect(() => {
    console.log("in useffect");
    getdata();

    websocket.onmessage = (event) => {
      getdata();
      console.log("onmessage")
      
      // let data = JSON.parse(event.data);
      // console.log(JSON.parse(data))
      // // setReqdata(reqdata=>[...reqdata,m.message])
      // setNewreqdata(newreqdata=>[...newreqdata,data.message])
    }
    
  }, [pagenumber,updator]);



//  websocket.onopen = ()=>{
//         console.log('connectd')
//     }


  // let con = new WebSocket(`${socketbaseURL}/ws/request-server`);
  // con.onopen = (e)=>{
  //   console.log("connected to channels")
  // }
  // con.onmessage = (e) => {
  //   console.log("on message");
  //   console.log(typeof e.data);
  //   console.log(JSON.parse(e.data));
  //   let m = JSON.parse(e.data);
  //   console.log(m.message);
  //   // setReqdata(reqdata=>[...reqdata,m.message])
  //   setReqdata((reqdatas) => reqdatas.concat(m.message));

  //   // Using .concat(), wrapper function (recommended)
  //   // setSearches(searches => searches.concat(query))
  // };
  // con.onclose = (e) => {
  //   console.log("disconnected");
  // };
  // con.onerror = (e) => {
  //   console.log("error");
  // };
  // setTheArray(oldArray => [...oldArray, newElement]);
  // setTheArray(prevArray => [...prevArray, newValue])



  async function getdata() {
    setGloballoader(true)
    await authApi
      .get(`requests/get_enquires?page=${pagenumber}`)
      .then((res) => {
        console.log(res.data);
        setReqdata(res.data.results);
        setReqnext(res.data.next);
        setReqprev(res.data.previous);
        setGloballoader(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function senddata() {}

  async function MarkCompletde(id, e) {
    console.log(id);
    console.log(e.target.checked);
    if (e.target.checked) {
      await authApi
        .patch(`requests/enquiry/${id}`, {
          status: "completed",
        })
        .then((res) => {
          console.log(res);
          setReqdata((reqdata) =>
            [...reqdata].map((el) =>
              el.id === id ? { ...el, status: res.data.status } : el
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // setReqdata(reqdata =>
      //   [...reqdata].map(el =>
      //       el.id === id ? ({...el, name:'new name'}) : el)
      //   )

      await authApi
        .patch(`requests/enquiry/${id}`, {
          status: "pending",
        })
        .then((res) => {
          console.log(res);
          setReqdata((reqdata) =>
            [...reqdata].map((el) =>
              el.id === id ? { ...el, status: res.data.status } : el
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div>
 
      <div>
        <div>


        </div>
      
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Created
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>


              {reqdata.map((data, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </th>

                    <td className="px-6 py-4">{data.user_phone}</td>
                    <td className="px-6 py-4">{data.created_at}</td>
                    <td className="px-6 py-4">{data.status}</td>
                    <td>
                      <input
                        type="checkbox"
                        name="reqstatusbox"
                        className="checked:bg-myblue-600"
                        value={data.id}
                        onChange={(e) => MarkCompletde(data.id, e)}
                        checked={data.status === "completed" ? true : false}
                      ></input>

                      <label className="mx-2">Mark as completed</label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full my-2 flex justify-end">
        <div>
          <Button
            size="md"
            className="bg-myblue-600 text-white hover:bg-myblue-400 mx-2 "
            onClick={() => {
              setPagenumber(pagenumber - 1);
            }}
            disabled={reqprev ? false : true}
          >
            Previous
          </Button>
          <Button
            size="md"
            className="bg-myblue-600 text-white pointer-events-none"
          >
            {pagenumber}
          </Button>
          <Button
            size="md"
            className="bg-myblue-600 text-white hover:bg-myblue-400 mx-2"
            onClick={() => {
              setPagenumber(pagenumber + 1);
            }}
            disabled={reqnext ? false : true}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Requests;
