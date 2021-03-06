import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import {
   AlignContent,
   AlignItems,
   FlexDirection,
   FlexJustifyContent,
   FlexWrap,
   RichMediaInputData,
   SpacerSize,
   TypographyInputData,
   TypographyType
} from '..';
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
               spacerSize="${SpacerSize.SMALL}"
               alignment="${SpacerAlignment.HORIZONTAL}"
            ></component-spacer>
            <component-typography slot="leftComponents" type="${TypographyType.H6}">Introduction</component-typography>
            <component-icon slot="rightComponents" icon="search" clickable="true"></component-icon>
         </component-top-app-bar>
      `;
   }

   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container
            .containerClazzes="${["CONTAINER_100"]}"
            .direction="${FlexDirection.ROW}"
            .wrap="${FlexWrap.WRAP}"
            .flexJustifyContent="${FlexJustifyContent.CENTER}"
            .alignItems="${AlignItems.CENTER}"
            .alignContent="${AlignContent.FLEX_START}"
            itemFlexBasisValue="50%"
         >
            <component-flex-container .containerClazzes="${["CONTAINER_75"]}" itemFlexBasisValue="100%">
               <component-typography .typographyType="${TypographyType.H2}">WC-Atomic</component-typography>
               <component-typography .typographyType="${TypographyType.H6}"
                  >Erstelle wunderbare PWA Single Page Anwendungen</component-typography
               >
               <component-typography>
                  WC-Atomic ist ein Open Source Projekt mit dem sie moderne PWA und Single Page Anwendungen bauen können. Das
                  Framework basiert auf
                  <component-link href="https://lit-element.polymer-project.org/">Lit-Element</component-link> und Typescript.
               </component-typography>
            </component-flex-container>

            <component-rich-media src="https://picsum.photos/1200/400" text="Mein Bild"></component-rich-media>
         </component-flex-container>

         <component-flex-container
            .containerClazzes="${["CONTAINER_100"]}"
            .direction="${FlexDirection.ROW}"
            .wrap="${FlexWrap.WRAP}"
            .flexJustifyContent="${FlexJustifyContent.CENTER}"
            .alignItems="${AlignItems.CENTER}"
            .alignContent="${AlignContent.FLEX_START}"
            itemFlexBasisValue="25%"
            
            
         >
            <component-rich-media src="https://picsum.photos/500/400" text="Mein Bild"></component-rich-media>
            <component-rich-media src="https://picsum.photos/550/400" text="Mein Bild"></component-rich-media>
            <component-rich-media src="https://picsum.photos/600/400" text="Mein Bild"></component-rich-media>

            <component-flex-container .containerClazzes="${["CONTAINER_75"]}" itemFlexBasisValue="100%">
               <component-typography .typographyType="${TypographyType.H4}">Bildquelle</component-typography>
               <component-typography .typographyType="${TypographyType.BODY1}">
                  Die hier abgebildeten Fotos stammen von:
                  <component-link href="https://picsum.photos">https://picsum.photos</component-link></component-typography
               >
            </component-flex-container>
         </component-flex-container>

         <component-flex-container .containerClazzes="${["CONTAINER_75"]}" itemFlexBasisValue="100%">
            <component-spacer spacerSize="${SpacerSize.MEDIUM}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
            <component-typography .typographyType="${TypographyType.H4}">Installation und Quelldateien</component-typography>
            <component-spacer spacerSize="${SpacerSize.MEDIUM}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>

            <component-flex-container
               .containerClazzes="${["CONTAINER_100"]}"
               itemFlexBasisValue="33.3%"
               
            >
               <component-card>
                  <component-card-primary-title>
                     <component-primary-title
                        .richMedia="${<RichMediaInputData>{ src: 'https://picsum.photos/50/50' }}"
                        .primaryTitle="${<TypographyInputData>{
                           typographyType: TypographyType.H4,
                           text: 'Installation'
                        }}"
                        .secondaryTitle="${<TypographyInputData>{
                           typographyType: TypographyType.SUBTITLE2,
                           text: 'für Node JS and npm'
                        }}"
                     ></component-primary-title>
                  </component-card-primary-title>
                  <component-card-supporting-text>
                     <component-code>npm install -g @domoskanonos/wc-atomic</component-code>
                  </component-card-supporting-text>

                  <component-card-actions>
                     <component-flex-container>
                        <component-toolbar .flexJustifyContent="${FlexJustifyContent.FLEX_END}">
                           <component-icon icon="favorite_border"></component-icon>
                           <component-icon icon="star_border"></component-icon>
                           <component-icon icon="star_border"></component-icon>
                        </component-toolbar>
                     </component-flex-container>
                  </component-card-actions>
               </component-card>

               <component-card>
                  <component-card-primary-title>
                     <component-primary-title
                        .richMedia="${<RichMediaInputData>{ src: 'https://picsum.photos/50/50' }}"
                        .primaryTitle="${<TypographyInputData>{
                           typographyType: TypographyType.H4,
                           text: 'Referenzieren'
                        }}"
                        .secondaryTitle="${<TypographyInputData>{
                           typographyType: TypographyType.SUBTITLE2,
                           text: 'Als Abhängigkeit in die package.json eintragen'
                        }}"
                     ></component-primary-title>
                  </component-card-primary-title>
                  <component-card-supporting-text>
                     <component-code>"dependencies": { ..., "@domoskanonos/frontend-basis": "*" }</component-code>
                  </component-card-supporting-text>

                  <component-card-actions>
                     <component-flex-container>
                        <component-toolbar .flexJustifyContent="${FlexJustifyContent.FLEX_END}">
                           <component-icon icon="favorite_border"></component-icon>
                           <component-icon icon="star_border"></component-icon>
                           <component-icon icon="star_border"></component-icon>
                        </component-toolbar>
                     </component-flex-container>
                  </component-card-actions>
               </component-card>

               <component-card>
                  <component-card-primary-title>
                     <component-primary-title
                        .primaryTitle="${<TypographyInputData>{
                           typographyType: TypographyType.H4,
                           text: 'Quelldateien'
                        }}"
                        .secondaryTitle="${<TypographyInputData>{
                           typographyType: TypographyType.SUBTITLE2,
                           text: 'Quelldateien als Open Source auf Github'
                        }}"
                     ></component-primary-title>
                  </component-card-primary-title>
                  <component-card-supporting-text>
                     <component-link href="https://github.com/domoskanonos/wc-atomic"
                        >https://github.com/domoskanonos/wc-atomic</component-link
                     >
                  </component-card-supporting-text>

                  <component-card-actions>
                     <component-flex-container>
                        <component-toolbar .flexJustifyContent="${FlexJustifyContent.FLEX_END}">
                           <component-icon icon="favorite_border"></component-icon>
                           <component-icon icon="star_border"></component-icon>
                           <component-icon icon="star_border"></component-icon>
                        </component-toolbar>
                     </component-flex-container>
                  </component-card-actions>
               </component-card>
            </component-flex-container>
         </component-flex-container>
      `;
   }
}
