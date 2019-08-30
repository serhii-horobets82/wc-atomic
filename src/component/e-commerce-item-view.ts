import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent } from './abstract/abstract-component';
import {Button, ECommerceItem} from '../interface/atoms';
import { ButtonComponent } from './button/button';
import {ImgModel} from "../atoms/img/model";

const componentCSS = require('./e-commerce-item-view.scss');

@customElement('component-e-commerce-item-view')
export class ECommerceItemViewComponent extends AbstractComponent<
   ECommerceItem,
   undefined
> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ECommerceItemViewComponent';

   @property()
   buttonInputData: Button;

   @property()
   description: string;

   @property()
   ean: string;

   @property()
   price: number;

   @property()
   oldPrice: number;

   @property()
   productImgs: ImgModel[];

   primaryProductImg: ImgModel;

   render() {
      return html`
         <div class="item" style="height:100%;">
            <component-flex-container
               gridClazz="grid_100"
               itemClazz="minPaddingBottom"
               .columnFlexBasisValues="${[
                  '100%',
                  '100%',
                  '100%',
                  '40%',
                  '60%',
                  '50%',
                  '50%'
               ]}"
            >
               <component-img-slider-selector
                  .imgs="${this.productImgs}"
                  .selectedImg="${this.primaryProductImg}"
                  maxHeight="275px"
                  sliderType="2"
               ></component-img-slider-selector>
               <component-text
                  text="${this.ean}"
                  clazz="smallText ellipsis"
               ></component-text>
               <component-text
                  text="${this.description}"
                  clazz="smallText bold ellipsis"
               ></component-text>

               <component-flex-container
                  gridClazz="grid_100"
                  .columnClazzes="${['100%', '100%']}"
               >
                  <component-text
                     text="${this.oldPrice} &euro;"
                     clazz="smallText line-through"
                  ></component-text>
                  <component-text
                     text="${this.price} &euro;"
                     clazz="smallText bold"
                     class="sale"
                  ></component-text>
               </component-flex-container>

               <component-button
                  clazz="floatRight maxWidth"
                  .inputData="${this.buttonInputData}"
               ></component-button>

               <component-flex-container
                  gridClazz="grid_100"
                  .columnFlexBasisValues="${['100%']}"
               >
                  <component-icon iconClazz="fas fa-star"></component-icon>
               </component-flex-container>

               <component-flex-container
                  gridClazz="grid_100 alignItemsCenter"
                  .columnFlexBasisValues="${['35%', '65%']}"
               >
                  <component-icon
                     iconClazz="fas fa-cart-plus"
                     clickable="true"
                  ></component-icon>
                  <component-textfield
                     name="quantity"
                     placeholder="Menge"
                  ></component-textfield>
               </component-flex-container>
            </component-flex-container>
         </div>
      `;
   }

   protected inputDataChanged() {
      this.buttonInputData = this.inputData.buttonInputData;
      this.description = this.inputData.description;
      this.ean = this.inputData.ean;
      this.price = this.inputData.price;
      this.oldPrice = this.inputData.oldPrice;
      this.productImgs = this.inputData.productImgs;
      if (this.productImgs !== undefined && this.productImgs.length > 0) {
         this.primaryProductImg = this.inputData.productImgs[0];
      }
   }

   getDefaultInputData(): ECommerceItem {
      return <ECommerceItem>{
         componentIdentifier: ECommerceItemViewComponent.IDENTIFIER,
         buttonInputData: <Button>{
            componentIdentifier: ButtonComponent.IDENTIFIER,
            text: 'Zum Produkt'
         }
      };
   }

   getOutputData(): undefined {
      return undefined;
   }
}
