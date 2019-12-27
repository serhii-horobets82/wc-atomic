import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { ComboboxOption, HTMLInputTypes, SpacerSize, TypographyTypes } from '..';
import { SpacerAlignment } from '../spacer/component';

@customElement('page-introduction')
export class PageIntroduction extends PageAbstract {
   getTopContent(): TemplateResult {
      return html`
         <component-top-app-bar>
            <component-spacer slot="leftComponents" clazz="mediumPaddingLeft"></component-spacer>
            <component-icon slot="leftComponents" icon="menu" clickable="true"></component-icon>
            <component-spacer
               slot="leftComponents"
               size="${SpacerSize.SMALL}"
               alignment="${SpacerAlignment.HORIZONTAL}"
            ></component-spacer>
            <component-typography slot="leftComponents" type="${TypographyTypes.H6}">Introduction</component-typography>
            <component-icon slot="rightComponents" icon="search" clickable="true"></component-icon>
         </component-top-app-bar>
      `;
   }

   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container containerClazz="container_100" .itemFlexBasisValues="${['33%', '66%']}">
            <component-rich-media src="https://picsum.photos/600/480" text="Mein Bild"></component-rich-media>
            <component-typography>
               With WC-Atomic you can build beautiful websites. WC-Atomic is written in Webcomponents, Lit-Element and Typescript
               and open source project on github and npm
            </component-typography>
         </component-flex-container>

         <component-flex-container containerClazz="container_50" itemFlexBasisValue="100%">
            <component-spacer clazz="maxPaddingTop"></component-spacer>
            <component-typography .type="${TypographyTypes.H2}">WC-Atomic</component-typography>
            <component-typography .type="${TypographyTypes.H3}">Build beautiful Webclients</component-typography>
            <component-typography>
               With WC-Atomic you can build beautiful websites. WC-Atomic is written in Webcomponents, Lit-Element and Typescript
               and open source project on github and npm
            </component-typography>
            <component-spacer clazz="mediumPaddingTop"></component-spacer>
            <component-typography .type="${TypographyTypes.H3}">Installation with NPM</component-typography>
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
