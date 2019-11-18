import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { ComboboxComponent, ComboboxInputData, ComboboxOption } from '../combobox/component';
import { KeyValueData } from '../form/component';
import {Key} from "readline";

const componentCSS = require('./component.css');

export class I18NInputData extends AbstractInputData {
   languages?: KeyValueData[];
}

@customElement('component-i18n-selector')
export class I18NSelectorComponent extends AbstractComponent<I18NInputData, KeyValueData> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'I18NSelectorComponent';

   static EVENT_CHANGE_LANG: string = 'component-i18n-selector-change-lang';

   @property()
   languages: ComboboxOption[] = [<ComboboxOption>{
      value: 'de-DE',
      text: 'Deutsch',
      selected: true
   }, <ComboboxOption>{value: 'en-EN', text: 'English'}];

   private outputData: KeyValueData = <KeyValueData>{};

   render() {
      return html`
            <component-combobox .options="${this.languages}" label="${this.getI18NValue('language')}"
               @combobox-component-selection-change="${(event: CustomEvent) => this.changeLanguage(event)}"
            ></component-combobox> 
      `;
   }

   getDefaultInputData(): I18NInputData {
      return <I18NInputData>{
         componentIdentifier: I18NSelectorComponent.IDENTIFIER,
         selectedLanguage: this.i18nService.getLanguage(),
         label: this.getI18NValue('language'),
         languages: []
      };
   }

   inputDataChanged() {
      this.languages = this.basicService.getValue(this.inputData.languages, []);
   }

   getOutputData(): KeyValueData {
      return this.outputData;
   }

   private changeLanguage(event: CustomEvent) {
      this.outputData = event.detail;
      this.i18nService.setLanguage(this.outputData.value);
      this.dispatchSimpleCustomEvent(I18NSelectorComponent.EVENT_CHANGE_LANG, this.getOutputData());
   }
}
