import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "context/AuthContext";
import ToolbarComponent from "components/shared/menuBar/toolbar";
import DrawerComponent from "components/shared/menuBar/drawer";
import { fetchUserDetail } from "apiRequests/user";

const Nav = () => {
  const [left, setLeft] = useState(false);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      fetchUserDetail(dispatch);
    }
  }, []);

  const toggleDrawer = () => {
    setLeft(false);
  };

  const openDrawer = () => {
    setLeft(true);
  };

  return (
    <div className="App">
      <ToolbarComponent openDrawerHandler={openDrawer} />
      <DrawerComponent left={left} toggleDrawerHandler={toggleDrawer} />
    </div>
  );
};
export default Nav;
