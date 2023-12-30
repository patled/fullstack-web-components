import { html } from 'lit-html';
import { TableCardComponent } from './TableCard';
import { TableComponent, ColumnData } from './Table';

// export { TableCardComponent, TableComponent, ColumnData };

const rowData = [
  {
    email: 'joe@gmail.com',
    phoneNumber: '123-456-7890',
    street: '123 Main St',
    city: 'Anytown',
    region: 'CA',
    postalCode: '12345',
  },
  {
    email: 'jack@gmail.com',
    phoneNumber: '123-456-7890',
    street: '656 Main St',
    city: 'Anytown',
    region: 'CA',
    postalCode: '12345',
  },
  {
    email: 'jim@gmail.com',
    phoneNumber: '123-456-7890',
    street: '322 Main St',
    city: 'Anytown',
    region: 'CA',
    postalCode: '12345',
  },
  {
    email: 'john@gmail.com',
    phoneNumber: '123-456-7890',
    street: '666 Main St',
    city: 'Anytown',
    region: 'CA',
    postalCode: '12345',
  },
];

const columnData = [
  { property: 'email', label: 'Email', index: 0, align: 'left' },
  { property: 'phoneNumber', label: 'Phone', index: 1, align: 'left' },
  { property: 'street', label: 'Street', index: 2, align: 'left' },
  { property: 'city', label: 'City', index: 3, align: 'left' },
  { property: 'region', label: 'Region', index: 4, align: 'left' },
  { property: 'postalCode', label: 'Postal Code', index: 5, align: 'left' },
];

const TableContext = { rowData, columnData };

export default {
  title: 'Components/Table',
  component: 'in-tablecard',
};

const Template = ({ channelName, context }) => {
  return html` <in-tablecard channel="${channelName}"></in-tablecard> `;
};
export const Primary = Template.bind({});
Primary.args = {
  channelName: 'table:one',
  context: TableContext,
};
