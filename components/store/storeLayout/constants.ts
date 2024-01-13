export enum PopupDisplay {
  Flex = 'flex',
  None = 'none',
}

const content = {
  aboutUs: [
    { text: 'Новости', url: '/news' },
    { text: 'Отзывы', url: '/reviews' },
    { text: 'Контакты', url: '/contacts' },
  ],
  services: [
    { text: 'Гарантии', url: '/guarantee' },
    { text: 'Как купить', url: '/how-to-buy' },
    { text: 'Доставка', url: '/delivery' },
    { text: 'Акции', url: '/discount' },
  ],
};
export { content };
