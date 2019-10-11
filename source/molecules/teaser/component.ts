import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {ImgComponent} from '../../atoms/img/component';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {TextComponent} from '../../atoms/text/component';
import {TextWithHeaderComponent} from "../text-with-header/component";
import {TeaserContainerInputData} from "./model";
import {TeaserElementInputData} from "./teaser-element/model";
import {ImgModel} from "../../atoms/img/model";
import {TeaserElementComponent} from "./teaser-element/component";

const componentCSS = require('./component.css');

@customElement('component-teaser')
export class TeaserComponent extends AbstractComponent<
   TeaserContainerInputData,
   undefined
> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'TeaserComponent';

   @property()
   items: TeaserElementInputData[] = [];

   render() {
      return html`
         <div class="viewport">
            ${guard(
               [this.items],
               () =>
                  html`
                     ${repeat(
                        this.items,
                      (item) => html`
                            <component-teaser-element selected="${item.selected}" .foregroundContent="${item.foregroundContent}" .backgroundContent="${item.backgroundContent}"></component-teaser-element>
                        `
                     )}
                  `
            )}
            <slot id="content"></slot>

            <div class="menu">
               ${guard(
                  [this.items],
                  () =>
                     html`
                        ${repeat(
                           this.items,
                           (item) => html`
                              <component-teaser-menu-element @click="${() => this.toogle(item)}" selected=${item.selected}></component-teaser-menu-element>
                           `
                        )}
                     `
               )}
            </div>
         </div>
      `;
   }

   async toogle(item: TeaserElementInputData) {
      console.log('item clicked, state=' + item.selected);

      this.items.forEach((value) => {
         value.selected = false;
      });
      item.selected = !item.selected;
      this.items = this.items.map((item) => item);

      console.log('item clicked, after state=' + item.selected);
   }

   getDefaultInputData(): TeaserContainerInputData {
      return <TeaserContainerInputData>{
         componentIdentifier: TeaserComponent.IDENTIFIER,
         items: [
            new TeaserElementComponent().getDefaultInputData(),
            new TeaserElementComponent().getDefaultInputData(),
            new TeaserElementComponent().getDefaultInputData(),
            new TeaserElementComponent().getDefaultInputData()]
      };
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
      this.items = this.inputData.items;
   }
}
