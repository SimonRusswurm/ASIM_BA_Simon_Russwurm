var mc8 = document.querySelector(".mc8");


window.addEventListener('resize', function () {
    console.log(window.innerWidth + " , " + mc8.offsetWidth)
    
    if(mc8.offsetWidth >= window.innerWidth){
        mc8.style.width = "100vw";
        mc8.style.height = "66.66666666667vw";
    }
   
    if(mc8.offsetHeight >= window.innerHeight){        
        mc8.style.width = "150vh";
        mc8.style.height = "100vh";
    }
});

