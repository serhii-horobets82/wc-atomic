import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputComponent } from '../input/component';
import {RichMediaComponent, RichMediaInputData} from "../rich-media/component";
import {TypographyTypes} from "../typography/component";

@customElement('page-img')
export class PageImgComponent extends PageAbstract {
    getMainComponent(): TemplateResult {
        return html`
        
        
         <component-flex-container containerClazz="container_50">
         
        
        <component-teaser>
                        <component-teaser-element slot="content" selected="true">
                            <component-rich-media slot="background" cssStyle="height:600px;" src="https://picsum.photos/800/500"></component-rich-media>
                            <component-spacer clazz="minPadding" slot="foreground">
                                <component-typography .type="${TypographyTypes.H6}" text="[1] Lorem ipsum dolor sit amet"></component-typography>
                                <component-typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
                           suscipit, quam beatae rerum inventore consectetur</component-typography>
                            </component-spacer>
                        </component-teaser-element>
                        <component-teaser-element slot="content">
                            <component-rich-media slot="background" cssStyle="height:600px;" src="https://picsum.photos/300/300"></component-rich-media>
                            <component-spacer clazz="minPadding" slot="foreground">
                                <component-typography .type="${TypographyTypes.H6}" text="[2] Lorem ipsum dolor sit amet"></component-typography>
                                <component-typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
                           suscipit, quam beatae rerum inventore consectetur</component-typography>
                            </component-spacer>
                        </component-teaser-element>
                        <component-teaser-element slot="content">
                            <component-rich-media slot="background" cssStyle="height:600px;" src="https://picsum.photos/500/500"></component-rich-media>
                            <component-spacer clazz="minPadding" slot="foreground">
                                <component-typography .type="${TypographyTypes.H6}" text="[3] Lorem ipsum dolor sit amet"></component-typography>
                                <component-typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
                           suscipit, quam beatae rerum inventore consectetur</component-typography>
                            </component-spacer>
                        </component-teaser-element>
                        <component-teaser-element slot="content">
                            <component-rich-media slot="background" cssStyle="height:600px;" src="https://picsum.photos/400/400"></component-rich-media>
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
        
         
            <component-rich-media src="https://picsum.photos/300/300" text="Mein Bild"></component-rich-media>
            
            <component-rich-media clazz="roundImage" src="https://picsum.photos/300/300"></component-rich-media>

            <component-rich-media clazz="zoomImageWrapped" src="https://picsum.photos/300/300"></component-rich-media>

            <component-rich-media clazz="clickable" src="https://picsum.photos/300/300"></component-rich-media>
            
            
         </component-flex-container>
        
`;
}
}
