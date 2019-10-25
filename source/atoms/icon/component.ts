import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {IconInputData} from "./model";
import {baseHelper} from "../../index";

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
    cssStyle: string = '';

    @property()
    title: string = '';

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

    async clicked() {
        if (this.clickable) {
            this.dispatchSimpleCustomEvent(
                IconComponent.EVENT_CLICK,
                {
                    "status": this.status,
                    "clickable": this.clickable,
                    "iconClazz": this.iconClazz,
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
        this.iconClazz = baseHelper.getValue(this.inputData.iconClazz, '');
        this.cssStyle = baseHelper.getValue(this.inputData.cssStyle, '');
        this.status = baseHelper.getValue(this.inputData.status, 1);
        this.clickable = baseHelper.getValue(this.inputData.clickable, false);
    }

    getOutputData(): any {
        return undefined;
    }

    getEventList(): string[] {
        return [IconComponent.EVENT_CLICK];
    }
}
