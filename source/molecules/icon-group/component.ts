import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract-component/component';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {IconGroupInputData} from "./model";
import {LinkInputData} from "../../atoms/link/model";
import {IconComponent, IconInputData} from "../../icon/component";

const componentCSS = require('./component.css');

@customElement('component-icon-group')
export class IconGroupComponent extends AbstractComponent<IconGroupInputData,
    undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'IconGroupComponent';

    static EVENT_ICON_CLICK: string = 'component-icon-group-icon-click';

    @property()
    icons: IconInputData[] = [];

    @property()
    clazz: string = '';

    render() {
        return html`<span class="${this.clazz}">
         ${guard(
            this.icons,
            () =>
                html`
                  ${repeat(
                    this.icons,
                    (icon, index) => html`
                        <component-icon .inputData="${icon}"  @component-icon-click="${(
                        event: CustomEvent
                    ) => this.iconClicked(index, event)}"></component-icon>
                     `
                )}
               `
        )}
         </span>
      `;
    }

    iconClicked(index: number, event: CustomEvent) {
        this.dispatchCompoundCustomEvent(
            IconGroupComponent.EVENT_ICON_CLICK,
            event,
            index
        );
    }

    getDefaultInputData(): IconGroupInputData {
        return <IconGroupInputData>{
            componentIdentifier: IconGroupComponent.IDENTIFIER,
            icons : [new IconComponent().getDefaultInputData(),
                new IconComponent().getDefaultInputData(),
                new IconComponent().getDefaultInputData(),]
        };
    }

    inputDataChanged() {
        this.icons = this.inputData.icons;
        this.clazz = this.inputData.clazz !== undefined ? this.inputData.clazz : '';
    }

    getOutputData(): undefined {
        return undefined;
    }
}
