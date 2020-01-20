import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import {
   AlignContent,
   AlignItems,
   FlexDirection,
   FlexJustifyContent,
   FlexWrap, IconInputData,
   KeylineAlignment,
   KeylineSize,
   TypographyType
} from '..';
import {MessageType} from "../typography/component";
import {BasicService} from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');

export class InputBoxVariation {
   static MINIMIZE = 'MINIMIZE';
   static FILLED = 'FILLED';
   static OUTLINED = 'OUTLINED';
}

export class InputBoxInputData extends AbstractInputData {
   inputBoxVariation = new InputBoxVariation();
   labelText: string = '';
   infoText: string = '';
   assistiveText: IconInputData = new IconInputData();
   assistiveTextMessageType: string = MessageType.DEFAULT;
   leadingIcon: IconInputData = new IconInputData();
   trailingIcon: IconInputData = new IconInputData();
   selected: boolean = false;
   showLabel: boolean = false;
}

@customElement('component-input-box')
export class InputBoxComponent extends AbstractComponent<InputBoxInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'InputBoxComponent';

   @property()
   inputBoxVariation: InputBoxVariation = InputBoxVariation.MINIMIZE;

   @property()
   labelText: string = '';

   @property()
   assistiveText: string = '';

   @property()
   infoText: string = '';

   @property()
   assistiveTextMessageType: string = MessageType.DEFAULT;

   @property()
   leadingIcon: IconInputData = new IconInputData();

   @property()
   trailingIcon: IconInputData = new IconInputData();

   @property()
   selected: boolean = false;

   @property()
   showLabel: boolean = false;

   render() {
      return html`
         <div class="container">
            <div class="labelContainer ${this.selected || this.showLabel ? 'selected' : ''}">
               <div class="label">${this.labelText}</div>
            </div>
            <div class="box ${this.selected ? 'selected' : ''}">
               <component-icon .rendered="${BasicService.getInstance().isNotBlank(this.leadingIcon.icon)}" .inputData="${this.leadingIcon}"></component-icon>
               <slot></slot>
               <component-icon .rendered="${BasicService.getInstance().isNotBlank(this.trailingIcon.icon)}" .inputData="${this.trailingIcon}"></component-icon>
            </div>
            <component-flex-container
               containerClazz=""
               .direction="${FlexDirection.ROW}"
               .wrap="${FlexWrap.WRAP}"
               .justifyContent="${FlexJustifyContent.SPACE_BETWEEN}"
               .alignItems="${AlignItems.STRETCH}"
               .alignContent="${AlignContent.STRETCH}"
               itemFlexBasisValue="auto"
               .keylineSize="${KeylineSize.ZERO}"
               .keylineAlignment="${KeylineAlignment.BOTH}"
            >
               <component-typography
                  .type="${TypographyType.OVERLINE}"
                  messageType="${this.assistiveTextMessageType}"
                  text="${this.assistiveText}"
               ></component-typography>
               <component-typography .type="${TypographyType.OVERLINE}" text="${this.infoText}"></component-typography>
            </component-flex-container>
         </div>
      `;
   }

   getDefaultInputData(): InputBoxInputData {
      return <InputBoxInputData>{};
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {}
}
