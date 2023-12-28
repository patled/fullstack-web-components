import { ButtonComponent } from './Button';
import { html } from 'lit-html';

export default {
  title: 'Components/Button',
  component: 'in-button',
};

const Template = ({ label, variant }) => html` <button
  class="${variant}"
  is="in-button"
>
  ${label}
</button>`;
export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  label: 'Button',
};

let icon = null;

if (window.FontAwesome) {
  icon = window.FontAwesome.icon({ prefix: 'fas', iconName: 'plus' });
}
const svg = icon.node[0];

export const Icon = Template.bind({});
Icon.args = {
  variant: 'icon icon-close',
  label: svg,
};

const DisabledTemplate = ({ label, variant }) =>
  html`<button disabled class="${variant}" is="in-button">${label}</button>`;
  export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
  label: 'Submit',
  variant: 'primary',
};
