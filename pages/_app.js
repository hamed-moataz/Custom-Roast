import { useRouter } from "next/router";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { SSRProvider } from "@react-aria/ssr";
import { Analytics } from "@vercel/analytics/react";
import { Fragment } from "react";

// Preloader for the public-facing site
import Preloader from "@/src/layouts/Preloader";
import "@/styles/globals.css";              // public styles
import "@/admin/styles/theme.scss";         // dashUI admin styles

// Layouts
import DefaultDashboardLayout from "@/admin/layouts/DefaultDashboardLayout";
import Layouts from "@/src/layouts/Layouts";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const pageURL = process.env.baseURL + router.pathname;

  const isAdmin = router.pathname.startsWith("/admin");

  const Layout = Component.Layout || (isAdmin ? DefaultDashboardLayout : Layouts);

  const title = "Custom Roast Group ";
  const description = "Dashboard for managing the Custom Roast website and content.";
  const keywords = "Cafe, Coffee Lebanon, Coffee, Coffee Academy, Grinders, Coffee Accessories, Custom Roast";

  return (
    <SSRProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" href="/coffee.ico" />
      </Head>

      <NextSeo
        title={title}
        description={description}
        canonical={pageURL}
        openGraph={{
          url: pageURL,
          title: title,
          description: description,
          site_name: process.env.siteName || "Custom Roast",
        }}
      />

      <Layout>
        {!isAdmin && <Preloader />}
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </SSRProvider>
  );
};

export default App;
