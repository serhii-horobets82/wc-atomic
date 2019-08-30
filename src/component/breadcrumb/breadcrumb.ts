import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent } from '../../abstract/abstract-component';
import { Breadcrumb, Link } from '../../interface/atoms';
import { LinkComponent } from '../link/link';
import { guard } from 'lit-html/directives/guard';
import { repeat } from 'lit-html/directives/repeat';

const componentCSS = require('./breadcrumb.scss');

@customElement('component-breadcrumb')
export class BreadcrumbComponent extends AbstractComponent<
   Breadcrumb,
   undefined
> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'BreadcrumbComponent';

   @property()
   links: Link[];

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

   getDefaultInputData(): Breadcrumb {
      return <Breadcrumb>{
         componentIdentifier: BreadcrumbComponent.IDENTIFIER,
         links: [
            <Link>{
               componentIdentifier: LinkComponent.IDENTIFIER,
               text: 'IT-Katalog Rhenus',
               href: ''
            },
            <Link>{
               componentIdentifier: LinkComponent.IDENTIFIER,
               text: 'Software & Accounts',
               href: ''
            },
            <Link>{
               componentIdentifier: LinkComponent.IDENTIFIER,
               text: 'Geschäftsanwendungen',
               href: ''
            }
         ]
      };
   }
}
