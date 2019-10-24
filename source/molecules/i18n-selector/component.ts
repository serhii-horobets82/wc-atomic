import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {I18NInputData} from "./model";
import {I18N} from "../../util/i18n-util";
import {ComboboxInputData, ComboboxOption} from "../../input/combobox/model";
import {ComboboxComponent} from "../../input/combobox/component";
import {KeyValueData} from "../../organisms/form/model";

const componentCSS = require('./component.css');

@customElement('component-i18n-selector')
export class I18NSelectorComponent extends AbstractComponent<I18NInputData, any> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'I18NSelectorComponent';

    @property()
    comboboxInputData: ComboboxInputData = <ComboboxInputData>{};

    render() {
        return html`
                  <div>
                    <component-text>${this.getI18NValue('language')}</component-text>
                    <component-combobox .inputData="${this.comboboxInputData}" @combobox-component-selection-change="${(event: CustomEvent) => this.changeLanguage(event)}"></component-combobox>   
                  </div>`
    }


    getDefaultInputData(): I18NInputData {
        return <I18NInputData>{
            componentIdentifier: I18NSelectorComponent.IDENTIFIER,
            selectedLanguage: I18N.getLanguage(),
            languages: []
        }
    }

    inputDataChanged() {
        let compoboxInputData: ComboboxInputData = <ComboboxInputData>{
            componentIdentifier: ComboboxComponent.IDENTIFIER,
            name: 'browserLanguage',
            selectedValue: I18N.getLanguage(),
            size: 1,
            options: [],
        };

        this.inputData.languages.forEach(keyValueData => {
            compoboxInputData.options.push(<ComboboxOption>{value: keyValueData.key, text: keyValueData.value});
        });

        this.comboboxInputData = compoboxInputData;
    }

    getOutputData(): any {
        return undefined;
    }

    private changeLanguage(event: CustomEvent) {
        let languageKeyValue: KeyValueData = event.detail;
        I18N.setLanguage(languageKeyValue.value);
    }
}
