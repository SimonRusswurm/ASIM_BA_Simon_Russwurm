var mc8 = document.querySelector(".mc8");
var style = document.querySelector("style");
var rom = document.querySelector(".ROM-Adresse");
let wiH = window.innerHeight;
let wiW = window.innerWidth;






for(var i = 0; i<224; i++){
    let p = document.createElement('p');
    p.innerHTML = "FF";
    rom.appendChild(p);
}

window.addEventListener('DOMContentLoaded', function () {
    if(window.innerHeight*1.5 > window.innerWidth){
        mc8.style.width = String(window.innerWidth) + "px";
        mc8.style.height = String(window.innerWidth/1.5) + "px";
        style.innerHTML = "h1{margin: 0; padding: 0; font-size: 1.46666vw; color: #19B2FF; font-family: lato-bold;} p{ margin: 0; padding: 0; font-size: 1.466666vw; color: #333333; font-family: lato-reg;}"
        
    } else{
        mc8.style.width = String(window.innerHeight*1.5) + "px";
        mc8.style.height = String(window.innerHeight) + "px";
        style.innerHTML = "h1{margin: 0; padding: 0; font-size: 2.2vh; color: #19B2FF; font-family: lato-bold;} p{ margin: 0; padding: 0; font-size: 2.2vh; color: #333333; font-family: lato-reg;}"
    }  
});

window.addEventListener('resize', function () {
    if(window.innerHeight*1.5 > window.innerWidth){
        mc8.style.width = String(window.innerWidth) + "px";
        mc8.style.height = String(window.innerWidth/1.5) + "px";
        style.innerHTML = "h1{margin: 0; padding: 0; font-size: 1.46666vw; color: #19B2FF; font-family: lato-bold;} p{ margin: 0; padding: 0; font-size: 1.466666vw; color: #333333; font-family: lato-reg;}"
        
    } else{
        mc8.style.width = String(window.innerHeight*1.5) + "px";
        mc8.style.height = String(window.innerHeight) + "px";
        style.innerHTML = "h1{margin: 0; padding: 0; font-size: 2.2vh; color: #19B2FF; font-family: lato-bold;} p{ margin: 0; padding: 0; font-size: 2.2vh; color: #333333; font-family: lato-reg;}"
    }  
});

