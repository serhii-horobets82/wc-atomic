import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { TypographyInputData, TypographyType } from '../typography/component';
import {ColorScheme} from "..";

@customElement('page-get-started')
export class PageGetStarted extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-spacer></component-spacer>
         
         Problem 1: <br/>
         The ripple effect is not yet working properly. <br/>
1) If you click it, it will not start at the correct position. <br/>
2) The ripple effect should only be inside the button. <br/>
 <br/> <br/>
Please see the example on: <br/>
         https://material-components.github.io/material-components-web-catalog/#/component/ripple <br/> <br/>
         
         
         <component-button icon="menu">Hallo</component-button>

         <component-button height="100px" width="200px">Big hallo</component-button>

         <component-button height="200px" width="100px">Big hallo</component-button>
         
         
          <br/> <br/> <br/>
          
          Problem 2:
          
      `;
   }
}
