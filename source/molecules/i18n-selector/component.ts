import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract-component/component';
import {I18NInputData} from "./model";
import {ComboboxInputData, ComboboxOption} from "../../input/combobox/model";
import {ComboboxComponent} from "../../input/combobox/component";
import {KeyValueData} from "../../organisms/form/model";
import {I18N} from "../../index";

const componentCSS = require('./component.css');

@customElement('component-i18n-selector')
export class I18NSelectorComponent extends AbstractComponent<I18NInputData, KeyValueData> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'I18NSelectorComponent';

    static EVENT_CHANGE_LANG: string = 'component-i18n-selector-change-lang';

    @property()
    comboboxInputData: ComboboxInputData = <ComboboxInputData>{};

    private outputData: KeyValueData = <KeyValueData>{};

    render() {
        return html`
                  <component-flex-container gridClazz="grid_100 alignItemsCenter" >
                    <component-text>${this.getI18NValue('language')}</component-text>&nbsp;
                    <component-combobox .inputData="${this.comboboxInputData}" @combobox-component-selection-change="${(event: CustomEvent) => this.changeLanguage(event)}"></component-combobox>   
                  </component-flex-container>`
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

    getOutputData(): KeyValueData {
        return this.outputData;
    }

    private changeLanguage(event: CustomEvent) {
        this.outputData = event.detail;
        I18N.setLanguage(this.outputData.value);
        this.dispatchSimpleCustomEvent(
            I18NSelectorComponent.EVENT_CHANGE_LANG,
            this.getOutputData());
    }
}
