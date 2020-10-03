//resize window
{
let mc8 = document.querySelector(".mc8");
let style = document.querySelector("style");


window.addEventListener('DOMContentLoaded', function () {
    if(window.innerHeight*1.4375 > window.innerWidth){
        mc8.style.width = String(window.innerWidth) + "px";
        mc8.style.height = String(window.innerWidth/1.4375) + "px";
        style.innerHTML = "h1{font-size: 1.46666vw;} p{font-size: 1.3913vw;} h2{font-size: 2.7vw;} h3{font-size: 1vw;}";
        
    } else{
        mc8.style.width = String(window.innerHeight*1.4375) + "px";
        mc8.style.height = String(window.innerHeight) + "px";
        style.innerHTML = "h1{font-size: 2.2vh;} p{font-size: 2vh;} h2{font-size: 3.88125vh;} h3{font-size: 1.4375vh;}";
    }  
});

window.addEventListener('resize', function () {
    if(window.innerHeight*1.4375 > window.innerWidth){
        mc8.style.width = String(window.innerWidth) + "px";
        mc8.style.height = String(window.innerWidth/1.4375) + "px";
        style.innerHTML = "h1{font-size: 1.46666vw;} p{font-size: 1.3913vw;} h2{font-size: 2.7vw;} h3{font-size: 1vw;}";
        
    } else{
        mc8.style.width = String(window.innerHeight*1.4375) + "px";
        mc8.style.height = String(window.innerHeight) + "px";
        style.innerHTML = "h1{font-size: 2.2vh;} p{font-size: 2vh;} h2{font-size: 3.88125vh;} h3{font-size: 1.4375vh;}";
    }  
});
}


//fill ROM
{
let rom = document.querySelector(".Adresse-000x-1FFx");
let ram = document.getElementsByClassName("Adresse-200x-3FFx");
console.log(ram);
console.log(rom);
for(var i = 0; i<224; i++){
    let ro = document.createElement('p');
    let ra = document.createElement('p');
    ro.textContent = "FF";
    ra.textContent = "FF";
    rom.appendChild(ro);
    if(i<112){
        ram[0].appendChild(ra);
    }else{
        ram[1].appendChild(ra);
    }
}
}


