import Head from 'next/head';
import { settings } from './helpers';
import { baseUrl } from 'common/constant';
import { Product } from 'swagger/services';
const socialTags = ({
  openGraphType,
  url,
  title,
  description,
  image,
  createdAt,
  updatedAt,
}) => {
  const metaTags = [
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:site',
      content:
        settings &&
        settings.meta &&
        settings.meta.social &&
        settings.meta.social.twitter,
    },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    {
      name: 'twitter:creator',
      content:
        settings &&
        settings.meta &&
        settings.meta.social &&
        settings.meta.social.twitter,
    },
    { name: 'twitter:image:src', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'og:title', content: title },
    { name: 'og:type', content: openGraphType },
    { name: 'og:url', content: url },
    { name: 'og:image', content: image },
    { name: 'og:image:type', content: 'image/webp' },
    { name: 'og:image:width', content: '1080' },
    { name: 'og:image:height', content: '1080' },
    { name: 'og:description', content: description },
    {
      name: 'og:site_name',
      content: settings && settings.meta && settings.meta.title,
    },
    {
      name: 'og:published_time',
      content: createdAt || new Date().toISOString(),
    },
    {
      name: 'og:modified_time',
      content: updatedAt || new Date().toISOString(),
    },
  ];

  return metaTags;
};

type Props = {
  product: Product;
  images: string[];
};
// const SEO: React.FC<Props> = ({ product, images }) => {
//   const url = `${baseUrl}/product/${product?.url}`;

//   return (
//     <Head>
//       <title>{`${product?.name} | NBHOZ`}</title>
//       <meta name="robots" content="index, follow" />
//       <meta name="title" content={product?.name} />
//       <meta name="description" content={product?.shortDesc} />
//       <meta name="image" content={images[0]} />
//       <meta name="keywords" content={product?.keywords} />
//       <link rel="canonical" href={url} key="canonical" />
//       {socialTags({
//         openGraphType: 'website',
//         url: url,
//         title: product?.name,
//         description: product?.shortDesc,
//         image: images[0],
//         createdAt: product?.createdAt,
//         updatedAt: product?.updatedAt,
//       }).map(({ name, content }) => {
//         return (
//           <meta key={name} property={name} name={name} content={content} />
//         );
//       })}
//       {product?.reviews?.length != 0 ? (
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               '@context': 'http://schema.org',
//               '@type': 'Product',
//               name: product?.name,
//               description: product?.shortDesc,
//               image: images,
//               sku: product?.productVariants![0]?.artical,
//               additionalProperty:
//                 product?.parameterProducts
//                   ?.filter(
//                     (item) =>
//                       item.value &&
//                       item.value !== '_' &&
//                       item.value !== '-' &&
//                       item.value !== '',
//                   )
//                   ?.map((item) => ({
//                     '@type': 'PropertyValue',
//                     name: item.parameter?.name,
//                     value: item.value,
//                   })) || [],
//               aggregateRating: {
//                 '@type': 'AggregateRating',
//                 ratingValue: product?.rating?.avg ?? 0,
//                 reviewCount: product?.reviews?.length ?? 0,
//               },
//               offers: {
//                 '@type': 'Offer',
//                 url: url,
//                 priceCurrency: 'RUB',
//                 price: product?.productVariants![0]?.price,
//                 itemCondition: 'https://schema.org/NewCondition',
//                 availability: 'https://schema.org/InStock',
//               },
//             }),
//           }}
//         />
//       ) : (
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               '@context': 'http://schema.org',
//               '@type': 'Product',
//               name: product?.name,
//               description: product?.shortDesc,
//               image: images,
//               sku: product?.productVariants![0]?.artical,
//               additionalProperty:
//                 product?.parameterProducts
//                   ?.filter(
//                     (item) =>
//                       item.value &&
//                       item.value !== '_' &&
//                       item.value !== '-' &&
//                       item.value !== '',
//                   )
//                   ?.map((item) => ({
//                     '@type': 'PropertyValue',
//                     name: item.parameter?.name,
//                     value: item.value,
//                   })) || [],
//               offers: {
//                 '@type': 'Offer',
//                 url: url,
//                 priceCurrency: 'RUB',
//                 price: product?.productVariants![0]?.price,
//                 itemCondition: 'https://schema.org/NewCondition',
//                 availability: 'https://schema.org/InStock',
//               },
//             }),
//           }}
//         />
//       )}
//     </Head>
//   );
// };

// export default SEO;

const SEO: React.FC<Props> = ({ product, images }) => {
  const url = `${baseUrl}/product/${product?.url}`;

  // Safely get variants
  const variants = product?.productVariants ?? [];
  const firstVariant = variants[0];

  // Build offers array (one per variant)
  const offers = variants.map((variant) => ({
    '@type': 'Offer',
    url: url,
    priceCurrency: 'RUB',
    price: variant.price,
    priceValidUntil: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1),
    )
      .toISOString()
      .split('T')[0], // optional
    itemCondition: 'https://schema.org/NewCondition',
    availability: variant.available
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    sku: variant.artical,
    // Optionally include color if you have it
    ...(variant.color && {
      color: variant.color.name,
    }),
  }));

  // If there are no variants, fallback to a single offer from firstVariant
  const offersToUse =
    offers.length > 0
      ? offers
      : [
          {
            '@type': 'Offer',
            url,
            priceCurrency: 'RUB',
            price: firstVariant?.price ?? 0,
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
          },
        ];

  // Build additionalProperty from parameters (already done)
  const additionalProperties =
    product?.parameterProducts
      ?.filter((item) => item.value && !['_', '-', ''].includes(item.value))
      ?.map((item) => ({
        '@type': 'PropertyValue',
        name: item.parameter?.name,
        value: item.value,
      })) ?? [];

  // Optional: extract weight to top-level property
  const weightParam = product?.parameterProducts?.find(
    (p) =>
      p.parameter?.name === 'Вес' &&
      p.value &&
      !['_', '-', ''].includes(p.value),
  );
  const weightValue = weightParam?.value; // e.g., "ST-5248: 250 г | ST-5249: 380 г"
  // You could parse this into a structured weight if needed, but we'll keep as string in additionalProperty.

  // Build the Product JSON‑LD
  const productJsonLd = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    name: product?.name,
    description: product?.shortDesc || product?.desc, // fallback to full desc
    image: images,
    sku: variants.length === 1 ? variants[0]?.artical : undefined, // only if single SKU
    productID: product?.id?.toString(),
    category: product?.category?.name,
    // If you have a default brand, add it:
    brand: { '@type': 'Brand', name: 'NBHOZ' },
    // Add weight if you want it top-level (requires structured data)
    weight: weightValue
      ? { '@type': 'QuantitativeValue', value: weightValue, unitCode: 'GRM' }
      : undefined,
    additionalProperty: additionalProperties,
    offers: offersToUse,
    // Only include aggregateRating if there are actual reviews
    ...(product?.reviews &&
      product.reviews.length > 0 &&
      product?.rating?.avg && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating.avg,
          reviewCount: product.reviews.length,
        },
      }),
  };

  // Remove undefined fields to keep JSON clean
  const cleanJsonLd = JSON.parse(JSON.stringify(productJsonLd));

  return (
    <Head>
      <title>{`${product?.name} | NBHOZ`}</title>
      <meta name="robots" content="index, follow" />
      <meta name="title" content={product?.name} />
      <meta name="description" content={product?.shortDesc} />
      <meta name="image" content={images[0]} />
      <meta name="keywords" content={product?.keywords} />
      <link rel="canonical" href={url} key="canonical" />
      {socialTags({
        openGraphType: 'website',
        url,
        title: product?.name,
        description: product?.shortDesc,
        image: images[0],
        createdAt: product?.createdAt,
        updatedAt: product?.updatedAt,
      }).map(({ name, content }) => (
        <meta key={name} property={name} name={name} content={content} />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanJsonLd) }}
      />
    </Head>
  );
};

export default SEO;
