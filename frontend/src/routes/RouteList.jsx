import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../component/PrivateRoute";
import CreateNote from "../pages/createnote/CreateNote";
import Home from "../pages/landingpage/Home";
import Login from "../pages/loginpage/Login";
import MyNotes from "../pages/mynotes/MyNotes";
import Register from "../pages/registerpage/Register";
import UpdateNote from "../pages/updatepage/UpdateNote";
import UserProfile from "../pages/updateprofile/UserProfile";

function RouteList(props) {
  const { search } = props;
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<UserProfile />} />
        </Route>
        <Route path="/mynotes" element={<PrivateRoute />}>
          <Route path="/mynotes" element={<MyNotes search={search} />} />
        </Route>
        <Route path="/createnote" element={<PrivateRoute />}>
          <Route path="/createnote" element={<CreateNote />} />
        </Route>
        <Route path="//mynotes/:id" element={<PrivateRoute />}>
          <Route path="/mynotes/:id" element={<UpdateNote />} />
        </Route>
      </Routes>
    </div>
  );
}

export default RouteList;
