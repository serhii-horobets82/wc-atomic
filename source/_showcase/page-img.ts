import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputComponent } from '../input/component';
import {ImgComponent, ImgInputData} from "../img/component";
import {TypographyTypes} from "../a";

@customElement('page-img')
export class PageImgComponent extends PageAbstract {
    getMainComponent(): TemplateResult {
        return html`
        
        
         <component-flex-container containerClazz="container_50">
         
        
        <component-teaser>
                        <component-teaser-element slot="content" selected="true">
                            <component-img slot="background" cssStyle="height:600px;" src="https://picsum.photos/800/500"></component-img>
                            <component-spacer clazz="minPadding" slot="foreground">
                                <component-typography .type="${TypographyTypes.H6}" text="[1] Lorem ipsum dolor sit amet"></component-typography>
                                <component-typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
                           suscipit, quam beatae rerum inventore consectetur</component-typography>
                            </component-spacer>
                        </component-teaser-element>
                        <component-teaser-element slot="content">
                            <component-img slot="background" cssStyle="height:600px;" src="https://picsum.photos/300/300"></component-img>
                            <component-spacer clazz="minPadding" slot="foreground">
                                <component-typography .type="${TypographyTypes.H6}" text="[2] Lorem ipsum dolor sit amet"></component-typography>
                                <component-typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
                           suscipit, quam beatae rerum inventore consectetur</component-typography>
                            </component-spacer>
                        </component-teaser-element>
                        <component-teaser-element slot="content">
                            <component-img slot="background" cssStyle="height:600px;" src="https://picsum.photos/500/500"></component-img>
                            <component-spacer clazz="minPadding" slot="foreground">
                                <component-typography .type="${TypographyTypes.H6}" text="[3] Lorem ipsum dolor sit amet"></component-typography>
                                <component-typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
                           suscipit, quam beatae rerum inventore consectetur</component-typography>
                            </component-spacer>
                        </component-teaser-element>
                        <component-teaser-element slot="content">
                            <component-img slot="background" cssStyle="height:600px;" src="https://picsum.photos/400/400"></component-img>
                            <component-spacer clazz="minPadding" slot="foreground">
                                <component-typography .type="${TypographyTypes.H6}" text="[4] Lorem ipsum dolor sit amet"></component-typography>
                                <component-typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
                           suscipit, quam beatae rerum inventore consectetur</component-typography>
                            </component-spacer>
                        </component-teaser-element>
                        <component-teaser-menu-element slot="menu" selected="true"></component-teaser-menu-element>
                        <component-teaser-menu-element slot="menu"></component-teaser-menu-element>
                        <component-teaser-menu-element slot="menu"></component-teaser-menu-element>
                        <component-teaser-menu-element slot="menu"></component-teaser-menu-element>
                    </component-teaser> 
        
         
            <component-img src="https://picsum.photos/300/300" text="Mein Bild"></component-img>
            
            <component-img clazz="roundImage" src="https://picsum.photos/300/300"></component-img>

            <component-img clazz="zoomImageWrapped" src="https://picsum.photos/300/300"></component-img>

            <component-img clazz="clickable" src="https://picsum.photos/300/300"></component-img>
            
            
         </component-flex-container>
        
`;
}
}
