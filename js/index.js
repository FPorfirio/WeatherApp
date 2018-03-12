$(document).ready(function() {                 
  /* Background code */
  
  var city = document.getElementById("city");
  var icon = document.getElementById("icon");
  var temp = document.getElementById("actual_temp");
  var max_min_temp = document.getElementById("max_min_temp");
  var sky = document.getElementById("sky"); 
  var geo_options = {  
   enableHighAccuracy: true, 
 };
  /* API variables */
  
  var apiTemp;
  var apiMaxTemp;
  var apiMinTemp
 

  var getLocation = function() {
    if (!navigator.geolocation) {
      city.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    };
    return new Promise(function(resolve, reject, ) {   navigator.geolocation.getCurrentPosition(resolve, reject)                           
    })
  };

  var weather_api =  function(data) {
    apiTemp = data.main.temp;
    apiMaxTemp = data.main.temp_max;
    apiMinTemp = data.main.temp_min;
    city.innerHTML = data.name;
    icon.setAttribute("src", data.weather[0].icon);
    temp.innerHTML = apiTemp + "°C";
    var maxmin = apiMaxTemp + "°/" + apiMinTemp + "°C";
    max_min_temp.innerHTML = maxmin
    sky.innerHTML = data.weather[0].description;
    console.log(data);
  };
  
  getLocation().then(function(position){
    var lat = position.coords.latitude;
    var long = position.coords.longitude; 
    var url = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long;
    $.getJSON(url, weather_api)
  }).catch(function(reject) {
    city.innerHTML = reject.message
  });
  /* Buttons code */
  
  var buttons = document.getElementsByClassName("c_to_f");
  var c_switch = document.getElementById("switch_celcius");
  var f_switch = document.getElementById("switch_farenheit");
  
  f_switch.addEventListener("click", function() {
    c_switch.classList.remove("active_case");
    this.classList.add("active_case");
    
    temp.innerHTML = Math.floor(apiTemp  * 9/5 + 32) + "F°";
    max_min_temp.innerHTML = Math.floor(apiMaxTemp * 9/5 + 32) + "/" + Math.floor(apiMinTemp * 9/5 + 32) +("F°")
  });
  
  c_switch.addEventListener("click", function() {
    f_switch.classList.remove("active_case");
    this.classList.add("active_case");
    
    temp.innerHTML = apiTemp +"C°";
    max_min_temp.innerHTML = apiMaxTemp + "/" + apiMinTemp + "C°"
  })
})