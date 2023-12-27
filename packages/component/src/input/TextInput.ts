import { Validator, validate } from './validator';

export class TextInputComponent extends HTMLElement {
  static formAssociated = true;

  private internals: ElementInternals;

  checkValidity() {
    return this.internals.checkValidity();
  }

  reportValidity() {
    return this.internals.reportValidity();
  }

  get validity() {
    return this.internals.validity;
  }

  get validationMessage() {
    return this.internals.validationMessage;
  }

  setValidity(
    flags: ValidityStateFlags,
    message?: string,
    anchor?: HTMLElement
  ) {
    return this.internals.setValidity(flags, message, anchor);
  }

  public $validator: Validator;

  get $input(): HTMLInputElement {
    return this.shadowRoot.querySelector('input');
  }

  private $attr = {};

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');

    template.innerHTML = `
    <div class="control">
      <input type="text" />
    </div>
    <div class="message"></div>
    `;

    shadowRoot.appendChild(template.content.cloneNode(true));

    this.internals = this.attachInternals();
  }

  static get observedAttributes() {
    return ['required', 'value'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.$attr[name] = newValue;

    switch (name) {
      case 'required':
        this.required = newValue !== null;
        break;
      case 'value':
        this.value = newValue;
        break;
    }
  }

  connectedCallback() {
    this.$input.onblur = () => {
      this.onValidate(true);
    };

    for (let prop in this.$attr) {
      this.$input.setAttribute(prop, this.$attr[prop]);
    }

    this.onValidate(false);
  }

  get value() {
    return this.$input.value;
  }

  set value(value: string) {
    this.$input.value = value;
  }

  get required() {
    return this.$input.required;
  }

  set required(value: boolean | string) {
    if (value === 'true' || value === true) {
      this.$input.setAttribute('required', '');
    }
    if (value === 'false' || value === false) {
      this.$input.removeAttribute('required');
    }
  }

  onValidate(showError: boolean) {
    validate(this, showError);
  }
}

customElements.define('in-textinput', TextInputComponent);
