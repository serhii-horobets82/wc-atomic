import { LinkComponent } from '../component/link/link';
import { AbstractComponent } from './abstract-component';
import { TextComponent } from '../component/text/text';
import { ButtonComponent } from '../atoms/button/button';
import { CheckboxComponent } from '../component/checkbox/checkbox';
import { CodeComponent } from '../component/code/code';
import { ColorComponent } from '../component/color/color';
import { ComboboxComponent } from '../component/combobox/combobox';
import { ImgComponent } from '../atoms/img/component';
import { IconComponent } from '../component/icon/icon';
import { TextareaComponent } from '../component/textarea/textarea';
import { DateComponent } from '../component/date/date';
import { TextfieldComponent } from '../component/textfield/textfield';
import { FormLabelComponent } from '../component/form/form-label';
import { SearchComponent } from '../component/search/search';
import { H1Component, H2Component, H3Component } from '../component/h/h';
import { ECommerceItemViewComponent } from '../component/e-commerce-item-view';
import { AccordionComponent } from '../organisms/accordion/component';
import { ComponentViewerComponent } from '../molecules/component-viewer/component';
import { ImgSliderComponent } from '../component/img-slider/img-slider';
import { ImgSliderSelectorComponent } from '../component/img-slider-selector/img-slider-selector';
import { TableComponent } from '../component/table/table';
import { TeaserComponent } from '../component/teaser/teaser';
import { NavigationComponent } from '../component/navigation/navigation';
import { RangeSliderComponent } from '../component/range-slider/range-slider';
import { AbstractInputData } from '../interface/atoms';
import { FormComponent } from '../component/form/form';
import { FlexComponent } from '../component/flex-container/flex-container';
import { TileComponent } from '../component/tile/tile';

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
