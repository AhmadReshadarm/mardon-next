import Head from 'next/head';
import AdminLayout from 'components/admin/adminLayout/layout';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>NBHOZ | Admin</title>
      </Head>
      Main page
    </>
  );
};

IndexPage.PageLayout = AdminLayout;
export default IndexPage;
