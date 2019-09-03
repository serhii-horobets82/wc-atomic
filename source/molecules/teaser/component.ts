import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {ImgComponent} from '../../atoms/img/component';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {TextComponent} from '../../atoms/text/component';
import {ComponentLoader} from '../../abstract/component-loader';
import {ImgModel} from "../../atoms/img/model";
import {Button} from "../../atoms/button/model";
import {TextInputData} from "../../atoms/text/model";
import {TeaserContainerInputData, TeaserElementInputData} from "./model";

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
   items: TeaserElementInputData[];

   render() {
      return html`
         <div class="viewport">
            ${guard(
               [this.items],
               () =>
                  html`
                     ${repeat(
                        this.items,
                        (item, index) => html`
                           <div class="item ${item.selected ? 'selected' : ''}">
                              <div class="background">
                                 ${ComponentLoader.INSTANCE.createComponentFromInputData(
                                    item.img
                                 )}
                              </div>

                              <div class="foreground">
                                 ${ComponentLoader.INSTANCE.createComponentFromInputData(
                                    item.content
                                 )}
                              </div>
                           </div>
                        `
                     )}
                  `
            )}

            <div class="menu">
               ${guard(
                  [this.items],
                  () =>
                     html`
                        ${repeat(
                           this.items,
                           (item) => html`
                              <div
                                 class="menuItem ${item.selected
                                    ? 'selected'
                                    : ''}"
                                 @click="${() => this.toogle(item)}"
                              ></div>
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

      this.items.forEach((value, index) => {
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
            <TeaserElementInputData>{
               selected: true,
               img: <ImgModel>{
                  componentIdentifier: ImgComponent.IDENTIFIER,
                  src: 'https://picsum.photos/800/300',
                  clazz: 'imageWidthHundred',
                  text: ''
               },
               content: <TextInputData>{
                  componentIdentifier: TextComponent.IDENTIFIER,
                  text: 'Lorem Ipsum 1'
               }
            },
            <TeaserElementInputData>{
               selected: false,
               img: <ImgModel>{
                  componentIdentifier: ImgComponent.IDENTIFIER,
                  src: 'https://picsum.photos/800/400',
                  clazz: 'imageWidthHundred',
                  text: ''
               },
               content: <TextInputData>{
                  componentIdentifier: TextComponent.IDENTIFIER,
                  text: 'Lorem Ipsum 3'
               }
            }
         ]
      };
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
      this.items = this.inputData.items;
   }
}
