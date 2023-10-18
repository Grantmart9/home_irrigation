import React, { useEffect } from "react";
import {
  buttonColor,
  layoutColor,
  pageHeading,
} from "components/DisplaySettings/feutures";
import { API_IP } from "components/API/API";
import { Size } from "media-query";
import { Button } from "@mui/material";
import axios from "axios";

/*hello*/

export const Irrigation = () => {
  const handleStart = () => {
    axios
      .get("http://192.168.8.124/app/start")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleStop = () => {
    axios
      .get("http://192.168.8.124/app/stop")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const size = Size();
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  /*size == "MD" || size == "SM" || size == "XS"*/
  return (
    <div>
      {size == "MD" || size == "SM" || size == "XS" ? (
        <div
          style={{ color: pageHeading, marginTop: "15%" }}
          className="text-xl flex align-center justify-center mb-2 p-2 w-full"
        >
          Irrigation
        </div>
      ) : (
        <div
          style={{ color: pageHeading, marginTop: "1pt" }}
          className="text-xl flex align-center justify-center mb-2 p-2 w-full"
        >
          Irrigation
        </div>
      )}
      <div className="grid grid-cols-2">
        <div className="flex align-center justify-center">
          <Button
            sx={{ background: "#34eb6b",color:"black", mt: 3, mx: "auto" }}
            onClick={handleStart}
          >
            Start
          </Button>
        </div>
        <div className="flex align-center justify-center">
          <Button
            sx={{ background: "#b50909",color:"white", mt: 3, mx: "auto" }}
            onClick={handleStop}
          >
            Stop
          </Button>
        </div>
      </div>
    </div>
  );
};
