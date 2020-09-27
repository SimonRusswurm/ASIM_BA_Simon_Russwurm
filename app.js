var mc8 = document.querySelector(".mc8");
var style = document.querySelector("style");
var rom = document.querySelector(".ROM-Adresse");






for(var i = 0; i<224; i++){
    let p = document.createElement('p');
    p.innerHTML = "FF";
    rom.appendChild(p);
}




window.addEventListener('resize', function () {
    if(mc8.offsetWidth >= window.innerWidth){
        mc8.style.width = "100vw";
        mc8.style.height = "66.66666666667vw";
        style.innerHTML = "h1{margin: 0; padding: 0; font-size: 1.46666vw; color: #19B2FF; font-family: lato-bold;} p{ margin: 0; padding: 0; font-size: 1.466666vw; color: #333333; font-family: lato-reg;}"
        
    }
   
    if(mc8.offsetHeight >= window.innerHeight){        
        mc8.style.width = "150vh";
        mc8.style.height = "100vh";
        style.innerHTML = "h1{margin: 0; padding: 0; font-size: 2.2vh; color: #19B2FF; font-family: lato-bold;} p{ margin: 0; padding: 0; font-size: 2.2vh; color: #333333; font-family: lato-reg;}"
    }
});

