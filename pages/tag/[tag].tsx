import { Stack } from "@chakra-ui/layout";
import { BlogLayout } from "components/app-layouts/blog";
import { GuidesList } from "components/portal/guides-list";
import { PortalHeaderCard } from "components/portal/header-card";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { ConsolePage } from "pages/_app";
import { getAllBlogs } from "utils/mdxUtils";
import { GuideData } from "utils/portalTypes";

interface TagPageProps {
  tag: string;
  guides: GuideData[];
}

const TagPage: ConsolePage<TagPageProps> = ({ guides }) => {
  const tag = useSingleQueryParam("tag") as string;
  const { Track } = useTrack({
    page: "guide",
    tag,
  });

  return (
    <Track>
      <NextSeo
        title={`${tag.replace(/-/g, " ")} Guides | Blog`}
        openGraph={{
          title: `${tag.replace(/-/g, " ")} | Blog | thirdweb`,
          description: `${tag.replace(/-/g, " ")} guides and tutorials`,
          url: `https://blog.thirdweb.com/tag/${tag}`,
        }}
      />
      <Stack spacing={20}>
        <PortalHeaderCard
          title={`Blogs | ${tag.replace(/-/g, " ")}`}
          src="/assets/portal/module-header.png"
        />
        <GuidesList title="All blogs" guides={guides} />
      </Stack>
    </Track>
  );
};

export default TagPage;

TagPage.Layout = BlogLayout;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const guides = getAllBlogs().filter((guide) =>
    guide.metadata.tags.some((tag: string) => tag === params?.tag),
  );

  return {
    props: {
      guides,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllBlogs()
    .map((guide) =>
      guide.metadata.tags.map((tag: string) => ({ params: { tag } })),
    )
    .flat();

  return {
    paths,
    fallback: false,
  };
};
