import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {TypographyInputData} from '../typography/component';

const componentCSS = require('./component.scss');

export class PrimaryTitleInputData extends AbstractInputData {
    thumbnail?: string;
    primaryTitle: TypographyInputData | undefined;
    secondaryTitle: TypographyInputData | undefined;
}

@customElement('component-primary-title')
export class PrimaryTitleComponent extends AbstractComponent<PrimaryTitleInputData, any> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'PrimaryTitleComponent';

    @property()
    thumbnail: string | undefined;

    @property()
    primaryTitle: TypographyInputData | undefined;

    @property()
    secondaryTitle: TypographyInputData | undefined;

    render() {
        return html`
         <component-flex-container gridClazz="grid_100" .columnFlexBasisValues="${this.thumbnail != undefined ? ["20%", "80%"] : ["100%"]}">
            ${this.thumbnail
            ? html`
                    <component-img clazz="roundImage" src="${this.thumbnail}"></component-img>
                 `
            : html``}
            <component-flex-container gridClazz="grid_100" columnFlexBasisValue="100%">
               ${this.primaryTitle
            ? html`
                       <component-typography .inputData="${this.primaryTitle}"></component-typography>
                    `
            : html``}
               ${this.secondaryTitle
            ? html`
                       <component-typography .inputData="${this.secondaryTitle}"></component-typography>
                    `
            : html``}
            </component-flex-container>
         </component-flex-container>
      `;
    }

    getDefaultInputData(): PrimaryTitleInputData {
        return <PrimaryTitleInputData>{
            componentIdentifier: PrimaryTitleComponent.IDENTIFIER
        };
    }

    inputDataChanged() {
        this.thumbnail = this.basicService.getValue(this.inputData.thumbnail, '');
        this.primaryTitle = this.basicService.getValue(this.inputData.primaryTitle, undefined);
        this.secondaryTitle = this.basicService.getValue(this.inputData.secondaryTitle, undefined);
    }

    getOutputData(): any {
        return undefined;
    }
}
