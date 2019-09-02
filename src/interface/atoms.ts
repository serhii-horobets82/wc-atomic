import {ImgModel} from "../atoms/img/model";

export interface AbstractInputData {
   componentIdentifier: string;
}

export interface RangeSliderIf extends AbstractInputData {
   value: string;
   name: string;
   min: number;
   max: number;
}

/**
 *
 * maxHeight:
 * limit the size of the slider,
 * if horizontal is maxHeight = maxWidth,
 * if vertical is maxHeight = maxHeight
 *
 * sliderType:
 * 1 = Horizontal
 * 2 = Vertical
 */
export interface ImgSlider extends AbstractInputData {
   sliderType: number;
   maxSize: string;
   imgs: ImgModel[];
}

export interface ImgSliderSelector extends AbstractInputData {
   columnFlexBasisValues: string[];
   imgSlider: ImgSlider;
}

/**
 * iconClazz:
 * clazzName for the icon
 *
 * clickable:
 * if true, mouse is cursor type pointer and a event is pushed.
 *
 * status:
 * 1 = normal
 * 2 = aktiv
 * 3 = passiv
 */
export interface Icon extends AbstractInputData {
   iconClazz: string;
   clickable: boolean;
   status: number;
}

export interface Link extends AbstractInputData {
   text: string;
   href: string;
}

export interface Breadcrumb extends AbstractInputData {
   links: Link[];
}

export interface IconGroup extends AbstractInputData {
   clazz?: string;
   icons: Icon[];
}

export interface Textfield extends AbstractInputData {
   name: string;
   value?: string;
   placeholder?: string;
   maxlength?: number;
   size?: number;
}

export interface Button extends AbstractInputData {
   clazz: string;
   text: string;
   href: string;
   clickEventData?: any;
   icon?: Icon;
}

export interface Tile extends AbstractInputData {
   componentInputData: AbstractInputData;
}

export interface ECommerceItem extends AbstractInputData {
   price: number;
   oldPrice: number;
   buttonInputData: Button;
   description: string;
   ean: string;
   productImgs: ImgModel[];
}

export interface ECommerceTileList extends AbstractInputData {
   gridClazz: string;
   columnFlexBasisValue?: string;
   items: ECommerceItem[];
}

export interface Toolbar extends AbstractInputData {
   leftInputData: AbstractInputData[];
   mainInputData: AbstractInputData[];
   rightInputData: AbstractInputData[];
}

export interface ContentSlider extends AbstractInputData {
   open: boolean;
   componentInputData: AbstractInputData;
}

export interface FlexContainer extends AbstractInputData {
   gridClazz?: string;
   itemClazz?: string;
   columnFlexBasisValue?: string;
   columnFlexBasisValues?: string[];
   componentsInputData: AbstractInputData[];
}

export interface FormComponentModel extends AbstractInputData {
   gridClazz?: string;
   columnClazz?: string;
   buttonInputDatas?: Button[];
   flexContainerInputData: FlexContainer;
}

export interface FormElement extends AbstractInputData {
   label: string;
   componentData: any;
}

export interface TableHeader extends AbstractInputData {
   text: string;
   width: string;
}

export interface Column {
   componentContent: AbstractInputData;
}

export interface Row {
   colums: Column[];
}

export interface Table extends AbstractInputData {
   headers: TableHeader[];
   rows: Row[];
}

export interface Text extends AbstractInputData {
   text: string;
   clazz?: string;
   cssStyle?: string;
}

export interface Checkbox extends AbstractInputData {
   checked: boolean;
   name: string;
}

export interface ComboboxOption {
   value: string;
   text: string;
}

export interface Combobox extends AbstractInputData {
   name: string;
   size: number;
   options: ComboboxOption[];
}

export interface DataProtectionModel extends AbstractInputData {
   buttonInputData: Button;
   lawtext: string;
}

export interface H extends AbstractInputData {
   headerType: number;
   headerText: string;
   subheaderText: string;
   clazz: string;
}

export interface NavigationLink extends Link {
   icon: string;
}

export interface Navigation extends AbstractInputData {
   links: NavigationLink[];
}

export interface Search extends AbstractInputData {
}

export interface TeaserElement {
   selected: boolean;
   img: ImgModel;
   content: AbstractInputData;
}

export interface TeaserContainer extends AbstractInputData {
   items: TeaserElement[];
}

export interface Textarea extends AbstractInputData {
   name: string;
   value: string;
   rows?: number;
}