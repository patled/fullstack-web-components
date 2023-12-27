import { html } from 'lit-html';
import { TextInputComponent } from './TextInput';

const validators = {
  username: {
    validations: [
      {
        flag: { valueMissing: true },
        message: 'Username is required',
        condition: (input) => input.required && input.value.length <= 0,
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
    const input = document.querySelector(`[name="username"]`);
    // attach the validation logic to the input
    input.$validator = validators['username'];
  }, 0);
  return html`<form @validate="${onValidate}">
    <in-textinput name="username" required></in-textinput>
  </form>`;
};

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  validators,
  onValidate: (e) => {
    if (!document.querySelector(`[name="username"]`).validity.valid) {
      console.log('invalid');
    } else {
      console.log('valid');
    }
  },
};
