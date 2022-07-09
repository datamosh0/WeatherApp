import statesList from "./statesList.js";
const WEATHER_API_KEY = "e8a21afb07104497692691387984518e";

const enter: HTMLElement = document.querySelector(".enter")!;
const input: HTMLInputElement = document.querySelector(".input")!;
const input2: HTMLInputElement = document.querySelector(".input2")!;

//write data dom elements
const descriptionEl: HTMLElement = document.querySelector(".description")!;
const cityNameEl: HTMLElement = document.querySelector(".cityName")!;
const dateEl: HTMLElement = document.querySelector(".date")!;
const timeEl: HTMLElement = document.querySelector(".time")!;
const temperatureEl: HTMLElement = document.querySelector(".temperature")!;
const detailEl1: HTMLElement = document.querySelector(".detail1")!;
const detailEl2: HTMLElement = document.querySelector(".detail2")!;
const detailEl3: HTMLElement = document.querySelector(".detail3")!;
const detailEl4: HTMLElement = document.querySelector(".detail4")!;
const icon: HTMLImageElement = document.querySelector(".main__icon")!;
const currentDisplayEl: HTMLElement = document.querySelector(".switchDisplay")!;

//generic fetch function
const apiCall = async (url: RequestInfo | URL) => {
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

const formatText = (string: string) => {
  string.toLowerCase();
  let formattedString = string.charAt(0).toUpperCase() + string.slice(1);
  return formattedString;
};

//passes city name and returns latitude and longitude
const getCoordinates = async (cityName: string, stateName: string) => {
  let url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${WEATHER_API_KEY}`;
  console.log(url);
  let apiResults = await apiCall(url);
  let sent = false;

  cityName = formatText(cityName!);
  stateName = formatText(stateName!);

  apiResults.forEach((e: { state: any; lat: any; lon: any }) => {
    if (stateName === e.state) {
      getWeather(e.lat, e.lon);
      sent = true;
    }
  });
  if (!sent) {
    getWeather(apiResults[0].lat, apiResults[0].lon);
  }
};

//handles input event
const inputFunc = () => {
  let cityName: string = input?.value.trim();
  let stateName: string = input2?.value.trim();
  statesList.forEach((e) => {
    let abr = e.abbreviation;
    if (stateName?.toUpperCase() === abr) {
      stateName = e.name.toString();
    }
  });
  getCoordinates(cityName, stateName);
  clearInterval(interval);
};

input?.addEventListener("keyup", function (e) {
  if (e.key === "Enter") inputFunc();
});
input2?.addEventListener("keyup", function (e) {
  if (e.key === "Enter") inputFunc();
});
enter?.addEventListener("click", inputFunc);

//main api call
const getWeather = async (lat: number, lon: number) => {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial&exclude=minutely,hourly`;
  let data = await apiCall(url);
  let description = data.daily[0].weather[0].description;
  const finalDescription = description?.replace(
    /(^\w{1})|(\s+\w{1})/g,
    (letter: string) => letter.toUpperCase()
  );
  let temp: string = data.daily[0].temp.day;
  let feelsLike: string = data.daily[0].feels_like.day;
  let humidity: string = data.daily[0].humidity;
  let chanceOfRain: string = data.daily[0].rain;
  if (!chanceOfRain) chanceOfRain = "0";
  let windSpeed: string = data.daily[0].wind_speed;
  let iconId: string = data.daily[0].weather[0].icon;
  descriptionEl.innerHTML = finalDescription;
  temperatureEl.textContent = temp.toString().split(".")[0] + "°F";
  detailEl1.textContent = feelsLike.toString().split(".")[0] + "°F";
  detailEl2.textContent = humidity + "%";
  detailEl3.textContent = chanceOfRain + "%";
  detailEl4.textContent = windSpeed + "mph";
  icon.src = `dist/icons/${iconId}.png`;

  //pass timezone to recieve local time
  let timezoneVar = data.timezone;
  let wordDay: string = new Date().toLocaleString("en-US", {
    timeZone: `${timezoneVar}`,
    weekday: "long",
  });
  let month: string = new Date().toLocaleString("en-US", {
    timeZone: `${timezoneVar}`,
    month: "short",
  });
  let day: string = new Date().toLocaleString("en-US", {
    timeZone: `${timezoneVar}`,
    day: "numeric",
  });
  let year: string = new Date().toLocaleString("en-US", {
    timeZone: `${timezoneVar}`,
    year: "2-digit",
  });
  let date: string = wordDay + ", " + day + " " + month + " '" + year;
  dateEl.textContent = date;
  updateClock(timezoneVar);

  //display forecast
  for (let i = 1; i < 8; i++) {
    let forecastDay: Date | string = new Date();
    forecastDay.setDate(forecastDay.getDate() + i);
    forecastDay = forecastDay.toString().split(" ")[0];

    let forecastTemp: string = data.daily[i].temp.day;
    let forecastLow: string = data.daily[i].temp.min;
    let forecastIconId: string = data.daily[i].weather[0].icon;

    document.getElementById(`forecast__day${i}`)!.textContent = forecastDay;
    document.getElementById(`forecast__temp${i}`)!.textContent =
      forecastTemp.toString().split(".")[0] + "°F";
    document.getElementById(`forecast__low${i}`)!.textContent =
      forecastLow.toString().split(".")[0] + "°F";
    let icon = document.getElementById(
      `forecast__icon${i}`
    )! as HTMLImageElement;
    icon.src = `dist/icons/${forecastIconId}.png`;
  }

  //seperate api call to get the name of city
  let cityUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`;
  let cityData = await apiCall(cityUrl);
  let cityName: string = cityData.city.name;
  cityNameEl.textContent = cityName;

  currentDisplayEl.id = "F";
  currentDisplayEl.textContent = "Display °C";
};

//raised state clock function
let interval = setInterval(function () {}, 1000);
const updateClock = (timezoneVar: any) => {
  interval = setInterval(() => {
    let adjustedTime = new Date().toLocaleString("en-US", {
      timeZone: `${timezoneVar}`,
    });
    let formattedTime = adjustedTime.toString().split(/\s+/)[1];
    timeEl.textContent = formattedTime;
  }, 1000);
};

//toggle between imperial and metric
function fToC(fahrenheit: number) {
  let fToCel = (fahrenheit - 31.9) / 1.8;
  return fToCel;
}

function cToF(celsius: number) {
  let cToFahr = celsius * 1.8 + 32.6;
  return cToFahr;
}

const switchDisplay = () => {
  let forecast__temp: number;
  let forecast__low: number;

  if (currentDisplayEl.id === "F") {
    let newTemp = fToC(
      parseInt(temperatureEl.textContent!.toString().split("°")[0])
    );
    let newDetail1 = fToC(
      parseInt(detailEl1.textContent!.toString()!.split("°")[0])
    );

    temperatureEl.textContent = newTemp.toString().split(".")[0] + "°C";
    detailEl1.textContent = newDetail1.toString().split(".")[0] + "°C";

    for (let i = 1; i < 8; i++) {
      forecast__temp = fToC(
        parseInt(
          document
            .getElementById(`forecast__temp${i}`)!
            .textContent!.toString()
            .split("°")[0]
        )
      );
      forecast__low = fToC(
        parseInt(
          document
            .getElementById(`forecast__low${i}`)!
            .textContent!.toString()
            .split("°")[0]
        )
      );
      document.getElementById(`forecast__temp${i}`)!.textContent =
        forecast__temp.toString().split(".")[0] + "°C";
      document.getElementById(`forecast__low${i}`)!.textContent =
        forecast__low.toString().split(".")[0] + "°C";
    }
    currentDisplayEl.id = "C";
    currentDisplayEl.textContent = "Display °F";
  } else {
    let newTemp = cToF(
      parseInt(temperatureEl.textContent!.toString().split("°")[0])
    );
    let newDetail1 = cToF(
      parseInt(detailEl1.textContent!.toString().split("°")[0])
    );

    temperatureEl.textContent = newTemp.toString().split(".")[0] + "°C";
    detailEl1.textContent = newDetail1.toString().split(".")[0] + "°C";

    for (let i = 1; i < 8; i++) {
      forecast__temp = cToF(
        parseInt(
          document
            .getElementById(`forecast__temp${i}`)!
            .textContent!.toString()
            .split("°")[0]
        )
      );
      forecast__low = cToF(
        parseInt(
          document
            .getElementById(`forecast__low${i}`)!
            .textContent!.toString()
            .split("°")[0]
        )
      );

      document.getElementById(`forecast__temp${i}`)!.textContent =
        forecast__temp.toString().split(".")[0] + "°C";
      document.getElementById(`forecast__low${i}`)!.textContent =
        forecast__low.toString().split(".")[0] + "°C";
    }
    currentDisplayEl.id = "F";
    currentDisplayEl.textContent = "Display °C";
  }
};
currentDisplayEl.addEventListener("click", switchDisplay);

//get user's location else display seattle's weather
let options = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0,
};
function success(pos: { coords: any }) {
  let crd = pos.coords;
  getWeather(crd.latitude, crd.longitude);
}
function error(err: any) {
  getWeather(47.6062, -122.3321);
}
navigator.geolocation.getCurrentPosition(success, error, options);
