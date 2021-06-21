import { getHtmlElement, getInputElement } from "./utils";
import { programStatus } from "./ProgramStatus";
import { containerSettings_div, saveSettings } from "./settingsWindow";
import { mc8Components } from "./components/Mc8Components";
import { resetAnimation, startAnimation } from "./index";

declare global {
    interface Document {
      mozCancelFullScreen?: () => Promise<void>;
      msExitFullscreen?: () => Promise<void>;
      webkitExitFullscreen?: () => Promise<void>;
      mozFullScreenElement?: Element;
      msFullscreenElement?: Element;
      webkitFullscreenElement?: Element;
    }
  
    interface HTMLElement {
      msRequestFullscreen?: () => Promise<void>;
      mozRequestFullscreen?: () => Promise<void>;
      webkitRequestFullscreen?: () => Promise<void>;
    }
}

const doc: any = document.documentElement;
         
const play_button: HTMLElement = getHtmlElement('play_button');
const reset_button: HTMLElement  = getHtmlElement('reset_button'); 
const singleStep_button: HTMLElement = getHtmlElement('singleStep_button'); 
const animationType1_button: HTMLElement = getHtmlElement('slow_button');
const animationType2_button: HTMLElement = getHtmlElement('fast_button');
const noAnimation_button: HTMLElement = getHtmlElement('noAnimation_button');
const speedSlider_input: HTMLInputElement = getInputElement('speedSlider_input');
const decrease_button: HTMLElement = getHtmlElement('decrease_button'); 
const increase_button: HTMLElement = getHtmlElement('increase_button');
const settingsButton_button: HTMLElement = getHtmlElement('settingsButton_button');
const fullscreenButton_button: HTMLElement = getHtmlElement('fullscreenButton_button');

const io1Input_button: HTMLElement = getHtmlElement('io1Input_button');
const io2Input_button: HTMLElement = getHtmlElement('io2Input_button');
const io3Input_button: HTMLElement = getHtmlElement('io3Input_button');

const toggleTheme_button: HTMLElement = getHtmlElement('toggleTheme_button');
const info_button: HTMLElement = getHtmlElement('info_button');
const closeSettings_button: HTMLElement = getHtmlElement('closeSettings_button');
const infoWindow_div: HTMLElement = getHtmlElement('infoWindow_div');

class ButtonController {
    
    constructor() {
        this.openSettings();
    }   

    playOrPause() {
        if (!programStatus.play) {
            programStatus.romIsEdited = false;
            if (programStatus.reset) { //only when reset is pressed(init), the program will be started anew  
                programStatus.setPlay();
                startAnimation();
            }
            programStatus.setPlay();
            play_button.classList.add('pause_button', 'buttonPressed');
        }
        else{
            programStatus.setPause();
            play_button.classList.remove('pause_button', 'buttonPressed');
        }
    }

    pause() {
        programStatus.setPause();
        play_button.classList.remove('pause_button', 'buttonPressed');
    }

    reset() {
        programStatus.setReset();
        play_button.classList.remove('pause_button', 'buttonPressed');
        resetAnimation();
    }


    toggleSingleSteps() {
        if (programStatus.singleSteps) {
            programStatus.resetSingleSteps();
            singleStep_button.classList.remove('buttonPressed', 'oneCommandPressed');
            return;
        }
        
        programStatus.setSingleSteps();
        singleStep_button.classList.add('buttonPressed', 'oneCommandPressed');
    }

    enableAnimationType_1() {
        programStatus.setAnimationType_1();
        animationType1_button.classList.add('buttonPressed');
        animationType2_button.classList.remove('buttonPressed');
        noAnimation_button.classList.remove('buttonPressed');
    }

    enableAnimationType_2() {
        programStatus.setAnimationType_2();
        animationType1_button.classList.remove('buttonPressed');
        animationType2_button.classList.add('buttonPressed');
        noAnimation_button.classList.remove('buttonPressed');
    }

    enableNoAnimation() {
        programStatus.setNoAnimation();
        animationType1_button.classList.remove('buttonPressed');
        animationType2_button.classList.remove('buttonPressed');
        noAnimation_button.classList.add('buttonPressed');
    }

    increaseSpeed() {
        speedSlider_input.stepUp();
        speedSlider_input.dispatchEvent(new Event('input'));
    }
    
    decreaseSpeed() {
        speedSlider_input.stepDown();
        speedSlider_input.dispatchEvent(new Event('input'));
    }

    openSettings() {
        containerSettings_div.classList.add('toggleDisplay');
        programStatus.settingsOpened = true;
    }

    toggleTheme() {
        document.getElementsByTagName('body')[0].classList.toggle('black');
        getHtmlElement('toggleTheme_button').classList.toggle('light');
    }

    toggleFullscreen() {
        if (!programStatus.fullscreenOn) {
            if (doc.requestFullscreen) {
                doc.requestFullscreen();
            } else if (doc.webkitRequestFullscreen) {
                doc.webkitRequestFullscreen();
            } else if (doc.msRequestFullscreen) {
                doc.msRequestFullscreen();
            }
            programStatus.fullscreenOn = true;
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            programStatus.fullscreenOn = false;
        }
    }

    openInfo() {
        infoWindow_div.classList.toggle('displayNone');
    }

}

export const buttonController = new ButtonController();

play_button.addEventListener('click', buttonController.playOrPause);
reset_button.addEventListener('click', buttonController.reset);
singleStep_button.addEventListener('click', buttonController.toggleSingleSteps);
animationType1_button.addEventListener('click', buttonController.enableAnimationType_1);
animationType2_button.addEventListener('click', buttonController.enableAnimationType_2);
noAnimation_button.addEventListener('click', buttonController.enableNoAnimation);
decrease_button.addEventListener('click', buttonController.decreaseSpeed);
increase_button.addEventListener('click', buttonController.increaseSpeed);
settingsButton_button.addEventListener('click', buttonController.openSettings);
fullscreenButton_button.addEventListener('click', buttonController.toggleFullscreen);

io1Input_button.addEventListener('click', buttonController.playOrPause);
io2Input_button.addEventListener('click', buttonController.playOrPause);
io3Input_button.addEventListener('click', buttonController.playOrPause);

toggleTheme_button.addEventListener('click', buttonController.toggleTheme);
info_button.addEventListener('click', buttonController.openInfo);
closeSettings_button.addEventListener('click', saveSettings);

speedSlider_input.oninput = function(){
    programStatus.updateAnimationSpeed(Number(speedSlider_input.value));
};
document.addEventListener('keyup', function (e) {
    if(programStatus.romIsEdited){    
        if(e.code === 'Space' || e.code === 'Enter'){
            buttonController.playOrPause();
        }
        mc8Components.ROM.updateIntegerCellsFromDOM();
        return
    }

    if(programStatus.settingsOpened){
        if (e.code === 'Enter' || e.code === 'KeyS')
            saveSettings();
        return
    }

    if(programStatus.ioInput){
        if (e.code === 'Enter')
            buttonController.playOrPause();
        return
    }

    switch (e.code) {
        case 'Space':
            buttonController.playOrPause();
            break;
        case 'KeyR':
            buttonController.reset();
            break;

        case 'KeyT':
            buttonController.toggleSingleSteps();
            break;

        case 'KeyY':
            buttonController.enableAnimationType_1();
            break;

        case 'KeyZ':
            buttonController.enableAnimationType_1();
            break;

        case 'KeyU':
            buttonController.enableAnimationType_2();
            break;
        
        case 'KeyI':
            buttonController.enableNoAnimation();
            break;

        case 'KeyS':
            buttonController.openSettings();
            break;

        case 'KeyV':
            buttonController.toggleFullscreen();
            break;

        case 'BracketRight':
            buttonController.increaseSpeed();
            break;

        case 'Slash':
            buttonController.decreaseSpeed();
            break;

        default:
            break;
    }
    return
});


export const pausingExecutionCheck = (): void => {
    let check = false;
    
    if(mc8Components.ROM.breakpointPositions[mc8Components.PC.value])
        check = true;

    if (programStatus.singleSteps || check) {
        mc8Components.CONTROL_UNIT.updateStepDescription('Prozessor angehalten');
        mc8Components.CONTROL_UNIT.stepNumber.textContent = '0';
        buttonController.playOrPause();
    }
}


