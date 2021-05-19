import { arrowAnimator } from "./ArrowAnimator";
import { controlUnitAnimator } from "./ControlUnitAnimator";
import { mc8Components } from "../components/Mc8Components";
import { Register_x4 } from "../components/RegisterClasses";
import { addYellowBackgroundTo } from "../utils";


class RegisterAnimator {
    constructor(){}

    async registerUpdate(registerName: string, value: number): Promise < any > {
        const register = mc8Components.getRegisterByName(registerName);
    
        if(register instanceof Register_x4){
            if (registerName.includes('hi')) {
                register.updateHiByte(value);
                await addYellowBackgroundTo(register.hiRegister.htmlElement);
            } else if (registerName.includes('lo')) {
                register.updateLoByte(value);
                await addYellowBackgroundTo(register.loRegister.htmlElement);
            } else {
                register.update(value);
                addYellowBackgroundTo(register.hiRegister.htmlElement);
                addYellowBackgroundTo(register.loRegister.htmlElement);
                await addYellowBackgroundTo(register.backgroundHtmlElement);
            }
        }
        else {
            register.update(value);
            await addYellowBackgroundTo(register.htmlElement);
        }
    }

    async increasePcByOne(): Promise < any > {
        await controlUnitAnimator.stepDescriptionUpdate('Erhöhe Programmzähler um 1');
        await arrowAnimator.displayRegisterArrow('PC');
        await this.registerUpdate('PC', mc8Components.PC.value + 1);
    }
}

export const registerAnimator = new RegisterAnimator();
