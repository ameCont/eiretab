// Variables start
const progressBar = document.getElementById("progressBar");
const chargingText = document.getElementById("chargingText")
const unsupported = document.querySelector('.unsupported');
const supported = document.querySelector('.supported');
let batteryLevel, isCharging;
// Functions start
let oldClassName;
function changeBatteryColor(level) {
  let className;
  if (level >= 75 && level <= 100) className = 'bg-danger' //green zone
  else if (level >= 50 && level < 75) className = 'bg-warning' //blue zone
  else if (level >= 25 && level < 50) className = 'bg-info' //yellow zone
  else if (level >= 0 && level < 25) className = 'bg-success' //red zone
  oldClassName = className

  return className;
}

function changeChargingAnimation(isCharging) {
  if (!isCharging) {
    progressBar.classList.add("progress-bar-animated")
    chargingText.classList.remove('d-none')
  }
  else {
    progressBar.classList.remove("progress-bar-animated")
    chargingText.classList.add('d-none')
  }
}

function changeLevel(battery) {
  batteryLevel = `${battery.level * 100}%`;
  progressBar.setAttribute("aria-valuenow",battery.level)
  progressBar.style.width = batteryLevel;
  progressBar.innerText = batteryLevel;
  if (oldClassName) progressBar.classList.remove(oldClassName);
  progressBar.classList.add(changeBatteryColor(battery.level * 100));
  changeChargingAnimation(battery.charging);
}

// Functions end

   async function showBattery() {
  const battery = await navigator.getBattery();
  isCharging = battery.charging;
  changeLevel(battery);

}

  if ('getBattery' in navigator) {
    showBattery();
    setInterval(showBattery, 1000);
  }
  else {
    unsupported.style.display = "block";
    supported.style.display = "none";
  }
  
