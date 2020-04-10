import {customElement, html, property, TemplateResult} from 'lit-element';
import {PageAbstract} from './page-abstract';
import {InputfieldComponent, InputfieldType} from '../inputfield/component';
import {FlexDirection, TypographyType} from '..';
import {ContainerClazzValues, ItemClazzValues} from '../flex-container/component';

@customElement('page-inputfield')
export class PageInputComponent extends PageAbstract {
    @property()
    type: string = InputfieldType.TEXT;

    getMainComponent(): TemplateResult {
        return html`
         <component-flex-container
            .containerClazzes="${[ContainerClazzValues.CONTAINER_50]}"
            .itemClazzes="${[ItemClazzValues.KEYLINE_ALIGNMENT_HORIZONTAL, ItemClazzValues.KEYLINE_SIZE_MEDIUM]}"
            itemFlexBasisValue="100%"
         >
            <component-typography .typographyType="${TypographyType.H1}" text="Textfields"></component-typography>
            <component-typography
               .typographyType="${TypographyType.BODY1}"
               text="Text fields let users enter and edit text."
            ></component-typography>
            <component-typography .typographyType="${TypographyType.H4}" text="Interactive demo"></component-typography>
            <component-typography
               .typographyType="${TypographyType.BODY1}"
               text="This demo lets you preview the text field component, its variations, and configuration options. Each tab displays a different type of text field."
            ></component-typography>
         </component-flex-container>

         <component-flex-container
            .containerClazzes="${[ContainerClazzValues.CONTAINER_50]}"
            .itemClazzes="${[ItemClazzValues.KEYLINE_ALIGNMENT_BOTH, ItemClazzValues.KEYLINE_SIZE_MEDIUM]}"
            itemFlexBasisValue="50%"
         >
            <component-form>
               <component-inputfield
                  .inputfieldType="${InputfieldType.COMBOBOX}"
                  .options="${InputfieldComponent.enumToComboboxItems(InputfieldType)}"
                  label="Typ"
                  value="${this.type}"
                  @component-inputfield-change="${(event: CustomEvent) => this.changeType(event)}"
               ></component-inputfield>
            </component-form>
            <component-form>
               <component-inputfield
                  name="username"
                  .inputfieldType="${this.type}"
                  label="${this.type.toLocaleUpperCase()}"
                  trailingIcon="account_circle"
                  leadingIcon="account_circle"
                  assistiveText="assistiveText"
                  infoText="infoText"
                  required="true"
               ></component-inputfield>
            </component-form>
         </component-flex-container>
      `;
    }

    private changeType(event: CustomEvent) {
        let type: string = (<any>InputfieldType)[event.detail.outputData.value];
        console.log('change type: {}', type);
        this.type = type;
    }
}
