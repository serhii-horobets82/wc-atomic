import {property, unsafeCSS, html, css, customElement} from "lit-element";
import {AbstractComponent} from "../../../abstract/component/component";
import {TeaserElementInputData} from "./model";
import {ComponentLoader} from "../../../abstract/component-loader";
import {TextComponent} from "../../../atoms/text/component";
import {ImgComponent} from "../../../atoms/img/component";
import {AbstractInputData} from "../../../abstract/component/model";
import {ImgModel} from "../../../atoms/img/model";
import {baseHelper} from "../../../util/base";

const componentCSS = require('./component.css');

@customElement('component-teaser-element')
export class TeaserElementComponent extends AbstractComponent<TeaserElementInputData,
    undefined> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'TeaserElementComponent';

    @property()
    selected: boolean = false;

    @property()
    foregroundContent: AbstractInputData = <AbstractInputData>{};

    @property()
    backgroundContent: AbstractInputData = <AbstractInputData>{};

    render() {
        return html`  <div class="item ${this.selected ? 'selected' : ''}">
                          <div class="background">
                             ${ComponentLoader.INSTANCE.createComponentFromInputData(this.backgroundContent)}
                             <slot id="background"></slot>
                          </div>
                          <div class="foreground">
                             ${ComponentLoader.INSTANCE.createComponentFromInputData(this.foregroundContent)}
                             <slot id="foreground"></slot>
                          </div>
                       </div>
      `;
    }

    getDefaultInputData(): TeaserElementInputData {
        return <TeaserElementInputData>{
            componentIdentifier: TeaserElementComponent.IDENTIFIER,
            selected: false,
            foregroundContent: new TextComponent().getDefaultInputData(),
            backgroundContent: new ImgComponent().getDefaultInputData()
        };
    }

    getOutputData(): undefined {
        return undefined;
    }

    protected inputDataChanged() {
        this.selected = baseHelper.getValue(this.inputData.selected, false);
        this.foregroundContent = baseHelper.getValue(this.inputData.foregroundContent, <AbstractInputData>{});
        this.backgroundContent = baseHelper.getValue(this.inputData.backgroundContent, <ImgModel>{});
    }
}
