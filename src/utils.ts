import { programStatus} from "./ProgramStatus";


export const getHtmlElement = (id: string) => document.getElementById(id)!;
export const getPElement = (id: string) => <HTMLParagraphElement>document.getElementById(id)!;
export const getDivElement = (id: string) => <HTMLDivElement>document.getElementById(id)!;
export const getInputElement = (id: string) => <HTMLInputElement>document.getElementById(id)!;

const sleepFor = (milliseconds: number): Promise < any > => new Promise(resolve => setTimeout(resolve, milliseconds));

export const pauseableSleep = async (milliseconds: number): Promise < any > => {
    let count = milliseconds;
    while (true) {
        if (count < 10) {
            return true;
        } else {
            await sleepFor(10);
            await checkPlayPressed();
            count -= 10;
        }
    }
}

export const checkPlayPressed = async (): Promise < any > => {
    //if pause is pressed user will be caught in this loop till pressing play or reset
    while (true) {
        if (programStatus.play)
            return true;
        if (programStatus.reset)
            throw Error('Reset Pressed');
        await sleepFor(100);
    }
}

export const sleepForIDLETIME = (): Promise < any > => pauseableSleep(programStatus.idleTime);

const noAnimationIdleTime = 15;
export const sleepForNOANIMATIONIDLETIME = (): Promise < any > => pauseableSleep(noAnimationIdleTime);

const framesPerSecond = 60;
export const sleepBetweenFrames = (): Promise < any > => pauseableSleep(1000/framesPerSecond);

export const addYellowBackgroundTo = async (htmlElement: HTMLElement): Promise < any > => {
    //If the sleep function throws an error the yellowBg must be removed.
    try {
        if (!programStatus.noAnimation) {
            htmlElement.classList.add('yellowBg');
            await sleepForIDLETIME();
        } else {
            await sleepForNOANIMATIONIDLETIME();
        }
    } finally {
        htmlElement.classList.remove('yellowBg');
    }
}


