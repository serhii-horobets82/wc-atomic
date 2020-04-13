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
         if (this.rippleContainerElement != null) {
            const { scrollWidth: scrollWidthContainer, scrollHeight: scrollHeightContainer } = this.rippleContainerElement;
            const ripleSize = Math.max(scrollWidthContainer, scrollHeightContainer);
            const minSize = Math.min(scrollWidthContainer, scrollHeightContainer);
            // ripple must be a square with side of max dimention size of element
            this.rippleElement.style.width = this.rippleElement.style.height = `${ripleSize}px`;
            this.rippleElement.style.left = `${event.offsetX - minSize}px`;
            this.rippleElement.style.top = `${event.offsetY - minSize}px`;
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
