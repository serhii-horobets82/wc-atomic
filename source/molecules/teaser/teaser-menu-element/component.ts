import {property, unsafeCSS, html, css, customElement} from "lit-element";
import {baseHelper} from "../../../util/base";
import {AbstractComponent} from "../../../abstract/component/component";
import {TeaserMenuElementInputData} from "./model";

const componentCSS = require('./component.css');

@customElement('component-teaser-menu-element')
export class TeaserElementMenuComponent extends AbstractComponent<TeaserMenuElementInputData,
    undefined> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'TeaserElementMenuComponent';

    @property()
    selected: boolean = false;

    render() {
        return html`<div class="menuItem ${this.selected ? 'selected' : ''}"></div>`;
    }

    getDefaultInputData(): TeaserMenuElementInputData {
        return <TeaserMenuElementInputData>{
            componentIdentifier: TeaserElementMenuComponent.IDENTIFIER,
            selected: false,
        };
    }

    getOutputData(): undefined {
        return undefined;
    }

    protected inputDataChanged() {
        this.selected = baseHelper.getValue(this.inputData.selected, false);
    }
}
