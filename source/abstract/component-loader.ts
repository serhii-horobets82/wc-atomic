import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { ButtonComponent } from '../button/component';
import { CodeComponent } from '../code/component';
import { RichMediaComponent } from '../rich-media/component';
import { IconComponent } from '../icon/component';
import { InputfieldComponent } from '../inputfield/component';
import { AccordionComponent } from '../accordion/container/component';
import { ImgSliderComponent } from '../img-slider/component';
import { ImgSliderSelectorComponent } from '../img-slider-selector/component';
import { TableComponent } from '../table/component';
import { TeaserComponent } from '../teaser/component';
import { NavigationComponent } from '../navigation/component';
import { FormComponent } from '../form/component';
import { FlexComponent } from '../flex-container/component';
import { TileComponent } from '../tile/component';
import { BreadcrumbComponent } from '../breadcrumb/component';
import { ToolbarComponent } from '../toolbar/component';
import { TextWithHeaderComponent } from '../text-with-header/component';
import { AuthenticatedIconComponent } from '../authenticated-icon/component';
import { SpacerComponent } from '../spacer/component';
import { I18NSelectorComponent } from '../i18n-selector/component';
import { ListComponent } from '../list/container/component';
import { ListItemComponent } from '../list/item/component';
import {TypographyComponent} from "../typography/component";
import { LinkComponent } from '../link/component';


export class ComponentLoader {

   private static uniqueInstance: ComponentLoader;

   static getUniqueInstance() {
      if (!ComponentLoader.uniqueInstance) {
         ComponentLoader.uniqueInstance = new ComponentLoader();
      }
      return ComponentLoader.uniqueInstance;
   }

   public createComponentFromInputData(componentInputData: AbstractInputData): AbstractComponent<AbstractInputData, any> {
      let component = this.createComponent(componentInputData.componentIdentifier);
      component.inputData = componentInputData;
      return component;
   }

   public createComponent(componentIdentifier: string): AbstractComponent<AbstractInputData, any> {
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
         case TypographyComponent.IDENTIFIER:
            component = new TypographyComponent();
            break;
         case FormComponent.IDENTIFIER:
            component = new FormComponent();
            break;
         case SpacerComponent.IDENTIFIER:
            component = new SpacerComponent();
            break;
         case InputfieldComponent.IDENTIFIER:
            component = new InputfieldComponent();
            break;
         case IconComponent.IDENTIFIER:
            component = new IconComponent();
            break;
         case RichMediaComponent.IDENTIFIER:
            component = new RichMediaComponent();
            break;
         case CodeComponent.IDENTIFIER:
            component = new CodeComponent();
            break;
         case ButtonComponent.IDENTIFIER:
            component = new ButtonComponent();
            break;
         case I18NSelectorComponent.IDENTIFIER:
            component = new I18NSelectorComponent();
            break;
         case LinkComponent.IDENTIFIER:
            component = new LinkComponent();
            break;
         case AccordionComponent.IDENTIFIER:
            component = new AccordionComponent();
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
         case ListComponent.IDENTIFIER:
            component = new ListComponent();
            break;
         case ListItemComponent.IDENTIFIER:
            component = new ListItemComponent();
            break;
         case NavigationComponent.IDENTIFIER:
            component = new NavigationComponent();
            break;
         case BreadcrumbComponent.IDENTIFIER:
            component = new BreadcrumbComponent();
            break;
         case ToolbarComponent.IDENTIFIER:
            component = new ToolbarComponent();
            break;
         case TextWithHeaderComponent.IDENTIFIER:
            component = new TextWithHeaderComponent();
            break;
         case AuthenticatedIconComponent.IDENTIFIER:
            component = new AuthenticatedIconComponent();
            break;
         default:
            let error = new Error('Elemenent not found: ' + componentIdentifier);
            console.error('AAAAAAAAAAAAAA' + error.stack);
            throw error;
      }

      if (component === undefined) {
         throw new Error('component is undefined ');
      }
      //component.inputData = component.getDefaultInputData();

      return component;
   }
}
