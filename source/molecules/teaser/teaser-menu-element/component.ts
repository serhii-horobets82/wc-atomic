import {css, customElement, html, property, unsafeCSS} from "lit-element";
import {baseHelper} from "../../../index";
import {AbstractComponent} from "../../../abstract/component/component";
import {TeaserMenuElementInputData} from "./model";

const componentCSS = require('./component.css');

@customElement('component-teaser-menu-element')
export class TeaserElementMenuComponent extends AbstractComponent<TeaserMenuElementInputData,
    TeaserElementMenuComponent> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'TeaserElementMenuComponent';

    static EVENT_TEASER_MENU_ELEMENT_CLICK: string = 'component-teaser-menu-element-click';

    @property()
    selected: boolean = false;

    render() {
        return html`<div class="menuItem ${this.selected ? 'selected' : ''}" @click="${this.menuElementClicked}"></div>`;
    }

    menuElementClicked() {
        console.log('teaser menu element clicked');
        this.selected = true;
        this.dispatchSimpleCustomEvent(
            TeaserElementMenuComponent.EVENT_TEASER_MENU_ELEMENT_CLICK,
            this.getOutputData()
        );
    }

    getDefaultInputData(): TeaserMenuElementInputData {
        return <TeaserMenuElementInputData>{
            componentIdentifier: TeaserElementMenuComponent.IDENTIFIER,
            selected: false,
        };
    }

    getOutputData(): TeaserElementMenuComponent {
        return this;
    }

    protected inputDataChanged() {
        this.selected = baseHelper.getValue(this.inputData.selected, false);
    }
}
