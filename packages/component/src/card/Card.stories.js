import { CardComponent } from './Card';

export default {
  title: 'Components/Card',
};

const PrimaryTemplate = () => `<in-card>
  <img slot="header" src='https://images.unsplash.com/photo-1612392167062-8f76710986ba?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
/>
  <h4 slot="header">Food</h4>
  <p slot="content">Food is any substance consumed to provide nutritional support for an organism. Food is usually of plant or animal origin, and contains essential nutrients, such as carbohydrates, fats, proteins, vitamins, or minerals.</p>
  <a href="#" slot="footer">Read More</a>
</in-card>`;

export const ImageCard = PrimaryTemplate.bind({});
