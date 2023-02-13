import React, { useContext} from "react";
import { FaUserAlt, FaBell } from "react-icons/fa";
import Popup from "reactjs-popup";
import { Input, Button } from "@material-tailwind/react";

import Lottie from "react-lottie";
import animationData from "../../lotties/connect.json";
import AuthContext from "../../context/AuthContext";
import CustLogout from "./CustLogout";
function Navbar() {
  let { customerLogin } = useContext(AuthContext);
  let { loginerr } = useContext(AuthContext);
  let { custuser } = useContext(AuthContext);

  const { usernameref } = useContext(AuthContext);
  const { passwordref } = useContext(AuthContext);

  return (
    //   Header
    <>
      <div className="w-full h-16 md:h-20 bg-myblue-500 sticky flex justify-end px-5 navbar">
        <div className="h-full  right-0 flex  ">
          {/* <div className="h-full  grid place-items-center w-64">
            <Input
              className="bg-white text-white"
              color=""
              style={{ background: "white" }}
              label=""
              placeholder="Search"
              icon={<FaSearch />}
            />
          </div> */}

          <div className="h-full grid place-items-center text-white  text-2xl w-14 md:w-16">
            <FaBell className="swing"></FaBell>
          </div>

          {custuser ? (
            <CustLogout />
          ) : (
            <div className="h-full h grid place-items-center text-white text-2xl md:w-16 ">
              <Popup
                trigger={<FaUserAlt className="hover:scale-125 duration-300" />}
                modal
              >
                {(close) => (
                  <div className="  p-4 bg-white w-screen lg:w-[400px] md:w-[400px]" >
                    <div className="w-full flex flex-col justify-center ">
                      <div className="w-full flex justify-end">
                        <button
                          className="close text-2xl w-8 h-8 border  border-white  bg-myblue-500 duration-300 text-white rounded-full flex justify-center items-center hover:text-myblue-500 hover:bg-white hover:border-myblue-500"
                          onClick={close}
                        >
                          &times;
                        </button>
                      </div>
                      <div className="w-full flex justify-center">
                        <span className="text-4xl text-myblue-500">Login</span>
                      </div>
                      <div className="flex justify-center">
                        <AnimationConnect />
                      </div>
                      <form onSubmit={customerLogin}>
                        <div className="w-full flex justify-center my-2">
                          {/* <input type="text" name="username" >

</input> */}

                          <Input
                            variant="standard"
                            label="Username"
                            ref={usernameref}
                            name="username"
                            className="  placeholder-shown:border-blue-gray-200  border-blue-gray-200 focus:border-myblue-500"
                          />
                        </div>
                        <div className="w-full flex justify-center my-2">
                          <Input
                            variant="standard"
                            ref={passwordref}
                            label="Password"
                            type="password"
                            name="password"
                            className="  placeholder-shown:border-blue-gray-200  border-blue-gray-200 focus:border-myblue-500"
                          />
                        </div>
                        <div className="w-full flex justify-center my-2">
                          <Button
                            type="submit"
                            variant="filled"
                            size="md"
                            className=" duration-200 text-white bg-myblue-600 hover:bg-white hover:text-myblue-600 focus:ring-myblue-200 "
                          >
                            Submit
                          </Button>
                        </div>
                      </form>
                      <div className="w-full flex justify-center h-8">
                        {loginerr ? (
                          <span className="text-sm text-red-500">
                            Invalid Username or Password
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;

function AnimationConnect() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  );
}
