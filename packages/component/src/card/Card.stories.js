import { CardComponent } from './Card';

export default {
  title: 'Components/Card',
};

const PrimaryTemplate = () => `<in-card>
  <h4 slot="header">Food</h4>
  <p slot="content">Food is any substance consumed to provide nutritional support for an organism. Food is usually of plant or animal origin, and contains essential nutrients, such as carbohydrates, fats, proteins, vitamins, or minerals.</p>
  <a href="#" slot="footer">Read More</a>
</in-card>`;

export const ImageCard = PrimaryTemplate.bind({});
