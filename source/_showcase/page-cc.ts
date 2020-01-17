import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { TypographyInputData, TypographyTypes } from '../typography/component';
import { LinkComponent, LinkInputData, RichMediaInputData, SimpleTableRowData } from '..';

@customElement('page-cc')
export class PageElementList extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`


<component-chip>
<component-typography .type="${TypographyTypes.SUBTITLE1}">Subtitle 1</component-typography>
</component-chip>



         <component-authenticated-icon></component-authenticated-icon>

            <component-button text="420 Kalorien gegessen" icon="restaurant"></component-button>



         <component-simple-table
            .headers="${['Lorem', 'Ipsum', 'Dolorem']}"
            .rows="${[
               <SimpleTableRowData>{ columns: ['Lorem', 'Ipsum', 'Dolorem'] },
               <SimpleTableRowData>{ columns: ['Lorem', 'Ipsum', 'Dolorem'] },
               <SimpleTableRowData>{ columns: ['Lorem', 'Ipsum', 'Dolorem'] },
               <SimpleTableRowData>{ columns: ['Lorem', 'Ipsum', 'Dolorem'] },
               <SimpleTableRowData>{ columns: ['Lorem', 'Ipsum', 'Dolorem'] }
            ]}"
         >
         </component-simple-table>

         <component-list>
            <component-list-item>
               <component-primary-title
                  .richMedia="${<RichMediaInputData>{ src: 'https://picsum.photos/150/150' }}"
                  .primaryTitle="${<TypographyInputData>{
                     type: TypographyTypes.H6,
                     text: 'Title goes here'
                  }}"
                  .secondaryTitle="${<TypographyInputData>{
                     type: TypographyTypes.CAPTION,
                     text: 'Secondary text'
                  }}"
               ></component-primary-title>
            </component-list-item>
            <component-list-item>
               <component-primary-title
                  .richMedia="${<RichMediaInputData>{ src: 'https://picsum.photos/100/100' }}"
                  .primaryTitle="${<TypographyInputData>{
                     type: TypographyTypes.H6,
                     text: 'Title goes here'
                  }}"
                  .secondaryTitle="${<TypographyInputData>{
                     type: TypographyTypes.CAPTION,
                     text: 'Secondary text'
                  }}"
               ></component-primary-title>
            </component-list-item>
            <component-list-item>
               <component-primary-title
                  .richMedia="${<RichMediaInputData>{ src: 'https://picsum.photos/50/50' }}"
                  .primaryTitle="${<TypographyInputData>{
                     type: TypographyTypes.H6,
                     text: 'Title goes here'
                  }}"
                  .secondaryTitle="${<TypographyInputData>{
                     type: TypographyTypes.CAPTION,
                     text: 'Secondary text'
                  }}"
               ></component-primary-title>
            </component-list-item>
         </component-list>

         <component-breadcrumb
            .links="${[
               <LinkInputData>{
                  componentIdentifier: LinkComponent.IDENTIFIER,
                  text: 'Home',
                  href: '/'
               }
            ]}"
         >
         </component-breadcrumb>

         <component-accordion>
            <component-accordion-item header="Accordion 1">Lorem Ipsum 1</component-accordion-item>
            <component-accordion-item header="Accordion 2">Lorem Ipsum 2</component-accordion-item>
            <component-accordion-item header="Accordion 3">Lorem Ipsum 3</component-accordion-item>
         </component-accordion>

         <component-divider></component-divider>
      `;
   }
}
