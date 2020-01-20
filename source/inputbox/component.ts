import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import {
   AlignContent,
   AlignItems,
   FlexDirection,
   FlexJustifyContent,
   FlexWrap,
   IconInputData,
   InputfieldComponent,
   InputfieldType,
   KeylineAlignment,
   KeylineSize,
   TypographyType
} from '..';
import { MessageType } from '../typography/component';
import { BasicService } from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');

export class InputBoxVariation {
   static DYNAMIC_INFO_TEXT = 'DYNAMIC_INFO_TEXT';
   static FILLED = 'FILLED';
   static OUTLINED = 'OUTLINED';
}

export class InputBoxInputData extends AbstractInputData {
   inputBoxVariations = [];
   labelText: string = '';
   infoText: string = '';
   assistiveText: string = '';
   assistiveTextMessageType: string = MessageType.DEFAULT;
   leadingIcon: IconInputData = new IconInputData();
   trailingIcon: IconInputData = new IconInputData();
   selected: boolean = false;
   showLabel: boolean = false;
}

@customElement('component-inputbox')
export class InputBoxComponent extends AbstractComponent<InputBoxInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'InputBoxComponent';

   @property()
   inputBoxVariations: InputBoxVariation[] = new InputBoxInputData().inputBoxVariations;

   @property()
   labelText: string = new InputBoxInputData().labelText;

   @property()
   assistiveText: string = new InputBoxInputData().assistiveText;

   @property()
   infoText: string = new InputBoxInputData().infoText;

   @property()
   assistiveTextMessageType: string = MessageType.DEFAULT;

   @property()
   leadingIcon: IconInputData = new InputBoxInputData().leadingIcon;

   @property()
   trailingIcon: IconInputData = new InputBoxInputData().trailingIcon;

   @property()
   selected: boolean = new InputBoxInputData().selected;

   @property()
   showLabel: boolean = new InputBoxInputData().showLabel;

   render() {
      let iconInputData = new IconInputData();
      return html`
         <div class="container">
            <div class="labelContainer ${this.selected || this.showLabel ? 'selected' : ''}">
               <div class="label">${this.labelText}</div>
            </div>
            <div class="box ${this.selected ? 'selected' : ''}">
               <component-icon
                  .rendered="${BasicService.getInstance().isNotBlank(this.leadingIcon.icon)}"
                  .clickData="${BasicService.getInstance().getValue(
                     this.leadingIcon.clickData,
                     this.getDefaultInputData().leadingIcon.clickData
                  )}"
                  .clickable="${BasicService.getInstance().getValue(
                     this.leadingIcon.clickable,
                     this.getDefaultInputData().leadingIcon.clickable
                  )}"
                  icon="${BasicService.getInstance().getValue(
                     this.leadingIcon.icon,
                     this.getDefaultInputData().leadingIcon.icon
                  )}"
                  color="${BasicService.getInstance().getValue(
                     this.leadingIcon.color,
                     this.getDefaultInputData().leadingIcon.color
                  )}"
                  .iconSize="${BasicService.getInstance().getValue(
                     this.leadingIcon.iconSize,
                     this.getDefaultInputData().leadingIcon.iconSize
                  )}"
                  .withIconSpace="${BasicService.getInstance().getValue(
                     this.leadingIcon.withIconSpace,
                     this.getDefaultInputData().leadingIcon.withIconSpace
                  )}"
                  iconState="${BasicService.getInstance().getValue(this.leadingIcon.iconState, iconInputData.iconState)}"
               ></component-icon>
               <slot></slot>
               <component-icon
                  .rendered="${BasicService.getInstance().isNotBlank(this.trailingIcon.icon)}"
                  .clickData="${BasicService.getInstance().getValue(
                     this.trailingIcon.clickData,
                     this.getDefaultInputData().leadingIcon.clickData
                  )}"
                  .clickable="${BasicService.getInstance().getValue(
                     this.trailingIcon.clickable,
                     this.getDefaultInputData().trailingIcon.clickable
                  )}"
                  icon="${BasicService.getInstance().getValue(
                     this.trailingIcon.icon,
                     this.getDefaultInputData().trailingIcon.icon
                  )}"
                  color="${BasicService.getInstance().getValue(
                     this.trailingIcon.color,
                     this.getDefaultInputData().trailingIcon.color
                  )}"
                  .iconSize="${BasicService.getInstance().getValue(
                     this.trailingIcon.iconSize,
                     this.getDefaultInputData().trailingIcon.iconSize
                  )}"
                  .withIconSpace="${BasicService.getInstance().getValue(
                     this.trailingIcon.withIconSpace,
                     this.getDefaultInputData().trailingIcon.withIconSpace
                  )}"
                  iconState="${BasicService.getInstance().getValue(this.leadingIcon.iconState, iconInputData.iconState)}"
               ></component-icon>
            </div>
            <component-flex-container
               containerClazz=""
               .flexDirection="${FlexDirection.ROW}"
               .wrap="${FlexWrap.WRAP}"
               .flexJustifyContent="${FlexJustifyContent.SPACE_BETWEEN}"
               .alignItems="${AlignItems.STRETCH}"
               .alignContent="${AlignContent.STRETCH}"
               itemFlexBasisValue="auto"
               .keylineSize="${KeylineSize.ZERO}"
               .keylineAlignment="${KeylineAlignment.BOTH}"
            >
               <component-typography
                  .typographyType="${TypographyType.OVERLINE}"
                  messageType="${this.assistiveTextMessageType}"
                  text="${this.assistiveText}"
               ></component-typography>
               <component-typography .typographyType="${TypographyType.OVERLINE}" text="${this.infoText}"></component-typography>
            </component-flex-container>
         </div>
      `;
   }

   private getDefaultInputData(): InputBoxInputData {
      return new InputBoxInputData();
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
      this.inputBoxVariations = BasicService.getInstance().getValue(
         this.inputData.inputBoxVariations,
         this.getDefaultInputData().inputBoxVariations
      );
      this.labelText = BasicService.getInstance().getValue(this.inputData.labelText, this.getDefaultInputData().labelText);
      this.infoText = BasicService.getInstance().getValue(this.inputData.infoText, this.getDefaultInputData().infoText);
      this.assistiveText = BasicService.getInstance().getValue(
         this.inputData.assistiveText,
         this.getDefaultInputData().assistiveText
      );
      this.assistiveTextMessageType = BasicService.getInstance().getValue(
         this.inputData.assistiveTextMessageType,
         this.getDefaultInputData().assistiveTextMessageType
      );
      this.leadingIcon = BasicService.getInstance().getValue(this.inputData.leadingIcon, this.getDefaultInputData().leadingIcon);
      this.trailingIcon = BasicService.getInstance().getValue(
         this.inputData.trailingIcon,
         this.getDefaultInputData().trailingIcon
      );
      this.selected = BasicService.getInstance().getValue(this.inputData.selected, this.getDefaultInputData().selected);
      this.showLabel = BasicService.getInstance().getValue(this.inputData.showLabel, this.getDefaultInputData().showLabel);
   }

   public updateInfoText(inputfieldComponent: InputfieldComponent): void {
      switch (inputfieldComponent.inputfieldType) {
         case InputfieldType.CHECKBOX:
         case InputfieldType.COLOR:
         case InputfieldType.DATE:
         case InputfieldType.DATETIME_LOCAL:
         case InputfieldType.EMAIL:
         case InputfieldType.FILE:
         case InputfieldType.HIDDEN:
         case InputfieldType.IMAGE:
         case InputfieldType.MONTH:
         case InputfieldType.RADIO:
         case InputfieldType.RANGE:
         case InputfieldType.RESET:
         case InputfieldType.SEARCH:
         case InputfieldType.SUBMIT:
         case InputfieldType.TEL:
         case InputfieldType.TIME:
         case InputfieldType.URL:
         case InputfieldType.WEEK:
            break;
         case InputfieldType.NUMBER:
            this.infoText = BasicService.getInstance()
               .getValue(inputfieldComponent.min, '')
               .toString()
               .concat('-')
               .concat(
                  BasicService.getInstance()
                     .getValue(inputfieldComponent.max, '')
                     .toString()
               );
            break;
         case InputfieldType.TEXT:
         case InputfieldType.PASSWORD:
            this.infoText = inputfieldComponent.value.length
               .toString()
               .concat('/')
               .concat(
                  BasicService.getInstance()
                     .getValue(inputfieldComponent.max, '0')
                     .toString()
               );
            break;
      }
   }
}
