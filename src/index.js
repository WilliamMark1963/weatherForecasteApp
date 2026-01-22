const APIKEY = "645b50b9b25fe1deb25f898fe95561a4"
let filteredFiveDays = null;
//Fetching Body element
let body = document.body;
let heading = document.querySelector("#heading")
// Getting form Elements
const city = document.querySelector("#cityName")
const submitBtn = document.querySelector("#submit")
const searchList = document.querySelector("#searchList")

console.log(searchList);

// Getting card Elements
let parentCard = document.querySelector("#mainCard")
let bottomParentCard= document.querySelector("#parentCard")

// Getting PopUpElements
const popup = document.getElementById("popup");
const closePopupBtn = document.getElementById("closePopup");
const errHeading = document.getElementById("errheading");
const errMsg = document.getElementById("errMsg");



// Show popup
const showPopUp = function (title, message) {
        errHeading.textContent = title;
  errMsg.textContent = message;
  popup.classList.add("popUp-show")
}

// Hide popUp
const hidePopUp= function () {
  popup.classList.remove("popUp-show");
}

// closing popUp
closePopupBtn.addEventListener("click", hidePopUp);

// form validation with regExp
const validate= (str)=>/^[A-Za-z ]+$/.test(str)

const getStorage = function(){
                return JSON.parse(localStorage.getItem("searchData")) || [];
}

// Filtering Data That I want
const filterData = function(rawData){
        newData=[]
        for(let i =0;i<rawData.length;i++){
               let obj= {
                                        icon: rawData[i].weather[0].icon,
                                        date: (rawData[i].dt_txt.split(" ")[0]),
                                        temp: rawData[i].main.temp,
                                        weather: rawData[i].weather[0].main,
                                        humidity: rawData[i].main.humidity,
                                        wind: rawData[i].wind.speed
                                  }
                newData.push(obj)
        }
        return newData;
}

const weatherClasses = ["sunny", "cloudy", "rainy", "snow"];
const weatherToClass = {
  Clear: "sunny",
  Clouds: "cloudy",
  Rain: "rainy",
  Drizzle: "rainy",
  Thunderstorm: "rainy",
  Snow: "snow"
};

// Update Backgorund
const updateBackground = (weather) => {
  body.classList.remove(...weatherClasses);

  const appliedClass = weatherToClass[weather] || "cloudy";
  body.classList.add(appliedClass);

  // Heading contrast control
  heading.classList.remove("text-white", "text-black");
  if (appliedClass === "sunny" || appliedClass === "snow") {
    heading.classList.add("text-black");
  } else {
    heading.classList.add("text-white");
  }
};

// Displaying small card
const addCards = function(rawCity,data){
        bottomParentCard.innerHTML=" ";
        for(let i=0;i<data.length; i++)
        {
                let ele = `
                        <div class="card-base">
                        <!-- Icon -->
                        <div class="flex justify-center mb-2">
                        <img src="https://openweathermap.org/img/wn/${data[i].icon}@2x.png" alt="Weather icon" class="w-10 h-10" />
                        </div>

                        <!-- Details -->
                        <div class="grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
                        <div>
                                <p class="font-medium text-white/70">Location</p>
                                <p>${rawCity}</p>
                        </div>

                        <div>
                                <p class="font-medium text-white/70">Date</p>
                                <p>${data[i].date}</p>
                        </div>

                        <div>
                                <p class="font-medium text-white/70">Temp</p>
                                <p>${data[i].temp}° C</p>
                        </div>

                        <div>
                                <p class="font-medium text-white/70">Weather</p>
                                <p>${data[i].weather}</p>
                        </div>

                        <div>
                                <p class="font-medium text-white/70">Humidity</p>
                                <p>${data[i].humidity}%</p>
                        </div>

                        <div>
                                <p class="font-medium text-white/70">Wind</p>
                                <p>${data[i].wind} mph</p>
                        </div>
                        </div>
                        </div>
                `;
                bottomParentCard.insertAdjacentHTML("beforeend", ele)
        }
}

// Displaying Main Card
const displayMainCard = function(loc,data){
       
        updateBackground(data[0].weather);
        // let mainCard= `
        // <div class="w-full bg-black/20 text-white rounded-xl shadow-2xl p-6 backdrop-blur-2xl">
        //   <div class="flex items-center justify-between mb-4"">
        //   <!---Weather Icon-->
        //     <img src="https://openweathermap.org/img/wn/${data[0].icon}@2x.png" alt="Weather Icon" class="w-24 h-24" />
        //     <!-- Toggle Bar only for this card change deg to fahrenhit -->
        //         <div
        //         class="flex items-center gap-2 bg-black/30 backdrop-blur-md rounded-full p-1"
        //       >
        //         <button
        //           id="celsiusBtn"
        //           class="px-3 py-1 text-sm rounded-full bg-white text-black font-semibold transition"
        //         >
        //           °C
        //         </button>
        //         <button
        //           id="fahrenheitBtn"
        //           class="px-3 py-1 text-sm rounded-full text-white transition"
        //         >
        //           °F
        //         </button>
        //       </div>
        //   </div>

        //   <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-lg">
        //     <div>
        //       <p class="font-semibold">Location</p>
        //       <p>${loc}</p>
        //     </div>

        //     <div>
        //       <p class="font-semibold">Date</p>
        //       <p>${data[0].date}</p>
        //     </div>

        //     <div>
        //       <p class="font-semibold">Temperature</p>
        //       <p id="mainTemp">${data[0].temp}<sup>°</sup>C</p>c
        //     </div>

        //     <div>
        //       <p class="font-semibold">Weather</p>
        //       <p>${data[0].weather}</p>
        //     </div>

        //     <div>
        //       <p class="font-semibold">Humidity</p>
        //       <p>${data[0].humidity}%</p>
        //     </div>

        //     <div>
        //       <p class="font-semibold">Wind Speed</p>
        //       <p>${data[0].wind} mph</p>
        //     </div>
        //   </div>
        // </div>
        // `

        let mainCard = `
                                <div class="w-full bg-black/20 text-white rounded-xl shadow-2xl p-6 backdrop-blur-2xl">
                                <div class="flex items-center justify-between mb-4">
                                <img src="https://openweathermap.org/img/wn/${data[0].icon}@2x.png"
                                        alt="Weather Icon"
                                        class="w-24 h-24" />

                                <div class="flex items-center gap-2 bg-black/30 backdrop-blur-md rounded-full p-1">
                                        <button id="celsiusBtn"
                                        class="px-3 py-1 text-sm rounded-full bg-white text-black font-semibold transition">
                                        °C
                                        </button>
                                        <button id="fahrenheitBtn"
                                        class="px-3 py-1 text-sm rounded-full text-white transition">
                                        °F
                                        </button>
                                </div>
                                </div>

                                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-lg">
                                <div>
                                        <p class="font-semibold">Location</p>
                                        <p>${loc}</p>
                                </div>

                                <div>
                                        <p class="font-semibold">Date</p>
                                        <p>${data[0].date}</p>
                                </div>

                                <div>
                                        <p class="font-semibold">Temperature</p>
                                        <p id="mainTemp">${data[0].temp}<sup>°</sup>C</p>
                                </div>

                                <div>
                                        <p class="font-semibold">Weather</p>
                                        <p>${data[0].weather}</p>
                                </div>

                                <div>
                                        <p class="font-semibold">Humidity</p>
                                        <p>${data[0].humidity}%</p>
                                </div>

                                <div>
                                        <p class="font-semibold">Wind Speed</p>
                                        <p>${data[0].wind} mph</p>
                                </div>
                                </div>
                                </div>
                                `;

        parentCard.innerHTML= mainCard;
        currentTempC = data[0].temp;
        currentUnit = "C";

        setupTempToggle();

}

// Displaying search in selection
const displayHistory = function(selectedCity = "") {
  const store = getStorage();
  searchList.innerHTML = "";

  for (let i = 0; i < store.length; i++) {
    const isSelected = store[i] === selectedCity ? "selected" : "";

    const ele = `
      <option value="${store[i]}" ${isSelected}>
        ${store[i]}
      </option>
    `;
    searchList.insertAdjacentHTML("beforeend", ele);
  }
};


// MAIN SEARCH FUNCTION
 const getForecasteData = async function(APIKEY){
                const rawCity = city.value.trim().toLowerCase();

                if (!rawCity) {
                showPopUp("Error", "Please enter the city name");
                return;
                }

                if (!validate(rawCity)) {
                showPopUp("Error", "City name should contain only letters and spaces");
                return;
                }
                const place = encodeURIComponent(rawCity);

                 let API = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${APIKEY}&units=metric`
                        try{
                                let res = await fetch(API);
                                let data = await res.json();
                                if(data.cod !== "200")
                                {
                                        showPopUp("Erroe", data.message || "city not found")
                                        return;
                                }
                                if(data.cod == "200"){
                                filteredFiveDays= data.list.filter(item => item.dt_txt.includes("12:00:00"))
                                }
                                console.log(filteredFiveDays);
                               let searchHistory= getStorage();
                               if(!searchHistory.includes(rawCity)){
                                        searchHistory.push(rawCity);
                                        localStorage.setItem("searchData", JSON.stringify(searchHistory))
                               }

                                filteredFiveDays=filterData(filteredFiveDays);
                               displayMainCard(rawCity,filteredFiveDays)
                               addCards(rawCity, filteredFiveDays)
                               displayHistory(rawCity);
                                
                        }
                        catch(error){
                                console.log("Error", error);
                                
                        }

 
}

submitBtn.addEventListener("click", ()=>getForecasteData(APIKEY))
searchList.addEventListener("change", () => {
  const selectedCity = searchList.value;

  if (!selectedCity) return;

  city.value = selectedCity; 
  getForecasteData(APIKEY);
});

// Current Location HARD one
const currentLocationBtn = document.getElementById("crtLoc");
const getForecastByCoords = async (lat, lon) => {
  const API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;

  try {
    const res = await fetch(API);
    const data = await res.json();

    if (data.cod !== "200") {
      showPopUp("Error", data.message || "Unable to fetch location weather");
      return;
    }

    // Filter only 12:00 PM entries
    let filtered = data.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    );

    filtered = filterData(filtered);

    const cityName = data.city.name.trim().toLowerCase();

    displayMainCard(cityName, filtered);
    addCards(cityName, filtered);
    updateBackground(filtered[0].weather);

    // store in history
    const history = getStorage();
    if (!history.includes(cityName)) {
      history.push(cityName);
      localStorage.setItem("searchData", JSON.stringify(history));
      displayHistory(cityName);
    }
  } catch (err) {
    console.error(err);
    showPopUp("Error", "Failed to get weather for your location");
  }
};

currentLocationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    showPopUp("Error", "Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      getForecastByCoords(latitude, longitude);
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        showPopUp("Permission Denied", "Please allow location access");
      } else {
        showPopUp("Error", "Unable to fetch your location");
      }
    }
  );
});


// Celsius to Fahernhite
let currentUnit = "C";
let currentTempC = null;

const toFahrenheit = (c) => (c * 9) / 5 + 32;

const setupTempToggle = () => {
  const celsiusBtn = document.getElementById("celsiusBtn");
  const fahrenheitBtn = document.getElementById("fahrenheitBtn");
  const tempEl = document.getElementById("mainTemp");

  if (!celsiusBtn || !fahrenheitBtn || !tempEl) return;

  const updateTempUI = () => {
  const tempEl = document.getElementById("mainTemp");
  if (!tempEl || currentTempC === null) return;

  if (currentUnit === "C") {
    tempEl.innerHTML = `${currentTempC}<sup>°</sup>C`;

    celsiusBtn.classList.add("bg-white", "text-black");
    celsiusBtn.classList.remove("text-white");

    fahrenheitBtn.classList.remove("bg-white", "text-black");
    fahrenheitBtn.classList.add("text-white");

  } else {
    tempEl.innerHTML = `${toFahrenheit(currentTempC).toFixed(1)}<sup>°</sup>F`;

    fahrenheitBtn.classList.add("bg-white", "text-black");
    fahrenheitBtn.classList.remove("text-white");

    celsiusBtn.classList.remove("bg-white", "text-black");
    celsiusBtn.classList.add("text-white");
  }
};

  celsiusBtn.onclick = () => {
    currentUnit = "C";
    updateTempUI();
  };

  fahrenheitBtn.onclick = () => {
    currentUnit = "F";
    updateTempUI();
  };

  updateTempUI();
};



