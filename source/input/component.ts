import { css, customElement, html, property, query, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { KeyValueData } from '../form/component';

const componentCSS = require('./component.css');

export enum HTMLInputTypes {
   BUTTON = 'button',
   CHECKBOX = 'checkbox',
   COLOR = 'color',
   DATE = 'date',
   DATETIME_LOCAL = 'datetime-local',
   EMAIL = 'email',
   FILE = 'file',
   HIDDEN = 'hidden',
   IMAGE = 'image',
   MONTH = 'month',
   NUMBER = 'number',
   PASSWORD = 'password',
   RADIO = 'radio',
   RANGE = 'range',
   RESET = 'reset',
   SEARCH = 'search',
   SUBMIT = 'submit',
   TEL = 'tel',
   TEXT = 'text',
   TIME = 'time',
   URL = 'url',
   WEEK = 'week'
}

export class InputInputData extends AbstractInputData {
   name: string = '';
   value: string = '';
   placeholder: string = '';
   maxlength?: number;
   size?: number;
   min?: number;
   max?: number;
   type?: string;
}

export class InputDataChangeEvent {
   type?: string;
   outputData?: KeyValueData;
   element?: HTMLInputElement;
}

@customElement('component-inputfield')
export class InputComponent extends AbstractComponent<InputInputData, KeyValueData> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'TextfieldComponent';

   static EVENT_KEY_UP_CHANGE: string = 'component-inputfield-keyup';

   static EVENT_CHANGE: string = 'component-inputfield-change';

   @property()
   name: string = '';

   @property()
   value: any = '';

   @property()
   type: string = HTMLInputTypes.TEXT;

   @property()
   placeholder: string = '';

   @property()
   maxlength: number = 255;

   @property()
   min: number = 0;

   @property()
   max: number = 255;

   @property()
   size: number = 50;

   @query('#inputElement')
   private textfieldElemet: HTMLInputElement | undefined;

   getDefaultInputData(): InputInputData {
      return <InputInputData>{
         componentIdentifier: InputComponent.IDENTIFIER,
         name: 'textfield',
         text: 'name',
         value: '',
         placeholder: 'Gib einen Text ein'
      };
   }

   render() {
      return html`
         <input
            id="inputElement"
            multiple=""
            name="${this.name}"
            @keyup="${this.keyup}"
            @change="${(event: Event) => this.change(event)}"
            type="${this.type}"
            value="${this.prepareValue(this.value)}"
            placeholder="${this.placeholder}"
            size="${this.size}"
            maxlength="${this.maxlength}"
            min="${this.min}"
            max="${this.max}"
         />
         <slot></slot>
      `;
   }

   async keyup() {
      this.dispatchSimpleCustomEvent(InputComponent.EVENT_KEY_UP_CHANGE, this.getOutputData());
   }

   async change(event: Event) {
      let inputDataChangedEvent: InputDataChangeEvent = <InputDataChangeEvent>{};
      inputDataChangedEvent.type = this.type;
      inputDataChangedEvent.element = <HTMLInputElement>event.target;
      inputDataChangedEvent.outputData = this.getOutputData();
      this.dispatchSimpleCustomEvent(InputComponent.EVENT_CHANGE, inputDataChangedEvent);
   }

   getOutputData(): KeyValueData {
      let value = this.textfieldElemet != null ? this.textfieldElemet.value : this.value;

      switch (this.type) {
         case HTMLInputTypes.CHECKBOX:
            value = this.textfieldElemet != null ? this.basicService.getValue(this.textfieldElemet.checked, false) : false;
            break;
         default:
            break;
      }

      return <KeyValueData>{
         key: this.name,
         value: value
      };
   }

   getEventList(): string[] {
      return [InputComponent.EVENT_KEY_UP_CHANGE, InputComponent.EVENT_CHANGE];
   }

   protected inputDataChanged() {
      this.name = this.basicService.getValue(this.inputData.name, '');
      this.value = this.basicService.getValue(this.inputData.value, '');
      this.type = this.basicService.getValue(this.inputData.type, HTMLInputTypes.TEXT);
      this.placeholder = this.basicService.getValue(this.inputData.placeholder, '');
      this.maxlength = this.basicService.getValue(this.inputData.maxlength, this.maxlength);
      this.size = this.basicService.getValue(this.inputData.size, this.size);
      this.min = this.basicService.getValue(this.inputData.min, this.min);
      this.max = this.basicService.getValue(this.inputData.max, this.max);
   }

   private prepareValue(value: any): any {
      switch (this.type) {
         case HTMLInputTypes.NUMBER:
            //value = Number(value);
            break;
         default:
            break;
      }
      //return this.basicService.beautifyText(value);
      return value;
   }
}
