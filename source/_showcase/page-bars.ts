import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { ComboboxOption, ElementState, FlexJustifyContent } from '..';
import { ToolbarAlignment } from '../toolbar/component';

@customElement('page-bars')
export class PageBars extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         ojoijij
         <component-flex-container .containerClazzes="${["CONTAINER_50"]} itemFlexBasisValue="100%">
            <component-top-app-bar>
               <component-icon slot="leftComponents" icon="menu" clickable="true"></component-icon>
               <component-typography slot="mainComponents">Mein Menü</component-typography>
               <component-icon slot="rightComponents" icon="search" clickable="true"></component-icon>
            </component-top-app-bar>
            ${this.createToolbar('PRIMARY_COLOR', ToolbarAlignment.HORIZONTAL, FlexJustifyContent.SPACE_AROUND, '100px', 'auto')}
            ${this.createToolbar(
               'SECONDARY_COLOR',
               ToolbarAlignment.HORIZONTAL,
               FlexJustifyContent.SPACE_AROUND,
               '100px',
               '250px'
            )}
         </component-flex-container>

         <component-flex-container .containerClazzes="${["CONTAINER_50"]} itemFlexBasisValue="25%">
            ${this.createToolbar('PRIMARY_COLOR', ToolbarAlignment.VERTICAL, FlexJustifyContent.SPACE_AROUND, 'auto', 'auto')}
            ${this.createToolbar('SECONDARY_COLOR', ToolbarAlignment.VERTICAL, FlexJustifyContent.SPACE_AROUND, '150px', 'auto')}
            ${this.createToolbar('SURFACE_COLOR', ToolbarAlignment.VERTICAL, FlexJustifyContent.SPACE_AROUND, 'auto', '150px')}
         </component-flex-container>

         <component-flex-container .containerClazzes="${["CONTAINER_50"]} itemFlexBasisValue="100%">
            <component-search-bar></component-search-bar>
         </component-flex-container>
      `;
   }

   private createToolbar(
      PRIMARY_COLOR: string,
      toolbarAlignment: string,
      flexJustifyContent: string,
      height: string,
      width: string
   ) {
      return html`
         <component-flex-container .containerClazzes="CONTAINER_MIN_CONTENT ${PRIMARY_COLOR}" itemFlexBasisValue="100%">
            <component-toolbar
               height="${height}"
               width="${width}"
               .flexJustifyContent="${flexJustifyContent}"
               .toolbarAlignment="${toolbarAlignment}"
            >
               ${this.createIcon('home', 'Zuhause')} ${this.createIcon('how_to_reg', 'Profil')}
               ${this.createIcon('camera_alt', 'Barcode')} ${this.createIcon('list_alt', 'Manager')}
               ${this.createIcon('trending_up', 'Training')} ${this.createIcon('import_export', '2,00')}
            </component-toolbar>
         </component-flex-container>
      `;
   }

   createIcon(icon: string, text: string) {
      return html`
         <effect-ripple>
            <component-icon-with-text
               .elementState="${ElementState.ACTIVE_FOCUSED}"
               icon="${icon}"
               .clickable="${true}"
               text="${text}"
            ></component-icon-with-text>
         </effect-ripple>
      `;
   }
}
