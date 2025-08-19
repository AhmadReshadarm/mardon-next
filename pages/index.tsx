import dynamic from 'next/dynamic';
import Head from 'next/head';
import StoreLayout from 'components/store/storeLayout/layouts';
import SEOstatic from 'components/store/SEO/SEOstatic';
import { baseUrl } from '../common/constant';
import { Product, Slide } from 'swagger/services';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import Banners from 'components/store/homePage/banners';
import ProductsSlider from 'components/store/homePage/productsSlider';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
import { useDynamicSection } from 'common/helpers/useDynamicSection.helper';
import { getBase64Image } from 'common/helpers/getBase64Image.helper';

const MainPageCatalog = dynamic(
  () => import('components/store/homePage/mainPageCatalog'),
  {
    ssr: false,
    loading: () => <LoaderMask />,
  },
);
const BestProduct = dynamic(
  () => import('components/store/homePage/bestProducts'),
  {
    ssr: false,
    loading: () => <LoaderMask />,
  },
);
const Subscribers = dynamic(() => import('ui-kit/Subscribers'), {
  loading: () => <LoaderMask />,
});
const ContactsMainPage = dynamic(
  () => import('components/store/homePage/contactsMainPage'),
  {
    loading: () => <LoaderMask />,
  },
);

export const getServerSideProps: GetServerSideProps<{
  slides: Slide[];
  caroselProducts: Product[];
  base64Image: string | null;
  base64Image_2: string | null;
}> = (async () => {
  const apiUrl = process.env.API_URL || 'http://localhost:4010';
  try {
    const resSlides = await fetch(`${apiUrl}/slides`);
    if (!resSlides.ok) throw new Error('Failed to fetch slides');
    const slides: Slide[] = await resSlides.json();

    const resCarosel = await fetch(`${apiUrl}/products?tags[]=main_page`);
    if (!resCarosel.ok) throw new Error('Failed to fetch carousel products');
    const caroselData: { rows: Product[]; lenght: number } =
      await resCarosel.json();
    const caroselProducts = caroselData.rows;

    let caroselImages: string[] = [];
    if (caroselProducts.length > 0 && caroselProducts[0].productVariants) {
      caroselImages = getProductVariantsImages(
        caroselProducts[0].productVariants,
      );
    }

    const firstCarouselImageUrl =
      caroselImages.length > 0
        ? `${apiUrl}/images/compress/${caroselImages[0]}?qlty=1&width=100&height=100&lossless=false`
        : '';
    const firstSlideImageUrl =
      slides.length > 0 && slides[0].image
        ? `${apiUrl}/images/compress/${slides[0].image}?qlty=1&width=190&height=80&lossless=false`
        : '';

    const base64Image = await getBase64Image(firstCarouselImageUrl);
    const base64Image_2 = await getBase64Image(firstSlideImageUrl);

    return {
      props: {
        slides,
        caroselProducts,
        base64Image,
        base64Image_2,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        slides: [],
        caroselProducts: [],
        base64Image: null,
        base64Image_2: null,
      },
    };
  }
}) as GetServerSideProps<{
  slides: Slide[];
  caroselProducts: Product[];
  base64Image: string | null;
  base64Image_2: string | null;
}>;

// ---------------------------------------------------------------------------------------

type IndexPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const IndexPage: React.FC<IndexPageProps> & {
  PageLayout?: React.FC<{ children: React.ReactNode }>;
} = ({
  slides,
  caroselProducts,
  base64Image,
  base64Image_2,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const catalogSection = useDynamicSection('MainPageCatalog');
  const bestProductSection = useDynamicSection('BestProduct');
  const subscribersSection = useDynamicSection('Subscribers');
  const contactsSection = useDynamicSection('ContactsMainPage');

  return (
    <>
      <SEOstatic
        page={{
          realName: 'NBHOZ - Опт Товаров для Дома и Бизнеса',
          name: 'NBHOZ - Опт Товаров для Дома и Бизнеса',
          url: '/',
          desc: 'Оптовый поставщик товаров для дома и бизнеса. У нас вы найдете широкий ассортимент хозяйственных товаров, включая уборочный инвентарь, товары для ремонта, и многое другое. Закажите оптом и получите выгодные цены!',
          keywords:
            'оптом, товары для дома, хозяйственные товары, мелкая оптовая торговля, купить оптом, продажа оптом, оптовый склад, оптовый поставщик, швабры, губки, столовые приборы, инструменты, коврики, спортивный инвентарь',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }}
        image={`${baseUrl}/static/logo_800x800.png`}
      />
      <Head>
        <link rel="canonical" href="https://nbhoz.ru" />
      </Head>
      <Banners slides={slides} base64Image_2={base64Image_2} />
      <ProductsSlider
        caroselProducts={caroselProducts}
        base64Image={base64Image}
      />

      <div ref={catalogSection.ref}>
        {catalogSection.shouldRender ? <MainPageCatalog /> : <LoaderMask />}
      </div>

      <div ref={bestProductSection.ref}>
        {bestProductSection.shouldRender ? <BestProduct /> : <LoaderMask />}
      </div>

      <div ref={subscribersSection.ref}>
        {subscribersSection.shouldRender ? <Subscribers /> : <LoaderMask />}
      </div>

      <div ref={contactsSection.ref}>
        {contactsSection.shouldRender ? <ContactsMainPage /> : <LoaderMask />}
      </div>
    </>
  );
};

IndexPage.PageLayout = StoreLayout;
export default IndexPage;
