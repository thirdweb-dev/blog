import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import { MDXProvider } from "@mdx-js/react";
import { BlogShell } from "components/layout/blog-shell";
import { MdxComponents } from "components/portal";
import { useTrack } from "hooks/analytics/useTrack";
import { NextComponentType, NextPageContext } from "next";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import React, { useEffect } from "react";
import { prismDarkTheme } from "theme/prism";
import { fontsizeCss } from "theme/typography";
import chakraTheme from "../theme";

export type ConsolePageComponent<IP, P> = NextComponentType<
  NextPageContext,
  IP,
  P
> & {
  Layout?: undefined;
};

export type ConsolePage<P = {}, IP = P> = ConsolePageComponent<IP, P>;

type ConsoleAppProps<P = {}, IP = P> = AppProps & {
  Component: ConsolePageComponent<IP, P>;
};
const GlobalStyle: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Global
        styles={css`
          ${prismDarkTheme};
          ::selection {
            background-color: #90cdf4;
            color: #fefefe;
          }
          ::-moz-selection {
            background: #ffb7b7;
            color: #fefefe;
          }
          html {
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === "light" ? "white" : "#171717"};
          }
        `}
      />
    </>
  );
};

function ConsoleApp({ Component, pageProps }: ConsoleAppProps) {
  const router = useRouter();

  useEffect(() => {
    // Init PostHog
    posthog.init("phc_hKK4bo8cHZrKuAVXfXGpfNSLSJuucUnguAgt2j6dgSV", {
      api_host: "https://a.thirdweb.com",
      autocapture: true,
    });

    // Track page views
    const handleRouteChange = () => {
      posthog.capture("$pageview");
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { Track } = useTrack(
    { page: "root" },
    {
      dispatch: (data) => {
        const { category, action, label, ...restData } = data;
        const catActLab = label
          ? `${category}.${action}.${label}`
          : `${category}.${action}`;
        if (process.env.NODE_ENV === "development") {
          console.debug(`[PH.capture]:${catActLab}`, restData);
        }

        posthog.capture(catActLab, restData);
      },
    },
  );

  return (
    <Track>
      <Global
        styles={css`
          :host,
          :root {
            ${fontsizeCss};
          }
        `}
      />
      <DefaultSeo
        defaultTitle="thirdweb"
        titleTemplate="%s | thirdweb"
        description="Build Web3 projects in minutes with smart contracts you control, tools that accelerate your workflow and intuitive SDKs and widgets for developers."
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
        openGraph={{
          title: "thirdweb",
          type: "website",
          locale: "en_US",
          url: "https://blog.thirdweb.com",
          site_name: "thirdweb",
          images: [
            {
              url: "https://thirdweb.com/thirdweb-og.png",
              width: 1200,
              height: 650,
              alt: "thirdweb",
            },
          ],
        }}
        twitter={{
          handle: "@thirdweb_",
          site: "@thirdweb_",
          cardType: "summary_large_image",
        }}
        canonical={`https://blog.thirdweb.com${router.asPath}`}
      />

      <ChakraProvider theme={chakraTheme}>
        <GlobalStyle />
        <MDXProvider components={MdxComponents}>
          <BlogShell>
            <Component {...pageProps} />
          </BlogShell>
        </MDXProvider>
      </ChakraProvider>
    </Track>
  );
}
export default ConsoleApp;
