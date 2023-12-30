import { Validator, validate } from './validator';
import { Component, attachShadow, Listen, css, html } from '@in/common';

@Component({
  selector: 'in-textinput',
  style: css`
    :host {
      display: block;
      font-family: var(--font-default);
      font-size: var(--font-body-sm);
    }
    input {
      height: var(--input-min-dimension);
      width: 100%;
      border-radius: var(--radius-sm);
      border: var(--border-default);
      font-size: var(--font-body-md);
      padding-left: var(--padding-sm);
      outline: none;
      box-sizing: border-box;
    }
    input:focus,
    input:focus:hover,
    input:active {
      border: var(--border-focus);
    }
    input.error,
    input.error:hover,
    input.error:focus,
    input.error:active {
      border: var(--border-error);
      outline: none;
      box-shadow: none;
      color: var(--color-error);
    }
    .message {
      margin-top: var(--margin-xxs);
      color: var(--color-error);
      font-weight: var(--font-weight-default);
    }
    input[disabled] {
      opacity: var(---color-disable);
      background: var(--color-disable);
      border: var(--border-disable);
    }
    input[disabled]:hover,
    input[disabled]:focus,
    input[disabled]:active {
      border: var(--border-disable);
      outline: none;
      box-shadow: none;
    }
  `,
  template: html`<div class="control">
      <input type="text" aria-describedby="message" />
    </div>
    <div
      class="message"
      id="message"
      aria-role="alert"
      aria-live="assertive"
    ></div>`,
})
export class TextInputComponent extends HTMLElement {
  static formAssociated = true;

  private internals: ElementInternals;

  set disabled(value: boolean | string) {
    if (value === 'true' || value === true) {
      this.$input.setAttribute('disabled', '');
    }
    if (value === 'false' || value == false) {
      this.$input.removeAttribute('disabled');
    }
  }
  get disabled() {
    return this.$input.disabled;
  }

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
    attachShadow(this);

    this.internals = this.attachInternals();
  }

  static get observedAttributes() {
    return [
      'name',
      'type',
      'required',
      'minlength',
      'maxlength',
      'pattern',
      'list',
      'placeholder',
      'readonly',
      'spellcheck',
      'value',
      'disabled',
    ];
  }

  attributeChangedCallback(name, prev, next) {
    this.$attr[name] = next;
    switch (name) {
      case 'value':
        this.value = next;
        break;
      case 'disabled':
        this.disabled = next;
        break;
      case 'required':
        this.required = next;
        break;
      case 'type':
        this.$input.setAttribute('type', next);
        break;
      case 'minlength':
        this.$input.setAttribute('minlength', next);
        break;
      case 'maxlength':
        this.$input.setAttribute('maxlength', next);
        break;
      case 'pattern':
        this.$input.setAttribute('pattern', next);
        break;
      case 'list':
        this.$input.setAttribute('list', next);
        break;
      case 'placeholder':
        this.$input.setAttribute('placeholder', next);
        break;
      case 'readonly':
        this.$input.setAttribute('readonly', next);
        break;
      case 'spellcheck':
        this.$input.setAttribute('spellcheck', next);
        break;
    }
  }

  get type() {
    return this.$input.type ?? 'text';
  }
  set type(value: string) {
    this.$input.setAttribute('type', value);
  }

  get list() {
    return this.$input.list;
  }

  get minLength() {
    return this.$input.minLength;
  }
  set minLength(value: number) {
    this.$input.minLength = value;
  }

  get maxLength() {
    return this.$input.maxLength;
  }
  set maxLength(value: number) {
    this.$input.maxLength = value;
  }

  get readonly() {
    return this.$input.readOnly;
  }

  get pattern() {
    return this.$input.pattern;
  }
  set pattern(value: string) {
    this.$input.pattern = value;
  }

  get placeholder() {
    return this.$input.placeholder;
  }

  get spellcheck() {
    return this.$input.spellcheck;
  }

  connectedCallback() {
    for (let prop in this.$attr) {
      this.$input.setAttribute(prop, this.$attr[prop]);
    }

    validate(this, false);
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

  @Listen('blur', 'input')
  onValidate() {
    validate(this, true);
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  focus() {
    this.$input.focus();
  }

  blur() {
    this.$input.blur();
  }

  @Listen('keyup', 'input')
  @Listen('input', 'input')
  onInput() {
    this.shadowRoot.querySelector('.message').innerHTML = '';
    this.$input.classList.remove('error');
    this.$input.removeAttribute('aria-invalid');
    this.internals.setFormValue(this.value, this.value);
  }

  formStateRestoreCallback(state: string, mode: string) {
    this.value = state;
  }

  formResetCallback(state: string) {
    this.value = this.getAttribute('value') || '';
  }
}
