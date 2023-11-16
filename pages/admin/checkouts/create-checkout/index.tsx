import AdminLayout from 'components/admin/adminLayout/layout';
import ManageCheckoutFrom from 'components/admin/checkouts/ManageCheckoutForm';

const createCheckout = () => {
  const title = 'Создание Заказ';

  return (
    <>
      <ManageCheckoutFrom title={title} />
    </>
  );
};

createCheckout.PageLayout = AdminLayout;
export default createCheckout;
