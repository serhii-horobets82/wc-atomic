import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent } from '../../abstract-component/component';
import { LinkComponent } from '../../atoms/link/component';
import { guard } from 'lit-html/directives/guard';
import { repeat } from 'lit-html/directives/repeat';
import {BreadcrumbInputData} from "./model";
import {LinkInputData} from "../../atoms/link/model";

const componentCSS = require('./component.css');

@customElement('component-breadcrumb')
export class BreadcrumbComponent extends AbstractComponent<
   BreadcrumbInputData,
   undefined
> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'BreadcrumbComponent';

   @property()
   links: LinkInputData[] = [];

   render() {
      return html`
      
      <component-flex-container gridClazz="grid_100 alignItemsCenter">
         ${guard(
            this.links,
            () =>
               html`
                  ${repeat(
                     this.links,
                     (link, index) => html`
                        <component-icon
                           iconClazz="${index > 0 && index < this.links.length
                              ? 'fas fa-chevron-right'
                              : ''}"
                           clickable="false" .status="2"
                        ></component-icon>
                        <component-link .inputData="${link}"></component-link>
                     `
                  )}
               `
         )}
         
         </component-flex-container>
      `;
   }

   getOutputData(): undefined {
      return undefined;
   }

   inputDataChanged() {
      this.links = this.inputData.links;
   }

   getDefaultInputData(): BreadcrumbInputData {
      return <BreadcrumbInputData>{
         componentIdentifier: BreadcrumbComponent.IDENTIFIER,
         links: [
            <LinkInputData>{
               componentIdentifier: LinkComponent.IDENTIFIER,
               text: 'Mein Katalog',
               href: ''
            },
            <LinkInputData>{
               componentIdentifier: LinkComponent.IDENTIFIER,
               text: 'Meine Welt',
               href: ''
            },
            <LinkInputData>{
               componentIdentifier: LinkComponent.IDENTIFIER,
               text: 'Meine Anwendungen',
               href: ''
            }
         ]
      };
   }
}
