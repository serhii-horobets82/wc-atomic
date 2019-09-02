import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from "../../abstract/abstract-component";
import {ButtonComponent} from "../../atoms/button/component";
import {DataProtectionModel} from "../../interface/atoms";
import {Button} from "../../atoms/button/model";

const componentCSS = require('./data-protection.scss');


@customElement('component-data-protection')
export class DataProtection extends AbstractComponent<DataProtectionModel, any> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'DataProtection';

    static LOCAL_STORAGE_ACCEPT_KEY = 'component-data-protection-accept';

    @property()
    buttonInputData: Button;

    @property()
    lawText: string;

    @property()
    isAccepted: boolean;

    constructor() {
        super();
        this.isAccepted = this.getLocalStorageAcceptValue();
    }


    getLocalStorageAcceptValue(): boolean {
        let isAcceptedAsNumber = Number(localStorage.getItem(DataProtection.LOCAL_STORAGE_ACCEPT_KEY));
        let isAccepted = isAcceptedAsNumber === 1;
        console.log('Already accepted ? ' + this.isAccepted);
        return isAccepted;
    }

    setLocalStorageAcceptValue(acceptValue: boolean): void {
        localStorage.setItem(DataProtection.LOCAL_STORAGE_ACCEPT_KEY, acceptValue ? '1' : '0');
    }


    render() {
        return html`<div style="${this.isAccepted ? 'display: none;' : ''}">
<component-button .inputData="${this.buttonInputData}" @click="${this.accept}">${this.lawText}</component-button>
</div>`;
    }

    async accept(event: Event) {
        this.setLocalStorageAcceptValue(true);
    }

    getDefaultInputData(): DataProtectionModel {
        return <DataProtectionModel>{
            componentIdentifier: DataProtection.IDENTIFIER,
            buttonInputData: <Button>{
                componentIdentifier: ButtonComponent.IDENTIFIER,
                text: 'Einverstanden',
            },
            lawtext: 'Diese Website verwendet Cookies – nähere Informationen dazu und zu Ihren Rechten als Benutzer finden Sie in unserer Datenschutzerklärung am Ende der Seite. Klicken Sie auf „Ich stimme zu“, um Cookies zu akzeptieren und direkt unsere Website besuchen zu können.'
        };
    }

    getOutputData(): any {
        return undefined;
    }

    protected inputDataChanged() {
        this.buttonInputData = this.inputData.buttonInputData;
        this.lawText = this.inputData.lawtext;
    }

}