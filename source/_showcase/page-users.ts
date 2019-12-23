import {customElement, html, TemplateResult} from 'lit-element';

import {RouterService, HttpClientService} from '@domoskanonos/frontend-basis';
import {PageAbstract} from "./page-abstract";
import {
   ColumnEventData,
   IconComponent,
   IconInputData,
   SpacerSize,
   TableHeaderInputData,
   TypographyComponent,
   TypographyInputData,
   TypographyTypes
} from "..";


@customElement('page-users')
export class PageUsers extends PageAbstract {

   getTopContent(): TemplateResult {
      return html`
         <component-top-app-bar>
            <component-icon
               slot="leftComponents"
               icon="menu"
               clickable="true"
            ></component-icon>
            <component-spacer
               slot="leftComponents"
               size="${SpacerSize.SMALL}"
            ></component-spacer>
            <component-typography
               slot="leftComponents"
               .type="${TypographyTypes.H6}"
               >Benutzerliste</component-typography
            >
            <component-icon
               slot="rightComponents"
               icon="add"
               title="add user"
               clickable="true"
               @component-icon-click="${() =>
          RouterService.getInstance().navigate('#useredit')}"
            ></component-icon>
            <component-authenticated-icon
               .isAuthenticated="${HttpClientService.getInstance().isAuthenticated()}"
               loginPage="#login"
               logoutPage="#logout"
               slot="rightComponents"
            ></component-authenticated-icon>
         </component-top-app-bar>
      `;
   }

   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container containerClazz="container_75">
            <component-table
               @component-table-column-clicked="${(event: CustomEvent) => {
         this.columnTableClickedEvent(event);
      }}"
               requestPath="/AUTHUSER/FIND"
               .headers="${[
         <TableHeaderInputData>{
            componentInputData: <TypographyInputData>{
               componentIdentifier: TypographyComponent.IDENTIFIER
            },
            columnKey: 'firstName',
            searchValue: ''
         },
         <TableHeaderInputData>{
            componentInputData: <TypographyInputData>{
               componentIdentifier: TypographyComponent.IDENTIFIER
            },
            columnKey: 'lastName',
            searchValue: ''
         },
         <TableHeaderInputData>{
            componentInputData: <TypographyInputData>{
               componentIdentifier: TypographyComponent.IDENTIFIER
            },
            columnKey: 'city',
            searchValue: ''
         },
         <TableHeaderInputData>{
            componentInputData: <TypographyInputData>{
               componentIdentifier: TypographyComponent.IDENTIFIER
            },
            columnKey: 'email',
            searchValue: ''
         },
         <TableHeaderInputData>{
            componentInputData: <IconInputData>{
               componentIdentifier: IconComponent.IDENTIFIER,
               icon: 'edit',
               clickable: true
            },
            columnKey: 'aktionen',
            searchValue: ''
         }
      ]}"
            >
            </component-table>
         </component-flex-container>
      `;
   }

   private columnTableClickedEvent(event: CustomEvent) {
      let data = <ColumnEventData>event.detail;
      if (data.columnIndex === 4) {
         this.editUser(data.row.source.id);
      }
   }

   editUser(id: number) {
      console.log('edit user, id=%s', id);
      RouterService.getInstance().navigate(
          '?userid='.concat(id.toString()).concat('#useredit')
      );
   }
}