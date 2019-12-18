import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {
   AlignContent,
   AlignItems,
   FlexDirection,
   FlexJustifyContent,
   FlexWrap,
   KeylineAlignment,
   KeylineSize, MessageType,
   TypographyTypes
} from '..';

const componentCSS = require('./component.css');

export class InputBoxInputData extends AbstractInputData {
   code?: string;
}

@customElement('component-input-box')
export class InputBoxComponent extends AbstractComponent<InputBoxInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'InputBoxComponent';

   @property()
   labelText: string = '';

   @property()
   leadingIcon: string = '';

   @property()
   trailingIcon: string = '';

   @property()
   assistiveText: string = '';

   @property()
   assistiveTextMessageType: string = MessageType.DEFAULT;

   @property()
   infoText: string = '';

   @property()
   selected: boolean = false;

   render() {
      return html`
         <div class="label">${this.labelText}</div>
         <div class="box basicBorder">
            <component-icon .rendered="${this.leadingIcon.length > 0}" icon="${this.leadingIcon}"></component-icon>
            <slot></slot>
            <component-icon .rendered="${this.trailingIcon.length > 0}" icon="${this.trailingIcon}"></component-icon>
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
            <component-typography .type="${TypographyTypes.OVERLINE}" messageType="${this.assistiveTextMessageType}" text="${this.assistiveText}"></component-typography>
            <component-typography .type="${TypographyTypes.OVERLINE}" text="${this.infoText}"></component-typography>
         </component-flex-container>
      `;
   }

   getDefaultInputData(): InputBoxInputData {
      return <InputBoxInputData>{};
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
   }
}
