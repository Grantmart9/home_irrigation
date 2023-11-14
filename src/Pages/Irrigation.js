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
import Loading from "images/loading.gif";
import { TextField } from "@material-ui/core";

const States = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    /* window.scrollTo({ top: 0, left: 0, behavior: "smooth" });*/
    axios
      .get("http://100.78.84.143/app/valves", {})
      .then(function (response) {
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        setError("Request Error !!!");
        setLoading(false);
        setError(error.message);
      });
    const timer = setTimeout(() => {
      const counter = count + 1;
      setCount(counter);
    }, 10000);
    return () => clearTimeout(timer);
  }, [count]);

  const onColor = "#1f4ea1";
  const offColor = "#5e6e8a";

  if (loading && data != null) {
    return (
      <div>
        <div className="bg-white rounded shadow-md p-2">
          <div className="flex align-center justify-center font-bold mb-2 text-lg">
            Valve status
          </div>
          <div className="flex align-center justify-center">
            <img width={100} height={100} src={Loading} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {data != null ? (
        <div className="bg-white rounded shadow-md p-2">
          <div className="flex align-center justify-center font-bold mb-2 text-lg">
            Valve status
          </div>
          <div className="grid grid-cols-6 mb-4">
            {data.valve_status.map((object, i) => (
              <div className="flex align-center justify-center" key={i}>
                {object.state ? (
                  <Button
                    sx={{
                      background: onColor,
                      color: "white",
                      mt: 3,
                      mx: "auto",
                    }}
                  >
                    {object.valve}
                  </Button>
                ) : (
                  <Button
                    sx={{
                      background: offColor,
                      color: "white",
                      mt: 3,
                      mx: "auto",
                    }}
                  >
                    {object.valve}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

const Pool_fill = ({
  handleFill,
  handleChangePeriod,
  handleChangeBleed,
  handleStop,
}) => {
  return (
    <div className="shadow-md rounded-md p-5">
      <div className="flex align-center justify-center font-bold mb-2 text-lg">
        Pool Fill
      </div>
      <div className="grid grid-cols-3">
        <Button
          sx={{ background: "#34eb6b", color: "black", marginRight: "2rem" }}
          onClick={handleFill}
        >
          Fill
        </Button>
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
        <Button
          sx={{ background: "#b50909", color: "white", marginLeft: "2rem" }}
          onClick={handleStop}
        >
          Stop Fill
        </Button>
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
    <div className="shadow-md rounded-md p-5">
      <div className="flex align-center justify-center font-bold mb-2 text-lg">
        Manual Control
      </div>
      <div className="grid grid-cols-3">
        <Button
          sx={{ background: "#34eb6b", color: "black", marginRight: "2rem" }}
          onClick={handleStart}
        >
          Start
        </Button>
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
        <Button
          sx={{ background: "#b50909", color: "white", marginLeft: "2rem" }}
          onClick={handleStop}
        >
          Stop
        </Button>
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
  size,
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
      {size == "MD" || size == "SM" || size == "XS" ? (
        <div className="grid grid-rows-7">
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
                        value={i + 1}
                        variant="outlined"
                        fullWidth="false"
                      />
                      <TextField
                        sx={{ color: buttonColor }}
                        value={starts}
                        variant="outlined"
                        fullWidth="false"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
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
                    <div className="grid grid-cols-2 gap-1 p-2">
                      <TextField
                        sx={{ color: buttonColor }}
                        value={i + 1}
                        variant="outlined"
                        fullWidth="false"
                      />
                      <TextField
                        sx={{ color: buttonColor }}
                        value={starts}
                        variant="outlined"
                        fullWidth="false"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Irrigation = () => {
  const [bleed, setBleed] = useState(20);
  const [period, setPeriod] = useState(30);

  const handleStart = () => {
    axios
      .post("http://100.78.84.143/app/start", {
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
      .post("http://100.78.84.143/app/fill_pool", {
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
      .post("http://100.78.84.143/app/stop")
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
      {size == "MD" || size == "SM" || size == "XS" ? (
        <div className="grid grid-rows-2 gap-1">
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
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-1">
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
        </div>
      )}
      <Schedule size={size} />
      <Auto />
    </div>
  );
};
