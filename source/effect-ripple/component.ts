import { css, customElement, html, LitElement, property, query, unsafeCSS } from 'lit-element';

const componentCSS = require('./component.css');

@customElement('effect-ripple')
export class RippleComponent extends LitElement {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   @property()
   rendered: boolean = true;

   @query('#rippleContainer')
   private rippleContainerElement: HTMLSpanElement | undefined;

   @query('#rippleElement')
   private rippleElement: HTMLSpanElement | undefined;

   render() {
      return this.rendered
         ? html`
              <span
                 class="rippleContainer"
                 id="rippleContainer"
                 @click="${(event: MouseEvent) => {
                    this.clicked(event);
                 }}"
              >
                 <span
                    id="rippleElement"
                    class="ripple"
                    @animationend="${() => {
                       this.animationend();
                    }}"
                 ></span>
                 <slot></slot>
              </span>
           `
         : html`
              <span><slot></slot></span>
           `;
   }

   private clicked(event: MouseEvent) {
      console.log('start ripple effect...');
      if (this.rippleElement != null) {
         this.rippleElement.classList.add('ripple');
         if (this.rippleContainerElement != null) {
            let scrollWidthContainer: number = this.rippleContainerElement.scrollWidth;
            let scrollHeightContainer: number = this.rippleContainerElement.scrollHeight;
            this.rippleElement.style.width = (scrollWidthContainer * 2).toString().concat('px');
            this.rippleElement.style.height = (scrollHeightContainer * 2).toString().concat('px');
            this.rippleElement.style.left = (event.offsetX - scrollWidthContainer).toString().concat('px');
            this.rippleElement.style.top = (event.offsetY - scrollHeightContainer).toString().concat('px');
            this.rippleElement.classList.add('animate');
         }
      }
   }

   private animationend() {
      console.log('stop ripple effect...');
      if (this.rippleElement != null) {
         this.rippleElement.classList.remove('animate');
      }
   }
}
