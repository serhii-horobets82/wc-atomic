import {baseHelper} from "../../util/base";
import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {AbstractComponent} from '../../abstract/component/component';
import {TeaserContainerInputData} from "./model";
import {TeaserElementInputData} from "./teaser-element/model";
import {TeaserElementComponent} from "./teaser-element/component";

const componentCSS = require('./component.css');

@customElement('component-teaser')
export class TeaserComponent extends AbstractComponent<TeaserContainerInputData,
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
                            <component-teaser-element .inputData="${item}"></component-teaser-element>
                        `
              )}
                  `
      )}
            <slot name="content"></slot>
            <div class="menu">
               ${guard(
          [this.items],
          () =>
              html`
                        ${repeat(
                  this.items,
                  (item) => html`
                              <component-teaser-menu-element @click="${() => this.selectItem(item)}" .inputData=${item}></component-teaser-menu-element>
                           `
              )}
                     `
      )}
                <slot name="menu"></slot>
            </div>
         </div>
      `;
   }

   selectItem(item: TeaserElementInputData) {
      console.log('item clicked, state=' + item.selected);

      this.items.forEach((value) => {
         value.selected = false;
      });

      item.selected = true;
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
      this.items = baseHelper.getValue(this.inputData.items, []);
      if (this.items.length > 0) {
         this.selectItem(this.items[0]);
      }
   }
}
