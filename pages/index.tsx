import dynamic from 'next/dynamic';
import Head from 'next/head';
import StoreLayout from 'components/store/storeLayout/layouts';
import SEOstatic from 'components/store/SEO/SEOstatic';
import { baseUrl, FALLBACK_BLUR_DATA_URL } from '../common/constant';
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
  base64Image: string;
  base64Image_2: string;
  slidesError: boolean;
  carouselError: boolean;
}> = async () => {
  const apiUrl = process.env.API_URL || 'http://localhost:4010';

  // ---------- fetch slides ----------
  let slides: Slide[] = [];
  let slidesError = false;
  try {
    const resSlides = await fetch(`${apiUrl}/slides`);
    if (!resSlides.ok) throw new Error('Failed to fetch slides');
    slides = await resSlides.json();
  } catch (error) {
    console.error('Slides fetch error:', error);
    slidesError = true;
    slides = [];
  }

  // ---------- fetch carousel products ----------
  let caroselProducts: Product[] = [];
  let carouselError = false;
  try {
    const resCarosel = await fetch(
      `${apiUrl}/products?tags[]=main_page&sortBy=id&orderBy=DESC&limit=100`,
    );
    if (!resCarosel.ok) throw new Error('Failed to fetch carousel products');
    const caroselData: { rows: Product[]; length: number } =
      await resCarosel.json();
    caroselProducts = caroselData.rows;
  } catch (error) {
    console.error('Carousel products fetch error:', error);
    carouselError = true;
    caroselProducts = [];
  }

  // ---------- generate base64 placeholders (non‑critical) ----------
  let base64Image = FALLBACK_BLUR_DATA_URL;
  let base64Image_2 = FALLBACK_BLUR_DATA_URL;

  try {
    if (
      !carouselError &&
      caroselProducts.length > 0 &&
      caroselProducts[0].productVariants
    ) {
      const caroselImages = getProductVariantsImages(
        caroselProducts[0].productVariants,
      );
      if (caroselImages.length > 0) {
        const url = `${apiUrl}/images/compress/${caroselImages[0]}?qlty=1&width=100&height=100&lossless=false`;
        const result = await getBase64Image(url);
        if (result) base64Image = result;
      }
    }
  } catch (e) {
    console.error('Failed to get carousel base64 placeholder:', e);
  }

  try {
    if (!slidesError && slides.length > 0 && slides[0].image) {
      const url = `${apiUrl}/images/compress/${slides[0].image}?qlty=1&width=190&height=80&lossless=false`;
      const result = await getBase64Image(url);
      if (result) base64Image_2 = result;
    }
  } catch (e) {
    console.error('Failed to get slides base64 placeholder:', e);
  }

  return {
    props: {
      slides,
      caroselProducts,
      base64Image,
      base64Image_2,
      slidesError,
      carouselError,
    },
  };
};

// ---------------------------------------------------------------------------------------

type IndexPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const IndexPage: React.FC<IndexPageProps> & {
  PageLayout?: React.FC<{ children: React.ReactNode }>;
} = ({
  slides,
  caroselProducts,
  slidesError,
  carouselError,
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
          createdAt: '2023-10-18T00:00:00Z',
          updatedAt: new Date().toISOString(),
        }}
        image={`${baseUrl}/static/logo_800x800.png`}
      />
      <Head>
        <link rel="canonical" href="https://nbhoz.ru" />
      </Head>
      <Banners
        slides={slides}
        base64Image_2={base64Image_2}
        error={slidesError}
      />
      <ProductsSlider
        caroselProducts={caroselProducts}
        base64Image={base64Image}
        error={carouselError}
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
