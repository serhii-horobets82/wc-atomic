import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/abstract-component';
import {IconInputData} from "../icon/model";
import {Button} from "./model";

const componentCSS = require('./component.css');

@customElement('component-button')
export class ButtonComponent extends AbstractComponent<Button, undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'ButtonComponent';

    static EVENT_CLICK: string = 'component-button-click';

    @property()
    icon: IconInputData = <IconInputData>{};

    @property()
    clazz: string;

    @property()
    text: string;

    @property()
    href: string;

    @property()
    clickEventData: any;

    getDefaultInputData(): Button {
        return <Button>{
            componentIdentifier: ButtonComponent.IDENTIFIER,
            clazz: '',
            text: 'Mein Button',
            href: '/',
            clickEventData: 'defaultClick',
            icon: <IconInputData>{
                iconClazz: 'fas fa-angle-right',
                clickable: true,
                status: 1
            }
        };
    }

    protected inputDataChanged() {
        this.icon =
            this.inputData.icon !== undefined
                ? this.inputData.icon
                : <IconInputData>{};
        this.text = this.inputData.text;
        this.href = this.inputData.href !== undefined ? this.inputData.href : '/';
        this.clickEventData = this.inputData.clickEventData;
    }

    render() {
        return html`
         <button class="${this.clazz}" @click="${this.clicked}">
            <component-icon .inputData="${this.icon}"></component-icon>
            <component-text clazz="ellipsis centerText" text="${this.text}"></component-text>
         </button>
      `;
    }

    async clicked(event: Event) {
        this.dispatchSimpleCustomEvent(
            ButtonComponent.EVENT_CLICK,
            this.clickEventData
        );
    }

    getOutputData(): any {
        return undefined;
    }

    getEventList(): string[] {
        return [ButtonComponent.EVENT_CLICK];
    }
}
