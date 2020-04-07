import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../../abstract-component/component';
import {BasicService} from '@domoskanonos/frontend-basis';
import {AlignContent, AlignItems, BorderType, FlexJustifyContent, FlexWrap} from '../..';
import {ContainerClazzValues} from '../../flex-container/component';

const componentCSS = require('./component.css');

export class ListItemInputData extends AbstractInputData {
    selected: boolean = false;
    selectMode: boolean = false;
    content?: AbstractInputData[];
}

@customElement('component-list-item')
export class ListItemComponent extends AbstractComponent<ListItemInputData, any> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'ListItemComponent';

    static EVENT_LIST_ITEM_CLICKED: string = 'component-list-item-clicked';

    @property()
    content: AbstractInputData[] = [];

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
        BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, ListItemComponent.EVENT_LIST_ITEM_CLICKED);
    }

    switchSelected() {
        this.selected = !this.selected;
    }

    getOutputData(): any {
        return {};
    }

    protected inputDataChanged() {
        this.content = BasicService.getUniqueInstance().getValue(this.inputData.content, '');
        this.selectMode = BasicService.getUniqueInstance().getValue(this.inputData.selectMode, false);
        this.selected = BasicService.getUniqueInstance().getValue(this.inputData.selected, false);
    }
}
