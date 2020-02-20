import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputfieldComponent } from '../inputfield/component';
import {TypographyComponent, TypographyType} from '../typography/component';
import { SimpleTableRowData } from '../simple-table/component';
import { AlignItems, FlexJustifyContent, KeylineSize } from '../flex-container/component';
import {ElementState, SpacerAlignment, SpacerSize} from '..';
import { I18nService } from '@domoskanonos/frontend-basis';

@customElement('page-typography')
export class PageTypographyComponent extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container containerClazz="container_75" itemFlexBasisValue="100%">
            <component-flex-container
               containerClazz="container_100"
               .justifyContent="${FlexJustifyContent.FLEX_START}"
               .alignItems="${AlignItems.CENTER}"
            >
               <component-icon
                  .clickable="false"
                  icon="font_download"
                  color="#25498d"
                  iconSize="96"
                  elementState="${ElementState.ACTIVE_FOCUSED}"
                  .withIconSpace="${false}"
               ></component-icon>

               <component-typography .typographyType="${TypographyType.H2}">Typography</component-typography>
            </component-flex-container>
            <component-spacer size="${SpacerSize.MEDIUM}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>

            <component-typography .typographyType="${TypographyType.H4}">Types of Typography</component-typography>
            <component-spacer size="${SpacerSize.MEDIUM}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>

            <component-simple-table
               .headers="${[I18nService.getUniqueInstance().getValue('typographyType'), I18nService.getUniqueInstance().getValue('typographyTypeDescription')]}"
               .rows="${[
                  <SimpleTableRowData>{ columns: ['H1', 'Headline'] },
                  <SimpleTableRowData>{ columns: ['H2', 'Headline'] },
                  <SimpleTableRowData>{ columns: ['H3', 'Headline'] },
                  <SimpleTableRowData>{ columns: ['H4', 'Headline'] },
                  <SimpleTableRowData>{ columns: ['H5', 'Headline'] },
                  <SimpleTableRowData>{ columns: ['H6', 'Headline'] },
                  <SimpleTableRowData>{ columns: ['SUBTITLE1', ''] },
                  <SimpleTableRowData>{ columns: ['SUBTITLE2', ''] },
                  <SimpleTableRowData>{ columns: ['BODY1', 'long-form writing text'] },
                  <SimpleTableRowData>{ columns: ['BODY2', 'long-form writing text'] },
                  <SimpleTableRowData>{ columns: ['BUTTON', ''] },
                  <SimpleTableRowData>{ columns: ['CAPTION', ''] },
                  <SimpleTableRowData>{ columns: ['OVERLINE', ''] }
               ]}"
            >
            </component-simple-table>
         
         
         <component-flex-container containerClazz="container_100" itemFlexBasisValue="100%">

            <component-typography .typographyType="${TypographyType.H1}">Headline 1</component-typography>
            <component-typography .typographyType="${TypographyType.H2}">Headline 2</component-typography>
            <component-typography .typographyType="${TypographyType.H3}">Headline 3</component-typography>
            <component-typography .typographyType="${TypographyType.H4}">Headline 4</component-typography>
            <component-typography .typographyType="${TypographyType.H5}">Headline 5</component-typography>
            <component-typography .typographyType="${TypographyType.H6}">Headline 6</component-typography>
            <component-typography .typographyType="${TypographyType.SUBTITLE1}">Subtitle 1</component-typography>
            <component-typography .typographyType="${TypographyType.SUBTITLE2}">Subtitle 2</component-typography>
            <component-typography .typographyType="${TypographyType.BODY1}" text=""
               >Body 1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam
               beatae rerum inventore consectetur</component-typography
            >
            <component-typography .typographyType="${TypographyType.BODY2}"
               >Body 2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate aliquid ad quas sunt voluptatum
               officia dolorum cumque, possimus nihil molestias sapiente necessitatibus dolor saepe inventore, soluta id
               accusantium voluptas beatae.</component-typography
            >
            <component-typography .typographyType="${TypographyType.BUTTON}">BUTTON TEXT</component-typography>
            <component-typography .typographyType="${TypographyType.CAPTION}">Caption text</component-typography>
            <component-typography .typographyType="${TypographyType.OVERLINE}">OVERLINE TEXT</component-typography>
          
          </component-flex-container>  
            
         </component-flex-container>
         
      `;
   }
}
