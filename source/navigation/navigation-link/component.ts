import { css, customElement, html, unsafeCSS, property } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../../abstract-component/component';
import { BasicService, RouterService } from '@domoskanonos/frontend-basis';
import { AlignContent, AlignItems, FlexDirection, FlexJustifyContent, FlexWrap, SpacerAlignment, SpacerSize } from '../..';
import { ContainerClazzValues } from '../../flex-container/component';

const componentCSS = require('./component.css');

export class NavigationLinkInputData extends AbstractInputData {
   icon?: string = '';
   text: string = '';
   href: string = '';
   rendered: boolean = true;
}

@customElement('component-navigation-link')
export class NavigationLinkComponent extends AbstractComponent<NavigationLinkInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'NavigationLinkComponent';

   @property()
   icon: string = '';

   @property()
   text: string = '';

   @property()
   href: string = '';

   @property()
   rendered: boolean = true;

   render() {
      return this.rendered
         ? html`
              <div
                 class="navItem"
                 class="${RouterService.getUniqueInstance().getPath() == this.href ? 'navItem selected' : 'navItem'}"
              >
                 <component-spacer spacerSize="${SpacerSize.SMALL}" alignment="${SpacerAlignment.HORIZONTAL}"
                    ><component-flex-container
                       @click="${() => this.linkClicked()}"
                       .containerClazzes="${[ContainerClazzValues.CONTAINER_100]}"
                       .itemClazzes="${[]}"
                       .flexDirection="${FlexDirection.ROW}"
                       .flexWrap="${FlexWrap.NO_WRAP}"
                       .flexJustifyContent="${FlexJustifyContent.FLEX_START}"
                       .alignItems="${AlignItems.CENTER}"
                       .alignContent="${AlignContent.FLEX_START}"
                       .itemFlexBasisValues="${['48px', '250px']}"
                    >
                       <component-icon icon="${this.icon}" .withIconSpace="${false}"></component-icon>
                       <component-typography>${this.text}</component-typography>
                    </component-flex-container>
                 </component-spacer>
              </div>
           `
         : html``;
   }

   protected inputDataChanged() {
      this.icon = BasicService.getUniqueInstance().getValue(this.inputData.icon, '');
      this.text = BasicService.getUniqueInstance().getValue(this.inputData.text, '');
      this.href = BasicService.getUniqueInstance().getValue(this.inputData.href, '');
      this.rendered = BasicService.getUniqueInstance().getValue(this.inputData.rendered, true);
   }

   getOutputData(): any {
      return {};
   }

   private linkClicked() {
      RouterService.getUniqueInstance().navigate(this.href);
   }
}
