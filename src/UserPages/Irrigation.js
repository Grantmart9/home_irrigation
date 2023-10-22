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

const States = () => {
  return (
    <div className="bg-white rounded shadow-md p-2">
      <div className="grid grid-rows-2 gap-2">
        <div className="grid grid-cols-2">
          <div className="flex font-bold align-center justify-center">
            Status
          </div>
          <div className="flex align-center font-bold  justify-center">
            Mode
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex  align-center justify-center">Running</div>
          <div className="flex align-center justify-center">Auto</div>
        </div>
      </div>
    </div>
  );
};

const Pool_fill = ({
  handleFill,
  handleChangePeriod,
  handleChangeBleed,
  handleStop,
}) => {
  return (
    <div className="shadow-md rounded-md p-3">
      <div className="flex align-center justify-center font-bold mb-2 text-lg">
        Pool Fill
      </div>
      <div className="grid grid-cols-3">
        <div className="flex align-center justify-center">
          <Button
            sx={{ background: "#34eb6b", color: "black", mt: 3, mx: "auto" }}
            onClick={handleFill}
          >
            Fill
          </Button>
        </div>
        <div className="grid grid-rows-2 gap-3">
          <TextField
            sx={{ color: buttonColor }}
            onChange={handleChangePeriod}
            sucess
            variant="outlined"
            fullWidth="true"
            id="outlined-error-helper-text"
            label="Period"
          />
          <TextField
            sx={{ color: buttonColor }}
            onChange={handleChangeBleed}
            sucess
            variant="outlined"
            fullWidth="true"
            id="outlined-error-helper-text"
            label="Bleed Period"
          />
        </div>
        <div className="flex align-center justify-center">
          <Button
            sx={{ background: "#b50909", color: "white", mt: 3, mx: "auto" }}
            onClick={handleStop}
          >
            Stop Fill
          </Button>
        </div>
      </div>
    </div>
  );
};

const Manual = ({
  handleChangeBleed,
  handleChangePeriod,
  handleStart,
  handleStop,
}) => {
  return (
    <div className="shadow-md rounded-md p-3">
      <div className="flex align-center justify-center font-bold mb-2 text-lg">
        Manual Control
      </div>
      <div className="grid grid-cols-3">
        <div className="flex align-center justify-center">
          <Button
            sx={{ background: "#34eb6b", color: "black", mt: 3, mx: "auto" }}
            onClick={handleStart}
          >
            Start
          </Button>
        </div>
        <div className="grid grid-rows-2 gap-3">
          <TextField
            sx={{ color: buttonColor }}
            onChange={handleChangePeriod}
            sucess
            variant="outlined"
            fullWidth="true"
            id="outlined-error-helper-text"
            label="Period"
          />
          <TextField
            sx={{ color: buttonColor }}
            onChange={handleChangeBleed}
            sucess
            variant="outlined"
            fullWidth="true"
            id="outlined-error-helper-text"
            label="Bleed Period"
          />
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

const Auto = () => {
  return (
    <div className="shadow-md rounded-md p-3">
      <div className="flex align-center justify-center font-bold mb-2 text-lg">
        AI Control
      </div>
      <div className="flex align-center justify-center">
        Next Start time: 2023-10-22 16:23:01
      </div>
    </div>
  );
};

const Schedule = ({
  handleChangeBleed,
  handleChangePeriod,
  handleStart,
  handleStop,
}) => {
  const day = [
    "monday",
    "tuesday",
    "wednsday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const start_times = [
    {
      day: "monday",
      start_times: ["20:23", "20:23", "23:34"],
    },
    {
      day: "tuesday",
      start_times: ["20:23", "20:23", "23:34"],
    },
    {
      day: "wednsday",
      start_times: ["20:23", "20:23", "23:34"],
    },
    {
      day: "thursday",
      start_times: ["20:23", "20:23", "23:34"],
    },
    {
      day: "friday",
      start_times: ["20:23", "20:23", "23:34"],
    },
    {
      day: "saturday",
      start_times: ["20:23", "20:23", "23:34"],
    },
    {
      day: "sunday",
      start_times: ["20:23", "20:23", "23:34"],
    },
  ];
  return (
    <div className="shadow-md rounded-md p-3">
      <div className="flex align-center justify-center font-bold mb-2 text-lg">
        Scheduled Control
      </div>
      <div className="grid grid-cols-7">
        {start_times.map((today, i) => (
          <div>
            <div key={i} className="flex align-center justify-center">
              <Button
                sx={{
                  background: "#34eb6b",
                  color: "black",
                  mt: 3,
                  mx: "auto",
                }}
              >
                {today.day}
              </Button>
            </div>
            <div className="grid grid-rows-1 gap-1">
              {today.start_times.map((starts, i) => (
                <div key={i}>
                  <div className="flex align-center justify-center p-2">
                    <TextField
                      sx={{ color: buttonColor }}
                      value={starts}
                      variant = "outlined"
                      fullWidth="false"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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

  const handleFill = () => {
    axios
      .post("http://192.168.8.124/app/fill_pool", {
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
      <States />
      <Pool_fill
        handleFill={handleFill}
        handleChangeBleed={handleChangeBleed}
        handleChangePeriod={handleChangePeriod}
        handleStop={handleStop}
      />
      <Manual
        handleChangeBleed={handleChangeBleed}
        handleChangePeriod={handleChangePeriod}
        handleStart={handleStart}
        handleStop={handleStop}
      />
      <Schedule />
      <Auto />
    </div>
  );
};
