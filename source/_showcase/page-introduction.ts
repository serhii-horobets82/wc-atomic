import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';

@customElement('page-introduction')
export class PageIntroduction extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container gridClazz="grid_50">
            <component-spacer clazz="maxPaddingTop"></component-spacer>
            <component-h>
               <component-text slot="header">WC-Atomic</component-text>
               <component-text slot="subheader">Build beautiful Webclients</component-text>
            </component-h>
            <component-text>
               With WC-Atomic you can build beautiful websites. WC-Atomic is written in Webcomponents, Lit-Element and Typescript
               and open source project on github and npm
            </component-text>
            <component-spacer clazz="maxPaddingTop"></component-spacer>
            <component-h>
               <component-text slot="header">Installation with NPM</component-text>
            </component-h>
            <component-text>
               If you want to use the WC-Atomic Componentent Libary in your project, simple install via NPM:
            </component-text>
            <component-code>npm install -g @domoskanonos/wc-atomic</component-code>
            <component-text> or directly in your <b>package.json</b>: </component-text>
            <component-code>"dependencies": { ..., "@domoskanonos/frontend-basis": "*" }</component-code>

            <component-text>
               found sources on github:
            </component-text>
            <component-code>https://github.com/domoskanonos/wc-atomic</component-code>
         </component-flex-container>
      `;
   }
}
