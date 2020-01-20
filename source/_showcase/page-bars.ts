import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { IconInputData, IconState } from '../icon/component';
import { FlexJustifyContent, TypographyInputData } from '..';
import { RouterService } from '@domoskanonos/frontend-basis';
import { ToolbarAlignment } from '../toolbar/component';

@customElement('page-bars')
export class PageBars extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         ojoijij
         <component-flex-container containerClazz="container_50" itemFlexBasisValue="100%">
            <component-top-app-bar>
               <component-icon slot="leftComponents" icon="menu" clickable="true"></component-icon>
               <component-typography slot="mainComponents">Mein Menü</component-typography>
               <component-icon slot="rightComponents" icon="search" clickable="true"></component-icon>
            </component-top-app-bar>
            ${this.createToolbar('primaryColor', ToolbarAlignment.HORIZONTAL, FlexJustifyContent.SPACE_AROUND, '100px', 'auto')}
            ${this.createToolbar(
               'secondaryColor',
               ToolbarAlignment.HORIZONTAL,
               FlexJustifyContent.SPACE_AROUND,
               '100px',
               '250px'
            )}
         </component-flex-container>

         <component-flex-container containerClazz="container_50" itemFlexBasisValue="25%">
            ${this.createToolbar('primaryColor', ToolbarAlignment.VERTICAL, FlexJustifyContent.SPACE_AROUND, 'auto', 'auto')}
            ${this.createToolbar('secondaryColor', ToolbarAlignment.VERTICAL, FlexJustifyContent.SPACE_AROUND, '150px', 'auto')}
            ${this.createToolbar('surfaceColor', ToolbarAlignment.VERTICAL, FlexJustifyContent.SPACE_AROUND, 'auto', '150px')}
         </component-flex-container>

         <component-flex-container containerClazz="container_50" itemFlexBasisValue="100%">
            <component-search-bar></component-search-bar>
         </component-flex-container>
      `;
   }

   private createToolbar(
      primaryColor: string,
      toolbarAlignment: string,
      flexJustifyContent: string,
      height: string,
      width: string
   ) {
      return html`
         <component-flex-container containerClazz="container_min_content ${primaryColor}" itemFlexBasisValue="100%">
            <component-toolbar
               height="${height}"
               width="${width}"
               .flexJustifyContent="${flexJustifyContent}"
               .toolbarAlignment="${toolbarAlignment}"
            >
               <component-icon-with-text
                  .iconInputData="${<IconInputData>{
                     iconState: IconState.ACTIVE_UNFOCUSED,
                     icon: 'home',
                     clickable: true
                  }}"
                  .typographyInputData="${<TypographyInputData>{ text: 'Kochbuch' }}"
               ></component-icon-with-text>
               <component-icon-with-text icon="how_to_reg" text="Profil"></component-icon-with-text>
               <component-icon-with-text icon="camera_alt" text="Barcode"></component-icon-with-text>
               <component-icon-with-text icon="list_alt" text="Manager"></component-icon-with-text>
               <component-icon-with-text icon="trending_up" text="Training"></component-icon-with-text>
               <component-icon-with-text icon="import_export" text="2,00"></component-icon-with-text>
            </component-toolbar>
         </component-flex-container>
      `;
   }
}
