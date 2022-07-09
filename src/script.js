"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
export const __esModule = true;
import statesList_js_1 from "./statesList.js";
var WEATHER_API_KEY = "e8a21afb07104497692691387984518e";
var enter = document.querySelector(".enter");
var input = document.querySelector(".input");
var input2 = document.querySelector(".input2");
//write data dom elements
var descriptionEl = document.querySelector(".description");
var cityNameEl = document.querySelector(".cityName");
var dateEl = document.querySelector(".date");
var timeEl = document.querySelector(".time");
var temperatureEl = document.querySelector(".temperature");
var detailEl1 = document.querySelector(".detail1");
var detailEl2 = document.querySelector(".detail2");
var detailEl3 = document.querySelector(".detail3");
var detailEl4 = document.querySelector(".detail4");
var icon = document.querySelector(".main__icon");
var currentDisplayEl = document.querySelector(".switchDisplay");
//generic fetch function
var apiCall = function (url) {
  return __awaiter(void 0, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, fetch(url)];
        case 1:
          response = _a.sent();
          return [4 /*yield*/, response.json()];
        case 2:
          data = _a.sent();
          return [2 /*return*/, data];
      }
    });
  });
};
var formatText = function (string) {
  string.toLowerCase();
  var formattedString = string.charAt(0).toUpperCase() + string.slice(1);
  return formattedString;
};
//passes city name and returns latitude and longitude
var getCoordinates = function (cityName, stateName) {
  return __awaiter(void 0, void 0, void 0, function () {
    var url, apiResults, sent;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          url = "https://api.openweathermap.org/geo/1.0/direct?q="
            .concat(cityName, "&limit=5&appid=")
            .concat(WEATHER_API_KEY);
          console.log(url);
          return [4 /*yield*/, apiCall(url)];
        case 1:
          apiResults = _a.sent();
          sent = false;
          cityName = formatText(cityName);
          stateName = formatText(stateName);
          apiResults.forEach(function (e) {
            if (stateName === e.state) {
              getWeather(e.lat, e.lon);
              sent = true;
            }
          });
          if (!sent) {
            getWeather(apiResults[0].lat, apiResults[0].lon);
          }
          return [2 /*return*/];
      }
    });
  });
};
//handles input event
var inputFunc = function () {
  var cityName =
    input === null || input === void 0 ? void 0 : input.value.trim();
  var stateName =
    input2 === null || input2 === void 0 ? void 0 : input2.value.trim();
  statesList_js_1["default"].forEach(function (e) {
    var abr = e.abbreviation;
    if (
      (stateName === null || stateName === void 0
        ? void 0
        : stateName.toUpperCase()) === abr
    ) {
      stateName = e.name.toString();
    }
  });
  getCoordinates(cityName, stateName);
  clearInterval(interval);
};
input === null || input === void 0
  ? void 0
  : input.addEventListener("keyup", function (e) {
      if (e.key === "Enter") inputFunc();
    });
input2 === null || input2 === void 0
  ? void 0
  : input2.addEventListener("keyup", function (e) {
      if (e.key === "Enter") inputFunc();
    });
enter === null || enter === void 0
  ? void 0
  : enter.addEventListener("click", inputFunc);
//main api call
var getWeather = function (lat, lon) {
  return __awaiter(void 0, void 0, void 0, function () {
    var url,
      data,
      description,
      finalDescription,
      temp,
      feelsLike,
      humidity,
      chanceOfRain,
      windSpeed,
      iconId,
      timezoneVar,
      wordDay,
      month,
      day,
      year,
      date,
      i,
      forecastDay,
      forecastTemp,
      forecastLow,
      forecastIconId,
      icon_1,
      cityUrl,
      cityData,
      cityName;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          url = "https://api.openweathermap.org/data/2.5/onecall?lat="
            .concat(lat, "&lon=")
            .concat(lon, "&appid=")
            .concat(WEATHER_API_KEY, "&units=imperial&exclude=minutely,hourly");
          return [4 /*yield*/, apiCall(url)];
        case 1:
          data = _a.sent();
          description = data.daily[0].weather[0].description;
          finalDescription =
            description === null || description === void 0
              ? void 0
              : description.replace(/(^\w{1})|(\s+\w{1})/g, function (letter) {
                  return letter.toUpperCase();
                });
          temp = data.daily[0].temp.day;
          feelsLike = data.daily[0].feels_like.day;
          humidity = data.daily[0].humidity;
          chanceOfRain = data.daily[0].rain;
          if (!chanceOfRain) chanceOfRain = "0";
          windSpeed = data.daily[0].wind_speed;
          iconId = data.daily[0].weather[0].icon;
          descriptionEl.innerHTML = finalDescription;
          temperatureEl.textContent = temp.toString().split(".")[0] + "°F";
          detailEl1.textContent = feelsLike.toString().split(".")[0] + "°F";
          detailEl2.textContent = humidity + "%";
          detailEl3.textContent = chanceOfRain + "%";
          detailEl4.textContent = windSpeed + "mph";
          icon.src = "dist/icons/".concat(iconId, ".png");
          timezoneVar = data.timezone;
          wordDay = new Date().toLocaleString("en-US", {
            timeZone: "".concat(timezoneVar),
            weekday: "long",
          });
          month = new Date().toLocaleString("en-US", {
            timeZone: "".concat(timezoneVar),
            month: "short",
          });
          day = new Date().toLocaleString("en-US", {
            timeZone: "".concat(timezoneVar),
            day: "numeric",
          });
          year = new Date().toLocaleString("en-US", {
            timeZone: "".concat(timezoneVar),
            year: "2-digit",
          });
          date = wordDay + ", " + day + " " + month + " '" + year;
          dateEl.textContent = date;
          updateClock(timezoneVar);
          //display forecast
          for (i = 1; i < 8; i++) {
            forecastDay = new Date();
            forecastDay.setDate(forecastDay.getDate() + i);
            forecastDay = forecastDay.toString().split(" ")[0];
            forecastTemp = data.daily[i].temp.day;
            forecastLow = data.daily[i].temp.min;
            forecastIconId = data.daily[i].weather[0].icon;
            document.getElementById("forecast__day".concat(i)).textContent =
              forecastDay;
            document.getElementById("forecast__temp".concat(i)).textContent =
              forecastTemp.toString().split(".")[0] + "°F";
            document.getElementById("forecast__low".concat(i)).textContent =
              forecastLow.toString().split(".")[0] + "°F";
            icon_1 = document.getElementById("forecast__icon".concat(i));
            icon_1.src = "dist/icons/".concat(forecastIconId, ".png");
          }
          cityUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="
            .concat(lat, "&lon=")
            .concat(lon, "&appid=")
            .concat(WEATHER_API_KEY, "&units=imperial");
          return [4 /*yield*/, apiCall(cityUrl)];
        case 2:
          cityData = _a.sent();
          cityName = cityData.city.name;
          cityNameEl.textContent = cityName;
          currentDisplayEl.id = "F";
          currentDisplayEl.textContent = "Display °C";
          return [2 /*return*/];
      }
    });
  });
};
//raised state clock function
var interval = setInterval(function () {}, 1000);
var updateClock = function (timezoneVar) {
  interval = setInterval(function () {
    var adjustedTime = new Date().toLocaleString("en-US", {
      timeZone: "".concat(timezoneVar),
    });
    var formattedTime = adjustedTime.toString().split(/\s+/)[1];
    timeEl.textContent = formattedTime;
  }, 1000);
};
//toggle between imperial and metric
function fToC(fahrenheit) {
  var fToCel = (fahrenheit - 31.9) / 1.8;
  return fToCel;
}
function cToF(celsius) {
  var cToFahr = celsius * 1.8 + 32.6;
  return cToFahr;
}
var switchDisplay = function () {
  var forecast__temp;
  var forecast__low;
  if (currentDisplayEl.id === "F") {
    var newTemp = fToC(
      parseInt(temperatureEl.textContent.toString().split("°")[0])
    );
    var newDetail1 = fToC(
      parseInt(detailEl1.textContent.toString().split("°")[0])
    );
    temperatureEl.textContent = newTemp.toString().split(".")[0] + "°C";
    detailEl1.textContent = newDetail1.toString().split(".")[0] + "°C";
    for (var i = 1; i < 8; i++) {
      forecast__temp = fToC(
        parseInt(
          document
            .getElementById("forecast__temp".concat(i))
            .textContent.toString()
            .split("°")[0]
        )
      );
      forecast__low = fToC(
        parseInt(
          document
            .getElementById("forecast__low".concat(i))
            .textContent.toString()
            .split("°")[0]
        )
      );
      document.getElementById("forecast__temp".concat(i)).textContent =
        forecast__temp.toString().split(".")[0] + "°C";
      document.getElementById("forecast__low".concat(i)).textContent =
        forecast__low.toString().split(".")[0] + "°C";
    }
    currentDisplayEl.id = "C";
    currentDisplayEl.textContent = "Display °F";
  } else {
    var newTemp = cToF(
      parseInt(temperatureEl.textContent.toString().split("°")[0])
    );
    var newDetail1 = cToF(
      parseInt(detailEl1.textContent.toString().split("°")[0])
    );
    temperatureEl.textContent = newTemp.toString().split(".")[0] + "°C";
    detailEl1.textContent = newDetail1.toString().split(".")[0] + "°C";
    for (var i = 1; i < 8; i++) {
      forecast__temp = cToF(
        parseInt(
          document
            .getElementById("forecast__temp".concat(i))
            .textContent.toString()
            .split("°")[0]
        )
      );
      forecast__low = cToF(
        parseInt(
          document
            .getElementById("forecast__low".concat(i))
            .textContent.toString()
            .split("°")[0]
        )
      );
      document.getElementById("forecast__temp".concat(i)).textContent =
        forecast__temp.toString().split(".")[0] + "°C";
      document.getElementById("forecast__low".concat(i)).textContent =
        forecast__low.toString().split(".")[0] + "°C";
    }
    currentDisplayEl.id = "F";
    currentDisplayEl.textContent = "Display °C";
  }
};
currentDisplayEl.addEventListener("click", switchDisplay);
//get user's location else display seattle's weather
var options = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0,
};
function success(pos) {
  var crd = pos.coords;
  getWeather(crd.latitude, crd.longitude);
}
function error(err) {
  getWeather(47.6062, -122.3321);
}
navigator.geolocation.getCurrentPosition(success, error, options);
