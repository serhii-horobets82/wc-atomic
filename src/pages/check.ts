import { customElement, TemplateResult, html } from 'lit-element';
import {BlankTemplate} from "../templates/blank-template";


@customElement('page-check')
export class CheckPage extends BlankTemplate {
   constructor() {
      super();
   }

   getContent(): TemplateResult {
      return html`
         <component-img src="https://picsum.photos/300/300"></component-img>
         
         
         <component-img src="https://picsum.photos/300/300" clazz="clickable"></component-img>

         <component-img src="https://picsum.photos/300/300" clazz="zoomImageWrapped"></component-img>
         
         <div>Ein DIV für Anky :-)</div>
         
         
      `;
   }
}
