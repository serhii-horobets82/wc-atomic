import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {KeyValueData} from '../form/component';
import {MessageType} from '../typography/component';
import {BasicService} from '@domoskanonos/frontend-basis';
import {InputBoxComponent, InputBoxInputData} from "..";

const componentCSS = require('./component.css');

export enum InputfieldType {
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

export class InputfieldInputData extends AbstractInputData {
   inputfieldType: string = InputfieldType.TEXT;
   name: string = '';
   value: string = '';
   placeholder: string = '';
   label: string = '';
   required: boolean = false;
   disabled: boolean = false;
   checked: boolean = false;
   multiple: boolean = false;
   maxlength?: number;
   minlength?: number;
   size?: number;
   min?: number;
   max?: number;
   step?: number;
}
//inputBoxInputData: InputBoxInputData = new InputBoxInputData();

export class InputfieldDataChangeEvent {
   type?: string;
   outputData?: KeyValueData;
   element?: HTMLInputElement;
}

@customElement('component-inputfield')
export class InputfieldComponent extends AbstractComponent<InputfieldInputData, KeyValueData> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'TextfieldComponent';

   static EVENT_KEY_UP_CHANGE: string = 'component-inputfield-keyup';

   static EVENT_ON_FOCUS_OUT: string = 'component-inputfield-focus-out';

   static EVENT_ON_FOCUS: string = 'component-inputfield-focus';

   static EVENT_CHANGE: string = 'component-inputfield-change';

   @property()
   name: string = new InputfieldInputData().name;

   @property()
   value: string = new InputfieldInputData().value;

   @property()
   oldValue: string = new InputfieldInputData().value;

   @property()
   inputfieldType: string = new InputfieldInputData().inputfieldType;

   @property()
   placeholder: string = new InputfieldInputData().placeholder;

   @property()
   required: boolean = new InputfieldInputData().required;

   @property()
   disabled: boolean = new InputfieldInputData().disabled;

   @property()
   checked: boolean = new InputfieldInputData().checked;

   @property()
   multiple: boolean = new InputfieldInputData().multiple;

   @property()
   maxlength: number | undefined = new InputfieldInputData().maxlength;

   @property()
   minlength: number | undefined = new InputfieldInputData().minlength;

   @property()
   min: number | undefined = new InputfieldInputData().min;

   @property()
   max: number | undefined = new InputfieldInputData().max;

   @property()
   step: number | undefined = new InputfieldInputData().step;

   @property()
   size: number | undefined = new InputfieldInputData().size;

   //@property()
   //inputBoxInputData: InputBoxInputData = new InputBoxInputData();

   //@query('#inputBoxElement')
   //private inputBoxComponent: InputBoxComponent | undefined;

   @query('#inputElement')
   private inputElemet: HTMLInputElement | undefined;

   protected firstUpdated(_changedProperties: Map<PropertyKey, unknown>): void {
      super.firstUpdated(_changedProperties);
      //this.inputBoxComponent?.updateInfoText(this);
   }

   render() {
      return html`
            <input
               id="inputElement"
               name="${this.name}"
               type="${this.inputfieldType}"
               value="${this.prepareValue(this.value)}"
               placeholder="${this.placeholder}"
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
      `;
   }

   async keyup() {
      //this.inputBoxComponent?.updateInfoText(this);
      this.dispatchSimpleCustomEvent(InputfieldComponent.EVENT_KEY_UP_CHANGE, this.getOutputData());
   }

   async focused(event: Event) {
      console.log('event: '.concat(JSON.stringify(event)));
      this.oldValue = this.value;
      //this.inputBoxInputData.selected = true;
      //this.inputBoxInputData = Object.create(this.inputBoxInputData);
      this.dispatchSimpleCustomEvent(InputfieldComponent.EVENT_ON_FOCUS, this.getOutputData());
   }

   async focusout(event: Event) {
      console.log('event: '.concat(JSON.stringify(event)));
      //this.inputBoxInputData.selected = false;
      //this.inputBoxInputData = Object.create(this.inputBoxInputData);
      this.validate();
      this.dispatchSimpleCustomEvent(InputfieldComponent.EVENT_ON_FOCUS_OUT, this.getOutputData());
   }

   async change(event: Event) {
      let inputDataChangedEvent: InputfieldDataChangeEvent = <InputfieldDataChangeEvent>{};
      inputDataChangedEvent.type = this.inputfieldType;
      inputDataChangedEvent.element = <HTMLInputElement>event.target;
      inputDataChangedEvent.outputData = this.getOutputData();
      this.dispatchSimpleCustomEvent(InputfieldComponent.EVENT_CHANGE, inputDataChangedEvent);
   }

   public isValid(): boolean {
      return this.inputElemet != null ? this.inputElemet.validity.valid : false;
   }

   public validate(): void {
      if (this.inputElemet != null) {
         if (this.inputElemet.validity.valid) {
            this.value = this.inputElemet.value;
            this.oldValue = this.inputElemet.value;
            //if (this.inputBoxComponent != null) {
               //this.inputBoxComponent.assistiveTextMessageType = MessageType.DEFAULT;
            //}
         }
         //if (this.inputBoxComponent != null && this.inputElemet.validationMessage != this.inputBoxComponent.assistiveText) {
            //this.inputBoxComponent.assistiveText = this.inputElemet.validationMessage;
            //if (this.inputElemet.validationMessage.length > 0) {
               //this.inputBoxComponent.assistiveTextMessageType = MessageType.ERROR;
            //}
         //}
      }
   }

   getOutputData(): KeyValueData {
      let outputValue: any = this.oldValue;
      if (this.inputElemet != null) {
         if (this.inputElemet.validationMessage.length == 0) {
            outputValue = this.inputElemet.value;
            switch (this.inputfieldType) {
               case InputfieldType.CHECKBOX:
                  outputValue =
                      this.inputElemet != null ? BasicService.getInstance().getValue(this.inputElemet.checked, false) : false;
                  break;
               case InputfieldType.DATETIME_LOCAL:
               case InputfieldType.DATE:
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
      return [InputfieldComponent.EVENT_KEY_UP_CHANGE, InputfieldComponent.EVENT_CHANGE];
   }

   protected inputDataChanged() {
      let defaultData = new InputfieldInputData();
      this.name = BasicService.getInstance().getValue(this.inputData.name, defaultData.name);
      this.value = BasicService.getInstance().getValue(this.inputData.value, defaultData.value);
      this.inputfieldType = BasicService.getInstance().getValue(this.inputData.inputfieldType, defaultData.inputfieldType);
      this.placeholder = BasicService.getInstance().getValue(this.inputData.placeholder, defaultData.placeholder);
      this.maxlength = BasicService.getInstance().getValue(this.inputData.maxlength, defaultData.maxlength);
      this.size = BasicService.getInstance().getValue(this.inputData.size, defaultData.size);
      this.min = BasicService.getInstance().getValue(this.inputData.min, defaultData.min);
      this.max = BasicService.getInstance().getValue(this.inputData.max, defaultData.max);
      //this.inputBoxInputData = BasicService.getInstance().getValue(this.inputBoxInputData, this.inputBoxInputData);
   }

   private prepareValue(value: any): any {
      switch (this.inputfieldType) {
         case InputfieldType.NUMBER:
            value = Number(value);
            break;
         default:
            break;
      }
      //return BasicService.getInstance().beautifyText(value);
      return value;
   }

}
