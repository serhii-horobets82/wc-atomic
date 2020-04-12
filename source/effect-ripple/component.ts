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
            if(this.firstElementChild!=null && this.firstElementChild.nodeName == "BUTTON") {
              var buttonY = event.offsetY - this.offsetHeight - 10 // button size calc, For more accurate i added curser size
              if (event.offsetY > 150){
                var buttonY = (this.offsetHeight/2) * -1
              }
              this.rippleElement.style.top = buttonY.toString().concat('px');
            } else {
              this.rippleElement.style.top = (event.clientY - scrollHeightContainer).toString().concat('px');
            }
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
