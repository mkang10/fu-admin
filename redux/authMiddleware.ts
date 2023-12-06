import { Middleware } from "@reduxjs/toolkit";
import { login, logout } from "./slices/user";

const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === login.type) {
    const user = action.payload.user;
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
  if (action.type === logout.type) {
    localStorage.removeItem("currentUser");
  }

  if (action.type === "@@INIT" || action.type === "@@redux/INIT") {
    const savedUserString = localStorage.getItem("currentUser");
    if (savedUserString) {
      const savedUser = JSON.parse(savedUserString);
      store.dispatch(login(savedUser));
    }
  }

  return next(action);
};

export default authMiddleware;
