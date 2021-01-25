const cusSel = document.getElementsByClassName('custom_select')[0];

const openSelect = () => {
    document.getElementsByClassName('openSelect')[0].classList.toggle('displayOn');
}

cusSel.addEventListener('click', openSelect);

let options = document.getElementsByClassName('option');



for (let i = 0; i < options.length; i++) {
   options[i].addEventListener('click', function(){
        cusSel.textContent = options[i].textContent;
        openSelect();
   });
}


