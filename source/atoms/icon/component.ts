import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {IconInputData} from "./model";

const componentCSS = require('./component.scss');

@customElement('component-icon')
export class IconComponent extends AbstractComponent<IconInputData, any> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'IconComponent';

    static EVENT_CLICK: string = 'component-icon-click';

    @property()
    iconClazz: string = '';

    @property()
    title: string = '';

    @property()
    clickEventData: any = {};

    @property()
    clickable: boolean = false;

    @property()
    status: number = 1;

    render() {
        return html`
         <span title="${this.title}"
            class="${this.iconClazz} ${this.clickable ? 'clickable' : ''} ${this
            .status === 2
            ? 'active'
            : this.status === 3
                ? 'passiv'
                : ''}"
            @click="${this.clicked}"
         ></span>
      `;
    }

    async clicked(event: Event) {
        if (this.clickable) {
            this.dispatchSimpleCustomEvent(
                IconComponent.EVENT_CLICK,
                {
                    "status": this.status,
                    "clickable": this.clickable,
                    "iconClazz": this.iconClazz,
                    "clickEventData": this.clickEventData
                }
            );
        }
    }

    getDefaultInputData(): IconInputData {
        return <IconInputData>{
            componentIdentifier: IconComponent.IDENTIFIER,
            iconClazz: 'fas fa-question',
            clickable: true,
            status: 1
        };
    }

    inputDataChanged() {
        this.iconClazz =
            this.inputData.iconClazz !== undefined ? this.inputData.iconClazz : '';
        this.clickable =
            this.inputData.clickable !== undefined
                ? this.inputData.clickable
                : false;
        this.status =
            this.inputData.status !== undefined ? this.inputData.status : 1;
    }

    getOutputData(): any {
        return undefined;
    }

    getEventList(): string[] {
        return [IconComponent.EVENT_CLICK];
    }
}
