import jwt_decode from "jwt-decode";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user,dispatch,seterror) =>{
  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(data => {
    if (data.ok === true) {
      const token = data.token;
      localStorage.setItem("jwt", token);
      const decoded = jwt_decode(token);
      seterror("")
      dispatch(setCurrentUser(decoded));
    } else {
      seterror(data.err.message)
      logoutUser(dispatch);
    }
  })
  .catch(err => {
    console.log("error")
    logoutUser(dispatch);
  });
    console.log("hola")
};

export const setCurrentUser = decoded => {//si se loguea , setear datos del usuario
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = (dispatch) => {//logout
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
  dispatch(setCurrentUser({}));
};
