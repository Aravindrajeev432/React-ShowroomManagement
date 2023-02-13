import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const Navigate = useNavigate();
  const [loginerr, setLoginerr] = useState(false);
  const usernameref = useRef();
  const passwordref = useRef();
  const [globalloader, setGloballoader] = useState(false);

  // const socketbaseURL = "ws://127.0.0.1:8000";
  const socketbaseURL = "ws://18.222.144.63";
  // const baseUrl = 'http://127.0.0.1:8000/';
  const baseUrl = 'http://18.222.144.63'


  // search for the url its in login function
  

  // loading is true in first time  , false after user loaded the page
  let [loading, setLoading] = useState(true);

  // for staff
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  // for customer
  let [custauthTokens, setCustauthTokens] = useState(() =>
    localStorage.getItem("custauthTokens")
      ? JSON.parse(localStorage.getItem("custauthTokens"))
      : null
  );
  let [custuser, setCustuser] = useState(() =>
    localStorage.getItem("custauthTokens")
      ? jwtDecode(localStorage.getItem("custauthTokens"))
      : null
  );

  async function customerLogin(e) {
    e.preventDefault();
    console.log("in customer login");
    console.log(e.target.username.value);
    console.log(e.target.password.value);
    await axios
      .post("http://18.222.144.63/user/usertest", {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((res) => {
        console.log(res.data);
        setLoginerr(false);

        setCustauthTokens(res.data);
        setCustuser(res.data.access);
        localStorage.setItem("custauthTokens", JSON.stringify(res.data));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Logged",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        setLoginerr(true);
        console.log(err);
      });
  }

  const userLogin = async (e) => {
    e.preventDefault();

    console.log("in userlogin");

    await axios
      .post("http://18.222.144.63/account/api/token/", {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        console.log(response);
        setLoginerr(false);
        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access));
        localStorage.setItem("authTokens", JSON.stringify(response.data));

        if (jwtDecode(response.data.access).role === "MANAGER") {
          Navigate("/manager/dashboard");
        } else if (jwtDecode(response.data.access).role === "FRONT-DESK") {
          Navigate("/front-desk/dashboard");
        } else if (jwtDecode(response.data.access).role === "ADVISOR") {
          Navigate("/advisor/dashboard");
        } else if (jwtDecode(response.data.access).role === "MECHANIC") {
          Navigate("/mechanic/dashboard");
        } else {
          Navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginerr(true);
        usernameref.current.style.borderBottomColor = "red";
        passwordref.current.style.borderBottomColor = "red";

        

        let timeout = setTimeout(alertFunc, 2000);

        function alertFunc() {
          usernameref.current.style.borderBottomColor = "white";
          passwordref.current.style.borderBottomColor = "white";
          setLoginerr(false);
        }
      });
  };

  useEffect(() => {
    if (authTokens) {
      console.log("context useEffect with authTokens");
      setUser(jwtDecode(authTokens.access));
      console.log(jwtDecode(authTokens.access));
    } else if (custauthTokens) {
      setCustuser(jwtDecode(custauthTokens.access));
    } else {
      console.log("context useEffect no auhttoken");
    }
    setLoading(false);
  }, []);

  let logout = () => {
    console.log("loged out");
    setAuthTokens(null);
    setUser(null);
    setCustauthTokens(null);
    setCustuser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("custauthTokens");
    localStorage.removeItem("user_phone");
    Navigate("/");
  };

  let contextData = {
    testuser: true,
    userLogin: userLogin,
    user: user,
    authTokens: authTokens,
    logout: logout,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginerr: loginerr,
    usernameref: usernameref,
    passwordref: passwordref,
    customerLogin: customerLogin,
    setCustauthTokens: setCustauthTokens,
    setCustuser: setCustuser,
    custuser: custuser,
    custauthTokens: custauthTokens,
    socketbaseURL: socketbaseURL,
    baseUrl:baseUrl,
    globalloader: globalloader,
    setGloballoader: setGloballoader,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
