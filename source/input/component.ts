import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {KeyValueData} from '../form/component';
import {MessageType} from "../typography/component";

const componentCSS = require('./component.css');

export enum HTMLInputTypes {
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

   static EVENT_ON_FOCUS_OUT: string = 'component-inputfield-focus-out';

   static EVENT_ON_FOCUS: string = 'component-inputfield-focus';

   static EVENT_CHANGE: string = 'component-inputfield-change';

   @property()
   name: string = '';

   @property()
   value: string = '';

   @property()
   oldValue: string = '';

   @property()
   type: string = HTMLInputTypes.TEXT;

   @property()
   placeholder: string = '';

   @property()
   label: string = '';

   @property()
   required: boolean = false;

   @property()
   disabled: boolean = false;

   @property()
   checked: boolean = false;

   @property()
   multiple: boolean = false;

   @property()
   maxlength: number = 255;

   @property()
   min: number = 0;

   @property()
   minlength: string = '';

   @property()
   max: number = 255;

   @property()
   step: number = 1;

   @property()
   size: number = 50;

   @property()
   leadingIcon: string = '';

   @property()
   trailingIcon: string = '';

   @property()
   assistiveText: string = '';

   @property()
   infoText: string = '';

   @property()
   automaticInfoText: boolean = true;

   @property()
   assistiveTextMessageType: string = MessageType.DEFAULT;

   @property()
   selected: boolean = false;

   @query('#inputElement')
   private inputElemet: HTMLInputElement | undefined;

   protected firstUpdated(_changedProperties: Map<PropertyKey, unknown>): void {
      super.firstUpdated(_changedProperties);
      if (this.automaticInfoText) {
         this.infoText = this.getInfoText();
      }
   }

   render() {
      return html`
         <component-input-box
            labelText="${this.label.length == 0 ? this.placeholder : this.label}"
            assistiveText="${this.assistiveText}"
            leadingIcon="${this.leadingIcon}"
            trailingIcon="${this.trailingIcon}"
            infoText="${this.infoText}"
            .selected="${this.selected}"
            .showLabel="${this.value.length > 0}"
            assistiveTextMessageType="${this.assistiveTextMessageType}"
         >
            <input
               id="inputElement"
               name="${this.name}"
               type="${this.type}"
               value="${this.prepareValue(this.value)}"
               placeholder="${this.placeholder.length == 0 ? this.label : this.placeholder}"
               size="${this.size}"
               minlength="${this.minlength}"
               maxlength="${this.maxlength}"
               min="${this.min}"
               max="${this.max}"
               step="${this.step}"
               ?required="${this.required}"
               ?disabled="${this.disabled}"
               ?checked="${this.checked}"
               ?multiple="${this.multiple}"
               @keyup="${this.keyup}"
               @change="${(event: Event) => this.change(event)}"
               @focus="${(event: Event) => this.focused(event)}"
               @focusout="${(event: Event) => this.focusout(event)}"
            />
         </component-input-box>
      `;
   }

   async keyup() {
      if (this.automaticInfoText) {
         this.infoText = this.getInfoText();
      }
      this.dispatchSimpleCustomEvent(InputComponent.EVENT_KEY_UP_CHANGE, this.getOutputData());
   }

   async focused(event: Event) {
      console.log('event: '.concat(JSON.stringify(event)));
      this.oldValue = this.value;
      this.selected = true;
      this.dispatchSimpleCustomEvent(InputComponent.EVENT_ON_FOCUS, this.getOutputData());
   }

   async focusout(event: Event) {
      console.log('event: '.concat(JSON.stringify(event)));
      this.selected = false;
      this.validate();
      this.dispatchSimpleCustomEvent(InputComponent.EVENT_ON_FOCUS_OUT, this.getOutputData());
   }

   async change(event: Event) {

      let inputDataChangedEvent: InputDataChangeEvent = <InputDataChangeEvent>{};
      inputDataChangedEvent.type = this.type;
      inputDataChangedEvent.element = <HTMLInputElement>event.target;
      inputDataChangedEvent.outputData = this.getOutputData();
      this.dispatchSimpleCustomEvent(InputComponent.EVENT_CHANGE, inputDataChangedEvent);
   }

   public isValid(): boolean {
      return this.inputElemet != null ? this.inputElemet.validity.valid : false;
   }

   public validate(): void {
      if (this.inputElemet != null) {
         if (this.inputElemet.validity.valid) {
            this.value = this.inputElemet.value;
            this.oldValue = this.inputElemet.value;
            this.assistiveTextMessageType = MessageType.DEFAULT;
         }

         if (this.inputElemet.validationMessage != this.assistiveText) {
            this.assistiveText = this.inputElemet.validationMessage;
            if (this.inputElemet.validationMessage.length > 0) {
               this.assistiveTextMessageType = MessageType.ERROR;
            }
         }
      }
   }

   getOutputData(): KeyValueData {
      let outputValue: any = this.oldValue;
      if (this.inputElemet != null) {
         if (this.inputElemet.validationMessage.length == 0) {
            outputValue = this.inputElemet.value;
            switch (this.type) {
               case HTMLInputTypes.CHECKBOX:
                  outputValue = this.inputElemet != null ? this.basicService.getValue(this.inputElemet.checked, false) : false;
                  break;
               case HTMLInputTypes.DATETIME_LOCAL:
               case HTMLInputTypes.DATE:
                  outputValue = this.inputElemet?.valueAsDate;
                  break;
               default:
                  break;
            }
         }
      }

      return <KeyValueData>{
         key: this.name,
         value: outputValue
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

   private getInfoText(): string {
      switch (this.type) {
         case HTMLInputTypes.CHECKBOX:
            return '';
         case HTMLInputTypes.COLOR:
            return '';
         case HTMLInputTypes.DATE:
            return '';
         case HTMLInputTypes.DATETIME_LOCAL:
            return '';
         case HTMLInputTypes.EMAIL:
            return '';
         case HTMLInputTypes.FILE:
            return '';
         case HTMLInputTypes.HIDDEN:
            return '';
         case HTMLInputTypes.IMAGE:
            return '';
         case HTMLInputTypes.MONTH:
            return '';
         case HTMLInputTypes.RADIO:
            return '';
         case HTMLInputTypes.RANGE:
            return '';
         case HTMLInputTypes.RESET:
            return '';
         case HTMLInputTypes.SEARCH:
            return '';
         case HTMLInputTypes.SUBMIT:
            return '';
         case HTMLInputTypes.TEL:
            return '';
         case HTMLInputTypes.NUMBER:
            return this.min
                .toString()
                .concat('-')
                .concat(this.max.toString());
         case HTMLInputTypes.TEXT:
         case HTMLInputTypes.PASSWORD:
            return (this.inputElemet != undefined ? this.inputElemet.value.length : 0)
                .toString()
                .concat('/')
                .concat(this.max.toString());
         case HTMLInputTypes.TIME:
            return '';
         case HTMLInputTypes.URL:
            return '';
         case HTMLInputTypes.WEEK:
            return '';
      }
      return '';
   }
}
