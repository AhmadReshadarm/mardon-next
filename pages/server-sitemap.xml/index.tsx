import { getServerSideSitemapLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { API_URL } = process.env;
  let posts: any = await fetch(
    // 'http://62.217.179.49:4010/products?limit=100000', // development server
    `${API_URL}/products/sitemap?limit=100000`, // production server
  );
  posts = await posts.json();
  const productSitemaps = posts.rows.map((item) => ({
    loc: `https://nbhoz.ru/product/${item?.url}`,
    changefreq: 'daily',
    lastmod: item.updatedAt,
    priority: 0.7,
  }));

  const fields = [...productSitemaps];

  return getServerSideSitemapLegacy(ctx, fields);
};

export default function Sitemap() {}
