import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../../abstract-component/component';
import { BasicService } from '@domoskanonos/frontend-basis';
import { AlignContent, AlignItems, BorderType, FlexJustifyContent, FlexWrap } from '../..';
import { ContainerClazzValues } from '../../flex-container/component';

const componentCSS = require('./component.css');

export class ListItemInputData extends AbstractInputData {
   index: number = -1;
   selected: boolean = false;
   selectMode: boolean = false;
}

@customElement('component-list-item')
export class ListItemComponent extends AbstractComponent<ListItemInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ListItemComponent';

   static EVENT_LIST_ITEM_CLICKED: string = 'component-list-item-clicked';
   static EVENT_LIST_ITEM_SELECT: string = 'component-list-item-select';
   static EVENT_LIST_ITEM_UNSELECT: string = 'component-list-item-unselect';

   @property()
   index: number = -1;

   @property()
   selectMode: boolean = false;

   @property()
   selected: boolean = false;

   render() {
      return html`
         <component-border borderType="${BorderType.BOTTOM}">
            <component-flex-container
               .containerClazzes="${[ContainerClazzValues.CONTAINER_100, ContainerClazzValues.SMARTPHONE_MAX_WIDTH]}"
               itemFlexBasisValue="auto"
               .flexJustifyContent="${FlexJustifyContent.FLEX_START}"
               .alignItems="${AlignItems.CENTER}"
               .alignContent="${AlignContent.FLEX_START}"
               .flexWrap="${FlexWrap.WRAP}"
            >
               <component-icon
                  .rendered="${this.selectMode}"
                  @click="${() => this.switchSelected()}"
                  icon="${this.selected ? 'check_box' : 'check_box_outline_blank'}"
               ></component-icon>
               <slot @click="${() => this.itemClicked()}"></slot>
            </component-flex-container>
         </component-border>
      `;
   }

   itemClicked() {
      BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, ListItemComponent.EVENT_LIST_ITEM_CLICKED, this.index);
   }

   switchSelected() {
      this.selected = !this.selected;
      if (this.selected) {
         BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, ListItemComponent.EVENT_LIST_ITEM_SELECT, this.index);
      } else {
         BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, ListItemComponent.EVENT_LIST_ITEM_UNSELECT, this.index);
      }
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
      let defaultData: ListItemInputData = new ListItemInputData();
      this.selectMode = BasicService.getUniqueInstance().getValue(this.inputData.selectMode, defaultData.selectMode);
      this.selected = BasicService.getUniqueInstance().getValue(this.inputData.selected, defaultData.selected);
      this.index = BasicService.getUniqueInstance().getValue(this.inputData.index, defaultData.index);
   }
}
