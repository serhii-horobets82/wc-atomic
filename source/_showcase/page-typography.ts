import {customElement, html, TemplateResult} from 'lit-element';
import {PageAbstract} from './page-abstract';
import {InputComponent} from '../input/component';
import {HTypes} from '../typography/component';
import {SimpleTableRowData} from '../simple-table/component';
import {ComboboxOption} from '../combobox/component';

@customElement('page-typography')
export class PageTypographyComponent extends PageAbstract {
    getMainComponent(): TemplateResult {
        return html`
         <component-flex-container gridClazz="grid_50">
            <component-typography .hType="${HTypes.H2}">Typography</component-typography>
            <component-typography .hType="${HTypes.BODY1}">Some Content</component-typography>

            <component-typography .hType="${HTypes.H2}">Types of Typography</component-typography>

            <component-simple-table
               .headers="${[this.i18nService.getValue('typographyType'), this.i18nService.getValue('typographyTypeDescription')]}"
               .rows="${[
            <SimpleTableRowData>{columns: ['H1', 'Headline']},
            <SimpleTableRowData>{columns: ['H2', 'Headline']},
            <SimpleTableRowData>{columns: ['H3', 'Headline']},
            <SimpleTableRowData>{columns: ['H4', 'Headline']},
            <SimpleTableRowData>{columns: ['H5', 'Headline']},
            <SimpleTableRowData>{columns: ['H6', 'Headline']},
            <SimpleTableRowData>{columns: ['SUBTITLE1', '']},
            <SimpleTableRowData>{columns: ['SUBTITLE2', '']},
            <SimpleTableRowData>{columns: ['BODY1', 'long-form writing text']},
            <SimpleTableRowData>{columns: ['BODY2', 'long-form writing text']},
            <SimpleTableRowData>{columns: ['BUTTON', '']},
            <SimpleTableRowData>{columns: ['CAPTION', '']},
            <SimpleTableRowData>{columns: ['OVERLINE', '']}
        ]}"
            >
            </component-simple-table>

            <component-typography .hType="${HTypes.H2}">Properties of component</component-typography>

            <component-typography>Header</component-typography>

            <component-tabs>
               <component-tab slot="tab" selected="true" tabContentId="exampleContent"
                  >${this.i18nService.getValue('tab_example')}</component-tab
               >
               <component-tab slot="tab" tabContentId="htmlContent">${this.i18nService.getValue('tab_html')}</component-tab>
               <component-tab slot="tab" tabContentId="cssContent">${this.i18nService.getValue('tab_css')}</component-tab>
               <component-tab-content slot="tabContent" id="exampleContent" selected="true">
                  <component-tile cssStyle="height:500px;">
                     <h1>
                        <component-typography .hType="${HTypes.H1}">Headline 1</component-typography>
                        <component-typography .hType="${HTypes.H2}">Headline 2</component-typography>
                        <component-typography .hType="${HTypes.H3}">Headline 3</component-typography>
                        <component-typography .hType="${HTypes.H4}">Headline 4</component-typography>
                        <component-typography .hType="${HTypes.H5}">Headline 5</component-typography>
                        <component-typography .hType="${HTypes.H6}">Headline 6</component-typography>
                        <component-typography .hType="${HTypes.SUBTITLE1}">Subtitle 1</component-typography>
                        <component-typography .hType="${HTypes.SUBTITLE2}">Subtitle 2</component-typography>
                        <component-typography .hType="${HTypes.BODY1}" text=""
                           >Body 1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
                           suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos
                           laborum fugiat deleniti? Eum quasi quidem quibusdam.</component-typography
                        >
                        <component-typography .hType="${HTypes.BODY2}"
                           >Body 2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate aliquid ad quas sunt
                           voluptatum officia dolorum cumque, possimus nihil molestias sapiente necessitatibus dolor saepe
                           inventore, soluta id accusantium voluptas beatae.</component-typography
                        >
                        <component-typography .hType="${HTypes.BUTTON}">BUTTON TEXT</component-typography>
                        <component-typography .hType="${HTypes.CAPTION}">Caption text</component-typography>
                        <component-typography .hType="${HTypes.OVERLINE}">OVERLINE TEXT</component-typography>
                     </h1>
                  </component-tile>
               </component-tab-content>
               <component-tab-content slot="tabContent" id="htmlContent">
                  <component-code>
                     <component-typography text=""></component-typography>
                  </component-code>
               </component-tab-content>
               <component-tab-content slot="tabContent" id="cssContent">
                  <component-code>
                     ${InputComponent.styles
            .toString()
            .substr(0, InputComponent.styles.toString().indexOf('/*#') - 3)
            .trim()}
                  </component-code>
               </component-tab-content>
            </component-tabs>
         </component-flex-container>
      `;
    }
}
