import { repeat } from 'lit-html/directives/repeat';
import { guard } from 'lit-html/directives/guard';
import { css, customElement, html, property, query, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { KeyValueData } from '../form/component';
import { TypographyType } from '../typography/component';
import { BasicService } from '@domoskanonos/frontend-basis';
import { AlignContent, AlignItems, BorderType, ElementState, FlexDirection, FlexJustifyContent, FlexWrap, VisibleType } from '..';
import { NotifyType } from '../meta-data/notify-type';
import { ContainerClazzValues } from '../flex-container/component';

const componentCSS = require('./component.css');

export enum InputfieldType {
   TEXTAREA = 'textarea',
   CHECKBOX = 'checkbox',
   COLOR = 'color',
   DATE = 'date',
   DATETIME_LOCAL = 'datetime-local',
   EMAIL = 'email',
   FILE = 'file',
   HIDDEN = 'hidden',
   MONTH = 'month',
   NUMBER = 'number',
   PASSWORD = 'password',
   RADIO = 'radio',
   RANGE = 'range',
   SEARCH = 'search',
   TEL = 'tel',
   TEXT = 'text',
   TIME = 'time',
   URL = 'url',
   WEEK = 'week',
   COMBOBOX = 'combobox'
}

export class InputfieldInputData extends AbstractInputData {
   componentIdentifier = InputfieldComponent.IDENTIFIER;
   inputfieldType: string = InputfieldType.TEXT;
   name: string = '';
   value: any = '';
   placeholder: string = '';
   label: string = '';
   required: boolean = false;
   disabled: boolean = false;
   checked: boolean = false;
   multiple: boolean = false;
   maxlength: number = 255; //InputfieldType.TEXT
   minlength?: number; //InputfieldType.TEXT
   min?: number;
   max?: number;
   step?: number;
   size?: number;
   labelText: string = '';
   infoText: string = '';
   errorText: string = '';
   assistiveText: string = '';
   leadingIcon: string = '';
   trailingIcon: string = '';
   leadingIconClickable: boolean = false;
   trailingIconClickable: boolean = false;
   options: KeyValueData[] = [];
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
   value: any = new InputfieldInputData().value;

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

   @property()
   label: string = new InputfieldInputData().labelText;

   @property()
   assistiveText: string = new InputfieldInputData().assistiveText;

   @property()
   infoText: string = new InputfieldInputData().infoText;

   @property()
   errorText: string = new InputfieldInputData().errorText;

   @property()
   leadingIcon: string = new InputfieldInputData().leadingIcon;

   @property()
   trailingIcon: string = new InputfieldInputData().trailingIcon;

   @property()
   leadingIconClickable: boolean = new InputfieldInputData().leadingIconClickable;

   @property()
   trailingIconClickable: boolean = new InputfieldInputData().trailingIconClickable;

   @property()
   selected: boolean = false;

   @property()
   options: KeyValueData[] = [];

   @query('#inputElement')
   inputElemet: HTMLInputElement | undefined;

   @query('#selectElement')
   selectElemet: HTMLSelectElement | undefined;

   protected firstUpdated(_changedProperties: Map<PropertyKey, unknown>): void {
      super.firstUpdated(_changedProperties);
      this.updateInfoText();
   }

   render() {
      return this.inputfieldType != InputfieldType.HIDDEN
         ? html`
              <component-border
                 borderType="${this.showSelectedBorder()
                    ? BorderType.BOTTOM_SELECTED
                    : this.showBorder()
                    ? BorderType.BOTTOM
                    : BorderType.BOTTOM}"
              >
                 <component-grid-container
                    .gridTemplateRows="${['auto']}"
                    .gridTemplateColumns="${['auto', '1fr', 'auto', 'auto']}"
                 >
                    <component-icon
                       .rendered="${BasicService.getUniqueInstance().isNotBlank(this.leadingIcon)}"
                       icon="${this.leadingIcon}"
                       .clickable="${this.leadingIconClickable}"
                    ></component-icon>
                    <component-container>
                       <effect-visible visibleType="${this.showLabelText() ? VisibleType.NORMAL : VisibleType.INVISIBLE}">
                          <component-typography
                             .typographyType="${TypographyType.OVERLINE}"
                             text="${this.label}"
                          ></component-typography>
                       </effect-visible>

                       ${this.inputfieldType == InputfieldType.COMBOBOX
                          ? html`
                               <select
                                  id="selectElement"
                                  ?required="${this.required}"
                                  ?multiple="${this.multiple}"
                                  name="${this.name}"
                                  size="${this.size}"
                                  @change="${(event: Event) => this.change(event)}"
                                  @focus="${(event: Event) => this.focused(event)}"
                                  @focusout="${(event: Event) => this.focusout(event)}"
                               >
                                  ${guard(
                                     [this.options],
                                     () => html`
                                        ${repeat(
                                           this.options,
                                           (option) => option.value,
                                           (option) =>
                                              (option.key.length > 0 && this.multiple && this.value.indexOf(option.key) > -1) ||
                                              BasicService.getUniqueInstance().isEqual(this.value, option.key)
                                                 ? html`
                                                      <option value="${option.key}" selected>${option.value}</option>
                                                   `
                                                 : html`
                                                      <option value="${option.key}">${option.value}</option>
                                                   `
                                        )}
                                     `
                                  )}
                               </select>
                            `
                          : this.inputfieldType == InputfieldType.TEXTAREA
                          ? html`
                               <textarea id="textareaElement" name="${this.name}" @keyup="${this.keyup}" rows="${this.size}">
${this.value}</textarea
                               >
                            `
                          : html`
                               <input
                                  id="inputElement"
                                  name="${this.name}"
                                  type="${this.inputfieldType}"
                                  value="${this.prepareValue(this.value)}"
                                  placeholder="${BasicService.getUniqueInstance().isBlank(this.placeholder) &&
                                  !this.showLabelText()
                                     ? this.label
                                     : this.placeholder}"
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
                            `}</component-container
                    ><component-container>
                       <component-icon
                          .rendered="${!this.checked && this.inputfieldType == InputfieldType.CHECKBOX}"
                          @component-icon-click="${() => {
                             this.switchChecked();
                          }}"
                          icon="toggle_off"
                          .clickable="${true}"
                       ></component-icon>
                       <component-icon
                          .rendered="${this.checked && this.inputfieldType == InputfieldType.CHECKBOX}"
                          @component-icon-click="${() => {
                             this.switchChecked();
                          }}"
                          icon="toggle_on"
                          .clickable="${true}"
                       ></component-icon>
                    </component-container>
                    <component-icon
                       .rendered="${BasicService.getUniqueInstance().isNotBlank(this.trailingIcon)}"
                       icon="${this.trailingIcon}"
                       .clickable="${this.trailingIconClickable}"
                    ></component-icon>
                 </component-grid-container>
              </component-border>

              <component-flex-container
                 .containerClazzes="${[ContainerClazzValues.CONTAINER_100]}"
                 itemFlexBasisValue="auto"
                 flexJustifyContent="${FlexJustifyContent.SPACE_BETWEEN}"
              >
                 <component-typography
                    .typographyType="${TypographyType.OVERLINE}"
                    text="${this.assistiveText}"
                 ></component-typography>
                 <component-typography
                    .typographyType="${TypographyType.OVERLINE}"
                    text="${this.infoText}"
                 ></component-typography>
              </component-flex-container>
           `
         : html`
              HIDDEN
           `;
   }

   private switchChecked() {
      this.checked = !Boolean(this.checked);
   }

   async keyup() {
      this.updateInfoText();
      this.dispatchSimpleCustomEvent(InputfieldComponent.EVENT_KEY_UP_CHANGE, this.getOutputData());
   }

   async focused(event: Event) {
      console.log('event: '.concat(JSON.stringify(event)));
      this.oldValue = this.value;
      this.selected = true;
      this.dispatchSimpleCustomEvent(InputfieldComponent.EVENT_ON_FOCUS, this.getOutputData());
   }

   async focusout(event: Event) {
      console.log('event: '.concat(JSON.stringify(event)));
      this.selected = false;
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
      switch (this.inputfieldType) {
         case InputfieldType.COMBOBOX:
            return this.selectElemet != null ? this.selectElemet.validity.valid : false;
         default:
            return this.inputElemet != null ? this.inputElemet.validity.valid : false;
      }
   }

   public validate(): void {
      if (this.inputElemet != null) {
         if (this.inputElemet.validity.valid) {
            this.value = this.inputElemet.value;
            this.oldValue = this.inputElemet.value;
         }
         if (this.inputElemet.validationMessage != this.errorText) {
            this.errorText = this.inputElemet.validationMessage;
         }
      }
   }

   getOutputData(): KeyValueData {
      let outputValue: any = this.oldValue;
      if (this.selectElemet != null) {
         //BEi einer selektierung, was ist mit mehreren ?
         outputValue = this.selectElemet.value;
         /*
         outputValue = [];
         for (let i = 0, len = this.selectElemet.options.length; i < len; i++) {
            let opt: HTMLOptionElement = this.selectElemet.options[i];
            if (opt.selected) {
               outputValue.push(opt.value);
            }
         }*/
      } else if (this.inputElemet != null) {
         if (this.inputElemet.validationMessage.length == 0) {
            outputValue = this.inputElemet.value;
            switch (this.inputfieldType) {
               case InputfieldType.CHECKBOX:
                  outputValue =
                     this.inputElemet != null
                        ? BasicService.getUniqueInstance().getValue(this.inputElemet.checked, false)
                        : false;
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
      this.name = BasicService.getUniqueInstance().getValue(this.inputData.name, defaultData.name);
      this.value = BasicService.getUniqueInstance().getValue(this.inputData.value, defaultData.value);
      this.inputfieldType = BasicService.getUniqueInstance().getValue(this.inputData.inputfieldType, defaultData.inputfieldType);
      this.placeholder = BasicService.getUniqueInstance().getValue(this.inputData.placeholder, defaultData.placeholder);
      this.maxlength = BasicService.getUniqueInstance().getValue(this.inputData.maxlength, defaultData.maxlength);
      this.size = BasicService.getUniqueInstance().getValue(this.inputData.size, defaultData.size);
      this.min = BasicService.getUniqueInstance().getValue(this.inputData.min, defaultData.min);
      this.max = BasicService.getUniqueInstance().getValue(this.inputData.max, defaultData.max);
      this.label = BasicService.getUniqueInstance().getValue(this.inputData.labelText, this.label);
      this.infoText = BasicService.getUniqueInstance().getValue(this.inputData.infoText, this.infoText);
      this.assistiveText = BasicService.getUniqueInstance().getValue(this.inputData.assistiveText, this.assistiveText);
      this.errorText = BasicService.getUniqueInstance().getValue(this.inputData.errorText, this.errorText);
      this.leadingIcon = BasicService.getUniqueInstance().getValue(this.inputData.leadingIcon, this.leadingIcon);
      this.trailingIcon = BasicService.getUniqueInstance().getValue(this.inputData.trailingIcon, this.trailingIcon);
   }

   private prepareValue(value: any): any {
      if (value == null) {
         return '';
      }

      if (typeof value == 'string') {
         return value;
      }

      switch (this.inputfieldType) {
         case InputfieldType.DATE:
            value = value.toISOString().substr(0, 10);
            break;
         default:
            value = BasicService.getUniqueInstance().beautifyText(value);
            break;
      }
      return value;
   }

   public updateInfoText(): void {
      if (!this.showBorder()) {
         this.infoText = '';
         return;
      }
      switch (this.inputfieldType) {
         case InputfieldType.CHECKBOX:
         case InputfieldType.COLOR:
         case InputfieldType.DATE:
         case InputfieldType.DATETIME_LOCAL:
         case InputfieldType.EMAIL:
         case InputfieldType.FILE:
         case InputfieldType.HIDDEN:
         case InputfieldType.MONTH:
         case InputfieldType.RADIO:
         case InputfieldType.RANGE:
         case InputfieldType.SEARCH:
         case InputfieldType.TEL:
         case InputfieldType.TIME:
         case InputfieldType.URL:
         case InputfieldType.WEEK:
            break;
         case InputfieldType.NUMBER:
            this.infoText = BasicService.getUniqueInstance()
               .getValue(this.min, '')
               .toString()
               .concat('-')
               .concat(
                  BasicService.getUniqueInstance()
                     .getValue(this.max, '')
                     .toString()
               );
            break;
         case InputfieldType.TEXT:
         case InputfieldType.PASSWORD:
            this.infoText = this.value.length
               .toString()
               .concat('/')
               .concat(
                  BasicService.getUniqueInstance()
                     .getValue(this.maxlength, '0')
                     .toString()
               );
            break;
      }
   }

   private showBorder(): boolean {
      return BasicService.getUniqueInstance().isNotBlank(this.label);
   }

   private showSelectedBorder(): boolean {
      return (
         this.showBorder() &&
         this.selected &&
         this.inputfieldType !== InputfieldType.RANGE &&
         this.inputfieldType !== InputfieldType.COLOR
      );
   }

   private showLabelText(): boolean {
      return (
         ((this.selected ||
            this.inputfieldType === InputfieldType.COLOR ||
            this.inputfieldType === InputfieldType.COMBOBOX ||
            this.inputfieldType === InputfieldType.TEXTAREA ||
            this.inputfieldType === InputfieldType.RANGE ||
            this.inputfieldType === InputfieldType.CHECKBOX ||
            this.inputfieldType === InputfieldType.MONTH ||
            this.inputfieldType === InputfieldType.TIME ||
            this.inputfieldType === InputfieldType.WEEK ||
            this.inputfieldType === InputfieldType.DATE ||
            this.inputfieldType === InputfieldType.DATETIME_LOCAL) &&
            BasicService.getUniqueInstance().isNotBlank(this.label)) ||
         (BasicService.getUniqueInstance().isNotBlank(this.value) && BasicService.getUniqueInstance().isNotBlank(this.label))
      );
   }

   static enumToComboboxItems(enumeration: any): KeyValueData[] {
      let options: KeyValueData[] = [];
      Object.keys(enumeration).forEach((key) => {
         options.push(<KeyValueData>{ key: key, value: enumeration[key] });
      });
      return options;
   }

   static clazzToComboboxItems(clazz: any): KeyValueData[] {
      let options: KeyValueData[] = [];
      Object.keys(clazz).forEach((key) => {
         options.push(<KeyValueData>{ key: clazz[key], value: key });
      });
      return options;
   }

   static object2KeyValueDataArray(
      object: any,
      keyFieldName: string,
      valueFieldName: string,
      withEmptyItem: boolean = false
   ): KeyValueData[] {
      let options: KeyValueData[] = [];
      if (withEmptyItem) {
         options.push(new KeyValueData());
      }
      Object.values(object).forEach((value: any) => {
         options.push(<KeyValueData>{ key: value[keyFieldName], value: value[valueFieldName] });
      });
      return options;
   }
}
