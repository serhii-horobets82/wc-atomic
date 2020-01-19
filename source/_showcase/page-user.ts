import {
    customElement,
    html,
    property,
    query,
    TemplateResult
} from 'lit-element';
import {PageAbstract} from './page-abstract';
import {
    ParamService,
    RouterService,
    AuthUser
} from '@domoskanonos/frontend-basis';
import {WebApiService} from '@domoskanonos/frontend-basis';
import {UserRepository} from "./controller-user";
import {FormComponent, SpacerSize, TypographyTypes} from "..";

@customElement('page-user')
export class PageUser extends PageAbstract {
    constructor() {
        super();

        let userid: number | null = Number(
            ParamService.getInstance().getParam('userid')
        );
        let userPromise = UserRepository.getInstance().find(userid);
        userPromise
            .then((user) => {
                this.user = user;
                this.firstName = user.firstName;
                this.lastName = user.lastName;
                this.city = this.basicService.getValue(user.city, '');
                this.email = user.email;
                this.birthday = this.basicService.getValue(
                    user.birthday,
                    new Date()
                );
                this.active = user.active;
            })
            .catch((reason) => {
                console.log('error user loading..' + reason);
            });
    }

    user: AuthUser = <AuthUser>{};

    @property()
    firstName: string = '';
    @property()
    lastName: string = '';
    @property()
    city: string = '';
    @property()
    email: string = '';
    createdBy: string = '';
    @property()
    birthday: Date = new Date();
    @property()
    password: string = '';
    @property()
    active: boolean = false;

    @property()
    showDeleteDialog: boolean = false;

    @query('#user-form')
    formComponent: FormComponent | undefined;

    getTopContent(): TemplateResult {
        return html`
         <component-top-app-bar>
            <component-icon
               slot="leftComponents"
               icon="clear"
               clickable="true"
               title="cancel editing user"
               @component-icon-click="${() =>
            RouterService.getInstance().back()}"
            ></component-icon>
            <component-spacer
               slot="leftComponents"
               size="${SpacerSize.SMALL}"
            ></component-spacer>
            <component-typography
               slot="leftComponents"
               .type="${TypographyTypes.H6}"
               >Benutzer bearbeiten</component-typography
            >
            <component-icon
               slot="rightComponents"
               icon="save"
               clickable="true"
               title="save user"
               @component-icon-click="${() => this.save()}"
            ></component-icon>
            <component-icon
               slot="rightComponents"
               icon="delete"
               clickable="true"
               title="delete user"
               @component-icon-click="${() => {
            this.showDeleteDialog = true;
        }}"
               .rendered="${this.user.id}"
            ></component-icon>
         </component-top-app-bar>
      `;
    }

    getMainComponent(): TemplateResult {
        return html`
         <component-dialog .show="${this.showDeleteDialog}">
            Benutzer löschen ?
            <component-button
               @click="${() => this.delete()}"
               text="Ja"
            ></component-button>
            <component-button
               @click="${() => {
            this.showDeleteDialog = false;
        }}"
               text="Nein"
            ></component-button>
         </component-dialog>

         <component-typography .type="${TypographyTypes.H4}"
            >Benutzer bearbeiten</component-typography
         >
         <component-form id="user-form">
            <component-typography>Benutzerdaten</component-typography>
            <component-inputfield
               value="${this.firstName}"
               .required="${true}"
               name="firstName"
               placeholder="Vorname"
            ></component-inputfield>
            <component-inputfield
               value="${this.lastName}"
               required="true"
               name="lastName"
               placeholder="Nachname"
            ></component-inputfield>
            <component-inputfield
               value="${this.city}"
               name="city"
               placeholder="Stadt"
            ></component-inputfield>
            <component-inputfield
               value="${this.email}"
               .disabled="${this.user?.id}"
               name="email"
               type="email"
               placeholder="Mail"
            ></component-inputfield>
            <component-inputfield
               value="${this.birthday.toISOString().substr(0, 10)}"
               name="birthday"
               type="date"
               placeholder="Geburtstag"
            ></component-inputfield>
            <component-inputfield
               value="${this.password}"
               .disabled="${this.user?.id}"
               name="password"
               type="password"
               placeholder="Passwort"
            ></component-inputfield>
            <component-inputfield
               checked="${this.active}"
               name="active"
               type="checkbox"
               placeholder="Aktiv"
            ></component-inputfield>
         </component-form>
      `;
   }

   private save() {
      if (this.formComponent != null) {
         let user: AuthUser = this.formComponent.getOutputData().jsonObject;
         console.log('info: ' + JSON.stringify(user));
         if (this.user?.id != null) {
             console.log('update user, id=' + this.user.id);
             UserRepository.getInstance()
                 .update(this.user.id, user)
                 .then((value) => {
                     WebApiService.getInstance().notify(
                         'Benutzer aktualisiert!' + value
                     );
                 });
         } else {
            UserRepository.getInstance()
               .persist(user)
               .then((user) => {
                   this.user = user;
                   WebApiService.getInstance().notify(
                       'Neuen Benutzer angelegt!'
                   );
               });
         }
      }
   }

   private delete() {
      if (this.user?.id != null) {
          console.log('delete user, id=' + this.user.id);
          UserRepository.getInstance()
              .delete(this.user.id)
              .then((value) => {
                  console.log(value);
                  RouterService.getInstance().navigate('#users');
              });
      }
   }
}
