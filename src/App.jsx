import axios from "axios";
import "./App.css";
import "./styles.scss";
import React, { useEffect, useState } from "react";
import Iconvisibility from "../src/icons/visibility.png";
import Iconwind from "../src/icons/wind.png";
import Iconhumidity from "../src/icons/humidity.png";
import Iconfeel from "../src/icons/feels.png";

// import {
//   IoMdSunny,
//   IoMdRainy,
//   IoMdCloudy,
//   IoMdSnow,
//   IoMdThunderstorm,
//   IoMdSearch,
// } from "react-icons/io";

// import {
//   BsCloudHaze2Fill,
//   BsCloudDrizzleFill,
//   BsEye,
//   BsWater,
//   BsThermometer,
//   BsWind,
// } from "react-icons/bs";

// import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

function App() {
  const [datas, setDatas] = useState(null);
  const [location, setLocation] = useState("Ha Noi");
  const [inputData, setInputData] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // icon openweather
  const iconUrl = "https://openweathermap.org/img/wn/";

  useEffect(() => {
    const ApiKey = "86168b944d06402d6f17376d766b21b3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang={vi}&appid=${ApiKey}`;

    setLoading(true);

    axios
      .get(url)
      .then((res) => {
        // set the data after 1500 ms
        setTimeout(() => {
          setDatas(res.data);
          // set loading to false
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  });

  if (!datas) {
    return (
      <div className="weather-container">
        <ImSpinner8 className="text-5xl animate-spin text-white" />
      </div>
    );
  }

  const handleChangeInput = (e) => {
    setInputData(e.target.value);
  };

  const handleSearch = (e) => {
    if (inputData !== "") {
      setLocation(inputData);
    }

    const input = document.querySelector("input");
    if (input.value === "") {
      setAnimate(true);
    }

    setTimeout(() => {
      setAnimate(false);
    }, 500);

    input.value = "";
    e.preventDefault();
  };

  const date = new Date();

  return (
    <div className="weather w-full h-screen ">
      <form>
        {errorMsg && (
          <div className={` ${errorMsg ? 'active-err' : 'error'} error w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff2032] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md`}>
            {`${errorMsg.response.data.message}`}
          </div>
        )}



        <div className={` ${animate ? "animate-shake" : "animate-none"}  `}>
          <div className="weather-wrapper">
            <div className="search-cityname">
              <input
                type="text"
                placeholder="Enter your content"
                className="search w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                onChange={(e) => handleChangeInput(e)}
              />
              <button
                className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <div className="weather-content">
              <div className="weather-main">
                {loading ? (
                  <div className="loading">
                    <ImSpinner8 className="text-5xl animate-spin text-white" />
                  </div>
                ) : (
                  <div>
                    <div className="weather-top">
                      <div className="weather-top__image">
                        <img
                          alt="#!"
                          src={`${iconUrl}${datas.weather[0].icon}.png`}
                          className="weather-top__icons"
                        />
                      </div>
                      <div>
                        <h3 className="weather-top__cityname">
                          {datas.name},{datas.sys.country}
                        </h3>
                        <span className="weather-top__date">
                          {date.getUTCDate()}/{date.getUTCMonth()}/
                          {date.getUTCFullYear()}
                        </span>
                      </div>
                    </div>
                    <div className="weather-between">
                      <h1 className="weather-between__temperature">18°C</h1>
                      <p className="weather-between__status">
                        {datas.weather[0].main}
                      </p>
                    </div>
                    <div className="weather-bottom">
                      <div className="weather-bottom__main">
                        <div className="weather-bottom__box">
                          <img alt="#!" src={Iconvisibility} />
                          <div className="weather-bottom__text">
                            visibility
                            <span className="weather-bottom__name">10km</span>
                          </div>
                        </div>
                        <div className="weather-bottom__box">
                          <img alt="#!" src={Iconwind} />
                          <div className="weather-bottom__text">
                            Wind
                            <span className="weather-bottom__name">2.8m/s</span>
                          </div>
                        </div>
                        <div className="weather-bottom__box">
                          <img alt="#!" src={Iconhumidity} />
                          <div className="weather-bottom__text">
                            humidity
                            <span className="weather-bottom__name">
                              {datas.main.humidity}%
                            </span>
                          </div>
                        </div>
                        <div className="weather-bottom__box">
                          <img alt="#!" src={Iconfeel} />
                          <div className="weather-bottom__text">
                            fells like
                            <span className="weather-bottom__name">
                              {datas.main.feels_like}°C
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;

// <ImSpinner8 className="text-5xl animate-spin text-white" />
