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

const PrimaryTemplate = ({}) => {
  setTimeout(() => {
    const input = document.querySelector(`[name="username"]`);
    input.$validator = validators['username'];
  }, 0);
  return html`<form><in-textinput name="username" required></in-textinput></form>`;
};

export const Primary = PrimaryTemplate.bind({});
