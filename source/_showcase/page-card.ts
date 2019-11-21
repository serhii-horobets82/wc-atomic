import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputComponent } from '../input/component';
import { ImgComponent, ImgInputData } from '../img/component';
import { TypographyInputData, TypographyTypes } from '../typography/component';
import { ToolbarJustifyContent } from '../toolbar/component';
import { SimpleTableRowData } from '../simple-table/component';
import { LinkComponent, LinkInputData } from '../link/component';

@customElement('page-card')
export class PageCardComponent extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container containerClazz="container_25">
            <component-card>
               <component-primary-title
                  thumbnail="https://picsum.photos/300/300"
                  .primaryTitle="${<TypographyInputData>{
                     type: TypographyTypes.H6,
                     text: 'Title goes here'
                  }}"
                  .secondaryTitle="${<TypographyInputData>{
                     type: TypographyTypes.CAPTION,
                     text: 'Secondary text'
                  }}"
               ></component-primary-title>
               <component-img src="https://picsum.photos/300/300"></component-img>
               <component-typography .type="${TypographyTypes.BODY1}"
                  >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                  dolore magna aliquyam erat, sed diam voluptua.</component-typography
               >
               <component-flex-container container_25="50%">
                  <component-toolbar>
                     <component-link href="https://material.io/components/cards/#anatomy">Description</component-link>
                     <component-link
                        text="Examples"
                        href="https://material-components.github.io/material-components-web-catalog/#/component/card"
                     ></component-link>
                  </component-toolbar>

                  <component-toolbar .justifyContent="${ToolbarJustifyContent.FLEX_END}">
                     <component-icon iconClazz="fas fa-bars"></component-icon>
                     <component-icon iconClazz="fas fa-bars"></component-icon>
                     <component-icon iconClazz="fas fa-bars"></component-icon>
                  </component-toolbar>
               </component-flex-container>
            </component-card>

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
               <component-list-item clazz="primaryColor">
                  <component-spacer clazz="mediumPaddingLeft"></component-spacer>
                  <component-text text="Lorem Ipsum Dolorem"></component-text>
               </component-list-item>
               <component-list-item>
                  <component-spacer clazz="mediumPaddingLeft"></component-spacer>
                  <component-text text="Lorem Ipsum Dolorem"></component-text>
               </component-list-item>
               <component-list-item>
                  <component-spacer clazz="mediumPaddingLeft"></component-spacer>
                  <component-text text="Lorem Ipsum Dolorem"></component-text>
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
            
         </component-flex-container>
      `;
   }
}
