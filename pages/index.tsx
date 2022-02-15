import { Stack } from "@chakra-ui/react";
import { FeaturedBlog } from "components/portal/FeaturedBlog";
import { GuidesList } from "components/portal/guides-list";
import { useTrack } from "hooks/analytics/useTrack";
import { NextSeo } from "next-seo";
import { ConsolePage } from "pages/_app";
import React from "react";
import { getAllBlogs } from "utils/mdxUtils";
import { GuidesPageProps } from "utils/portalTypes";

const Blog: ConsolePage<GuidesPageProps> = ({ guides: blogs }) => {
  const { Track } = useTrack({
    page: "blog_home",
  });
  return (
    <Track>
      <NextSeo
        title="Blog | Portal"
        openGraph={{
          title: "Blog | Portal | thirdweb",
          url: `https://blog.thirdweb.com`,
        }}
      />
      <Stack spacing={20}>
        <FeaturedBlog blog={blogs[0]} />
        <GuidesList title="All blogs" guides={blogs} />
      </Stack>
    </Track>
  );
};

export async function getStaticProps() {
  const guides = getAllBlogs();

  return {
    props: { guides },
  };
}

export default Blog;
