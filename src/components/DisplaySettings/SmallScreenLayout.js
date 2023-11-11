import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Irrigation } from "Pages/Irrigation";
import { Water } from "Pages/Water";
import { Power } from "Pages/Power";
import {
  buttonColor,
  layoutColor,
  pageHeading,
  fontType,
} from "components/DisplaySettings/feutures";
import { TopBar } from "components/DisplaySettings/TopBar";

import Cookies from "universal-cookie";

const cookies = new Cookies();

/*This needs to be */
const menuItems = [
  { name: "Irrigation", path: "/irrigation" },
  { name: "Power Usage", path: "/power" },
  { name: "Water Usage", path: "/water" },
];

const SideNavInner = ({ handleClick, jwt }) => {
  return (
    <div className="grid grid-rows-4 gap-2 p-2 mt-5">
      {menuItems.map((item) => (
        <Button
          onClick={handleClick}
          size="large"
          sx={{
            color: buttonColor,
          }}
        >
          <Link to={item.path}>
            <div clasName="text-md font-bold">{item.name}</div>
          </Link>
        </Button>
      ))}
    </div>
  );
};

const SideNavSmall = ({ handleClick, jwt }) => {
  return (
    <>
      <div
        style={{ backgroundColor: layoutColor, minWidth: "300px" }}
        className="rounded shadow-md mt-1"
      >
        <div className="flex align-center justify-center">
          <SideNavInner handleClick={handleClick} jwt={jwt} />
        </div>
      </div>
    </>
  );
};

const ScreenLayoutInner = ({ setJWT }) => {
  return (
    <div
      style={{ backgroundColor: layoutColor, fontFamily: fontType }}
      className="rounded shadow-md w-screen p-2 mt-1 ml-1"
    >
      <Switch>
        <Route path="/irrigation">
          <Irrigation />
        </Route>
        <Route path="/power">
          <Power />
        </Route>
        <Route path="/water">
          <Water />
        </Route>
      </Switch>
    </div>
  );
};

export const SmallScreenLayout = ({
  handleCart,
  handleLogin,
  handleBurger,
  handleClick,
  open,
}) => {
  var JWT_State = false;
  var jwt_avail = cookies.get("Token");
  if (jwt_avail != "") {
    JWT_State = true;
  } else {
    JWT_State = false;
  }
  const [jwt, setJWT] = useState(JWT_State);
  return (
    <div>
      <TopBar
        handleCart={handleCart}
        handleLogin={handleLogin}
        handleBurger={handleBurger}
      />
      {open ? (
        <div style={{ marginTop: "3rem" }}>
          <SideNavSmall handleClick={handleClick} jwt={jwt} />
        </div>
      ) : (
        <ScreenLayoutInner setJWT={setJWT} />
      )}
    </div>
  );
};
