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
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress color="success" variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 60 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const States = () => {
  const [progress, setProgress] = React.useState(10);
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
    }, 5000);
    return () => clearTimeout(timer);
  }, [count]);

  const onColor = "#1f4ea1";
  const offColor = "#5e6e8a";

  if (loading && data != null) {
    return (
      <div>
        <div className="bg-white rounded shadow-md p-2 h-full">
          <div className="flex align-center justify-center font-bold mb-2 text-lg">
            Valve status
          </div>
          <div className="grid grid-cols-6 gap-1 mb-4">
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
          <div className="grid grid-cols-6 gap-1 mb-4">
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
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel className="h-5" value={progress} />
          </Box>
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

const Mode = () => {
  return (
    <div className="bg-white rounded shadow-md p-3 min-w-min">
      <div className="flex align-center justify-center font-bold mb-2 text-lg">
        Mode
      </div>
      <div className="grid grid-rows-3">
        <Button
          sx={{
            background: "#34eb6b",
            color: "black",
            mt: 3,
            mx: "auto",
          }}
          fullWidth="true"
        >
          Manual
        </Button>
        <Button
          sx={{
            background: "#bff5d1",
            color: "black",
            mt: 3,
            mx: "auto",
          }}
          fullWidth="true"
        >
          AI
        </Button>
        <Button
          sx={{
            background: "#bff5d1",
            color: "black",
            mt: 3,
            mx: "auto",
          }}
          fullWidth="true"
        >
          Scheduled
        </Button>
      </div>
    </div>
  );
};
const Pool = ({ handleFill }) => {
  return (
    <div className="bg-white rounded shadow-md p-3">
      <div className="flex align-center justify-center font-bold mb-2 text-lg">
        Pool
      </div>
      <Button
        sx={{
          background: "#1b97b3",
          color: "black",
          mt: 3,
          mx: "auto",
          minWidth: "5cm",
        }}
        onClick={handleFill}
        fullWidth="true"
      >
        Fill
      </Button>
    </div>
  );
};

const Manual_mode = ({
  handleChangeBleed,
  handleChangePeriod,
  handleStart,
  handleStop,
}) => {
  return (
    <div className="bg-white rounded shadow-md p-3">
      <div className="flex align-center justify-center font-bold mb-2 text-lg">
        Manual
      </div>
      <div className="grid grid-rows-4 p-2">
        <Button
          sx={{
            background: "#34eb6b",
            color: "black",
            mb: 3,
            mx: "auto",
          }}
          onClick={handleStart}
          fullWidth="true"
        >
          Start
        </Button>

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

        <Button
          sx={{
            background: "#b51f2e",
            color: "white",
            mt: 3,
            mx: "auto",
          }}
          onClick={handleStop}
          fullWidth="true"
        >
          Stop
        </Button>
      </div>
    </div>
  );
};

const Dashboard_large = ({
  handleStart,
  handleStop,
  handleChangeBleed,
  handleChangePeriod,
  handleFill,
}) => {
  return (
    <div className="flex flex-grow-1">
      <Mode />
      <Pool handleFill={handleFill} />
      <Manual_mode
        handleStart={handleStart}
        handleStop={handleStop}
        handleChangeBleed={handleChangeBleed}
        handleChangePeriod={handleChangePeriod}
      />
      <States />
    </div>
  );
};

const Dashboard_small = ({
  handleStart,
  handleStop,
  handleChangeBleed,
  handleChangePeriod,
  handleFill,
}) => {
  return (
    <div className="Grid grid-rows-3 gap-2">
      <Mode />
      <Pool handleFill={handleFill} />
      <Manual_mode
        handleStart={handleStart}
        handleStop={handleStop}
        handleChangeBleed={handleChangeBleed}
        handleChangePeriod={handleChangePeriod}
      />
      <States />
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
      {size == "MD" || size == "SM" || size == "XS" ? (
        <Dashboard_small
          handleStart={handleStart}
          handleStop={handleStop}
          handleChangeBleed={handleChangeBleed}
          handleChangePeriod={handleChangePeriod}
          handleFill={handleFill}
        />
      ) : (
        <Dashboard_large
          handleStart={handleStart}
          handleStop={handleStop}
          handleChangeBleed={handleChangeBleed}
          handleChangePeriod={handleChangePeriod}
          handleFill={handleFill}
        />
      )}
    </div>
  );
};
