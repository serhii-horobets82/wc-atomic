import {LinkComponent} from '../atoms/link/component';
import {AbstractComponent} from './component/component';
import {TextComponent} from '../atoms/text/component';
import {ButtonComponent} from '../atoms/button/component';
import {CheckboxComponent} from '../input/checkbox/component';
import {CodeComponent} from '../atoms/code/component';
import {ComboboxComponent} from '../input/combobox/component';
import {ImgComponent} from '../atoms/img/component';
import {IconComponent} from '../atoms/icon/component';
import {TextareaComponent} from '../input/textarea/component';
import {InputComponent} from '../input/input/component';
import {FormElementComponent} from '../atoms/form-element/component';
import {SearchComponent} from '../molecules/search/component';
import {H1Component, H2Component, H3Component} from '../atoms/h/component';
import {AccordionComponent} from '../organisms/accordion/container/component';
import {ComponentViewerComponent} from '../molecules/component-viewer/component';
import {ImgSliderComponent} from '../molecules/img-slider/component';
import {ImgSliderSelectorComponent} from '../molecules/img-slider-selector/component';
import {TableComponent} from '../organisms/table/component';
import {TeaserComponent} from '../molecules/teaser/component';
import {NavigationComponent} from '../atoms/navigation/component';
import {AbstractInputData} from './component/model';
import {FormComponent} from '../organisms/form/component';
import {FlexComponent} from '../organisms/flex-container/component';
import {TileComponent} from '../molecules/tile/component';
import {BreadcrumbComponent} from "../molecules/breadcrumb/component";
import {ToolbarComponent} from "../organisms/toolbar/component";
import {TextWithHeaderComponent} from "../molecules/text-with-header/component";
import {DatalistComponent} from "../input/datalist/component";
import {AuthenticatedIconComponent} from "../molecules/authenticated-icon/component";
import {SpacerComponent} from "../atoms/spacer/component";

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
            case FormElementComponent.IDENTIFIER:
                component = new FormElementComponent();
                break;
            case CheckboxComponent.IDENTIFIER:
                component = new CheckboxComponent();
                break;
            case SpacerComponent.IDENTIFIER:
                component = new SpacerComponent();
                break;
            case InputComponent.IDENTIFIER:
                component = new InputComponent();
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
            case DatalistComponent.IDENTIFIER:
                component = new DatalistComponent();
                break;
            case CheckboxComponent.IDENTIFIER:
                component = new CheckboxComponent();
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
                throw new Error('Elemenent not found: ' + componentIdentifier);
        }

        if (component === undefined) {
            throw new Error("component is undefined ");
        }
        component.inputData = component.getDefaultInputData();

        return component;
    }
}
