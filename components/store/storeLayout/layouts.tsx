import Footer from './Footer';
import Header from './Header';

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default StoreLayout;
