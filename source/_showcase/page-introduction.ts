import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import {TypographyTypes} from "..";

@customElement('page-introduction')
export class PageIntroduction extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`

         <component-flex-container containerClazz="container_50">
            <component-spacer clazz="maxPaddingTop"></component-spacer>
            <component-typography .type="${TypographyTypes.H2}">WC-Atomic</component-typography>
            <component-typography .type="${TypographyTypes.H3}">Build beautiful Webclients</component-typography>
            <component-typography>
               With WC-Atomic you can build beautiful websites. WC-Atomic is written in Webcomponents, Lit-Element and Typescript
               and open source project on github and npm
            </component-typography>
            <component-spacer clazz="maxPaddingTop"></component-spacer>
            <component-typography>
               <component-typography slot="header">Installation with NPM</component-typography>
            </component-typography>
            <component-typography>
               If you want to use the WC-Atomic Componentent Libary in your project, simple install via NPM:
            </component-typography>
            <component-code>npm install -g @domoskanonos/wc-atomic</component-code>
            <component-typography> or directly in your <b>package.json</b>: </component-typography>
            <component-code>"dependencies": { ..., "@domoskanonos/frontend-basis": "*" }</component-code>
            <component-typography>
               found sources on github:
            </component-typography>
            <component-code>https://github.com/domoskanonos/wc-atomic</component-code>
         </component-flex-container>
      `;
   }
}
