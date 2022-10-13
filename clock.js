function updateClock(){
    let date = new Date();
    let hr = date.getHours();
    let m = "AM";
    //handle 12 case
    if(hr == 0){
        hr = 12;
    }
    //pm cases
    if(hr > 12){
        hr -= 12;
        m = "PM"
    }
    let timeString = hr+":"+date.getMinutes()+":"+ date.getSeconds();
    document.getElementById("start").firstChild.textContent = timeString;
}
function initClock(){
    updateClock();
    setInterval(updateClock, 1);
}