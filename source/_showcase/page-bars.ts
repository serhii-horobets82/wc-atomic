import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { IconInputData, IconState } from '../icon/component';
import { FlexJustifyContent, TypographyInputData, TypographyType } from '..';
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
               ${this.createIcon('home', 'Zuhause')} ${this.createIcon('how_to_reg', 'Profil')}
               ${this.createIcon('camera_alt', 'Barcode')} ${this.createIcon('list_alt', 'Manager')}
               ${this.createIcon('trending_up', 'Training')} ${this.createIcon('import_export', '2,00')}
            </component-toolbar>
         </component-flex-container>
      `;
   }

   createIcon(icon: string, text: string) {
      return html`
         <component-icon-with-text
            .iconInputData="${<IconInputData>{
               iconState: IconState.ACTIVE_UNFOCUSED,
               icon: icon,
               clickable: true
            }}"
            .typographyInputData="${<TypographyInputData>{ text: text, typographyType: TypographyType.CAPTION }}"
         ></component-icon-with-text>
      `;
   }
}