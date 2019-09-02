import { LinkComponent } from '../atoms/link/component';
import { AbstractComponent } from './abstract-component';
import { TextComponent } from '../atoms/text/component';
import { ButtonComponent } from '../atoms/button/component';
import { CheckboxComponent } from '../atoms/checkbox/component';
import { CodeComponent } from '../atoms/code/component';
import { ColorComponent } from '../atoms/color/color';
import { ComboboxComponent } from '../atoms/combobox/combobox';
import { ImgComponent } from '../atoms/img/component';
import { IconComponent } from '../atoms/icon/component';
import { TextareaComponent } from '../atoms/textarea/component';
import { DateComponent } from '../atoms/date/component';
import { TextfieldComponent } from '../atoms/textfield/component';
import { FormLabelComponent } from '../atoms/form-label/component';
import { SearchComponent } from '../molecules/search/search';
import { H1Component, H2Component, H3Component } from '../atoms/h/component';
import { ECommerceItemViewComponent } from '../component/e-commerce-item-view';
import { AccordionComponent } from '../organisms/accordion/container/component';
import { ComponentViewerComponent } from '../molecules/component-viewer/component';
import { ImgSliderComponent } from '../molecules/img-slider/img-slider';
import { ImgSliderSelectorComponent } from '../molecules/img-slider-selector/img-slider-selector';
import { TableComponent } from '../organisms/table/table';
import { TeaserComponent } from '../molecules/teaser/teaser';
import { NavigationComponent } from '../atoms/navigation/component';
import { RangeSliderComponent } from '../atoms/range-slider/component';
import { AbstractInputData } from '../interface/atoms';
import { FormComponent } from '../organisms/form/container/organism';
import { FlexComponent } from '../organisms/flex-container/flex-container';
import { TileComponent } from '../molecules/tile/tile';

export class ComponentLoader {
   static INSTANCE: ComponentLoader = new ComponentLoader();

   public createComponentFromInputData(
      componentInputData: AbstractInputData
   ): AbstractComponent<AbstractInputData, any> {
      let component = this.createComponent(
         componentInputData.componentIdentifier
      );
      component.inputData = componentInputData;
      return component;
   }

   public createComponent(
      componentIdentifier: string
   ): AbstractComponent<AbstractInputData, any> {
      console.log('create component, identifier=' + componentIdentifier);

      let component: AbstractComponent<any, any> | undefined = undefined;

      switch (componentIdentifier) {
         case FlexComponent.IDENTIFIER:
            component = new FlexComponent();
            break;
         case TileComponent.IDENTIFIER:
            component = new TileComponent();
            break;
         case TeaserComponent.IDENTIFIER:
            component = new TeaserComponent();
            break;
         case ECommerceItemViewComponent.IDENTIFIER:
            component = new ECommerceItemViewComponent();
            break;
         case SearchComponent.IDENTIFIER:
            component = new SearchComponent();
            break;
         case H1Component.IDENTIFIER:
            component = new H1Component();
            break;
         case H2Component.IDENTIFIER:
            component = new H2Component();
            break;
         case H3Component.IDENTIFIER:
            component = new H3Component();
            break;
         case FormComponent.IDENTIFIER:
            component = new FormComponent();
            break;
         case FormLabelComponent.IDENTIFIER:
            component = new FormLabelComponent();
            break;
         case CheckboxComponent.IDENTIFIER:
            component = new CheckboxComponent();
            break;
         case TextfieldComponent.IDENTIFIER:
            component = new TextfieldComponent();
            break;
         case DateComponent.IDENTIFIER:
            component = new DateComponent();
            break;
         case TextareaComponent.IDENTIFIER:
            component = new TextareaComponent();
            break;
         case IconComponent.IDENTIFIER:
            component = new IconComponent();
            break;
         case ImgComponent.IDENTIFIER:
            component = new ImgComponent();
            break;
         case ComboboxComponent.IDENTIFIER:
            component = new ComboboxComponent();
            break;
         case CheckboxComponent.IDENTIFIER:
            component = new CheckboxComponent();
            break;
         case ColorComponent.IDENTIFIER:
            component = new ColorComponent();
            break;
         case CodeComponent.IDENTIFIER:
            component = new CodeComponent();
            break;
         case TextComponent.IDENTIFIER:
            component = new TextComponent();
            break;
         case ButtonComponent.IDENTIFIER:
            component = new ButtonComponent();
            break;
         case LinkComponent.IDENTIFIER:
            component = new LinkComponent();
            break;
         case AccordionComponent.IDENTIFIER:
            component = new AccordionComponent();
            break;
         case ComponentViewerComponent.IDENTIFIER:
            component = new ComponentViewerComponent();
            break;
         case ImgSliderComponent.IDENTIFIER:
            component = new ImgSliderComponent();
            break;
         case ImgSliderSelectorComponent.IDENTIFIER:
            component = new ImgSliderSelectorComponent();
            break;
         case TableComponent.IDENTIFIER:
            component = new TableComponent();
            break;
         case NavigationComponent.IDENTIFIER:
            component = new NavigationComponent();
            break;
         case RangeSliderComponent.IDENTIFIER:
            component = new RangeSliderComponent();
            break;
         default:
            throw new Error('Elemenent not found: ' + componentIdentifier);
      }

      component.inputData = component.getDefaultInputData();

      return component;
   }
}
