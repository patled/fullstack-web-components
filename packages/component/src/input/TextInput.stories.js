import { html } from 'lit-html';
import { TextInputComponent } from './TextInput';
import { ButtonComponent } from '../button/Button';

const validators = {
  username: {
    validations: [
      {
        flag: { valueMissing: true },
        message: 'Error: Required, please enter a username.',
        condition: (input) => input.required && input.value.length <= 0,
      },
      {
        flag: { tooShort: true },
        message:
          'Error: Minimum length not met, please supply a value with at least 8 characters.',
        condition: (input) =>
          input.minLength && input.value.length < input.minLength,
      },
    ],
  },
  password: {
    validations: [
      {
        flag: { valueMissing: true },
        message: 'Error: Required, please enter a username.',
        condition: (input) => input.required && input.value.length <= 0,
      },
      {
        flag: { tooShort: true },
        message:
          'Error: Minimum length not met, please supply a value with at least 8 characters.',
        condition: (input) =>
          input.minLength && input.value.length < input.minLength,
      },
      {
        flag: { patternMismatch: true },
        message:
          'Please use at least one uppercase, uppercase letter, special character, and number.',
        condition: (input) =>
          input.pattern &&
          input.value.match(new RegExp(input.pattern)) === null,
      },
    ],
  },
};

export default {
  title: 'Components/TextInput',
  component: 'in-textinput',
};

const PrimaryTemplate = ({ onValidate, validators }) => {
  setTimeout(() => {
    const input = document.getElementById('username-1');
    // attach the validation logic to the input
    input.$validator = validators['username'];
  }, 0);
  return html`<form @validate="${onValidate}">
    <in-textinput id="username-1" required></in-textinput>
  </form>`;
};

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  validators,
  onValidate: (e) => {
    if (!document.getElementById('username-1').validity.valid) {
      console.log('invalid');
    } else {
      console.log('valid');
    }
  },
};

const DisabledTemplate = () =>
  html`<in-textinput
    disabled
    value="disabled input"
    name="test-input"
  ></in-textinput>`;

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {};

const ErrorTemplate = ({}) => {
  setTimeout(() => {
    const input = document.getElementById('error-case');
    input.$validator = validators['username'];
    input.focus();
    input.blur();
  }, 0);

  return html`<in-textinput
    type="text"
    id="error-case"
    required
    class="form-control"
  ></in-textinput>`;
};
export const Error = ErrorTemplate.bind({});
ErrorTemplate.args = {};

const FormTemplate = ({ headline, onSubmit, onValidate, onFormData }) => {
  setTimeout(() => {
    for (let prop in validators) {
      document.querySelector(`[name="${prop}"]`).$validator = validators[prop];
    }
  }, 0);
  return html`<h4 slot=header">${headline}</h4>
  <form
  name="foo"
  slot="content"
    @submit="${onSubmit}"
    @validate="${onValidate}"
    @formdata="${onFormData}"
    >
    
    <fieldset>
        <legend>Login Form</legend>
        <label for="username">Username</label>
        <in-textinput
          type="text"
          id="username"
          name="username"
          required
          minlength="8"
          class="form-control"
        ></in-textinput>
        <label for="password">Password</label>
        <in-textinput
          type="password"
          id="password"
          name="password"
          required
          minlength="8"
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
          class="form-control"
        ></in-textinput>
        <button class="primary submit" type="submit" is="in-button">Submit</button>
      </fieldset>
  </form>
    `;
};

export const Form = FormTemplate.bind({});
Form.args = {
  headline: 'Login Form',
  onSubmit: (e) => {
    console.log(new FormData(ev.target));
    ev.preventDefault();
  },
  onValidate: (e) => {
    const validations = [];
    for (let prop in validators) {
      validations.push(
        document.querySelector(`[name="${prop}"]`).validity.valid
      );
      if (validations.filter((valid) => valid === false).length > 0) {
        console.log('invalid');
      } else {
        console.log('valid');
      }
    }
  },
  onFormData: (e) => {
    console.log(e);
    for (let value of e.formData.values()) {
      console.log(value);
    }
  },
};
