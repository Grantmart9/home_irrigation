import React, { useEffect, useState } from "react";
import {
  buttonColor,
  layoutColor,
  pageHeading,
} from "components/DisplaySettings/feutures";
import { API_IP } from "components/API/API";
import { Size } from "media-query";
import { Button } from "@mui/material";
import axios from "axios";
import { TextField } from "@material-ui/core";

/*hello*/

export const Irrigation = () => {
  const [bleed, setBleed] = useState(20);
  const [period, setPeriod] = useState(30);

  const handleStart = () => {
    axios
      .post("http://192.168.8.124/app/start", {
        period: period,
        bleed_period: bleed,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChangeBleed = (e) => {
    setBleed(e.target.value);
  };
  const handleChangePeriod = (e) => {
    setPeriod(e.target.value);
  };
  const handleStop = () => {
    axios
      .post("http://192.168.8.124/app/stop")
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
      <div className="grid grid-cols-3">
        <div className="flex align-center justify-center">
          <Button
            sx={{ background: "#34eb6b", color: "black", mt: 3, mx: "auto" }}
            onClick={handleStart}
          >
            Start
          </Button>
        </div>
        <div>
          <TextField
            sx={{ color: buttonColor }}
            onChange={handleChangePeriod}
            sucess
            variant="outlined"
            fullWidth="true"
            id="outlined-error-helper-text"
            label="Period"
          ></TextField>
          <TextField
            sx={{ color: buttonColor }}
            onChange={handleChangeBleed}
            sucess
            variant="outlined"
            fullWidth="true"
            id="outlined-error-helper-text"
            label="Bleed Period"
          ></TextField>
        </div>
        <div className="flex align-center justify-center">
          <Button
            sx={{ background: "#b50909", color: "white", mt: 3, mx: "auto" }}
            onClick={handleStop}
          >
            Stop
          </Button>
        </div>
      </div>
    </div>
  );
};
