import fs from "fs";
import matter from "gray-matter";
import mdxPrism from "mdx-prism";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import remarkAutolinkHeadings from "remark-autolink-headings";
import remarkCodeTitles from "remark-code-titles";
import remarkSlug from "remark-slug";
import slugify from "slugify";

export const BLOGS_PATH = path.join(process.cwd(), "blog");
export const blogsFilePaths = fs
  .readdirSync(BLOGS_PATH)
  // Only include md(x) files
  .filter((pth) => /\.mdx?$/.test(pth));
export const getHeadings = (src: string) => {
  const headingLines = src.split("\n").filter((line) => line.match(/^###*\s/));

  return headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, "");
    const level = raw.slice(0, 3) === "###" ? 3 : 2;
    const link = `#${slugify(text, { lower: true, strict: true })}`;

    return { text, level, link };
  });
};

export const getMdxSource = async (content: string, data: any) =>
  await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkAutolinkHeadings, remarkSlug, remarkCodeTitles],
      rehypePlugins: [mdxPrism],
    },
    scope: data,
  });

export const getAllBlogs = () => {
  return blogsFilePaths
    .map((filePath: string) => {
      const source = fs.readFileSync(path.join(BLOGS_PATH, filePath));
      const { data } = matter(source);

      return {
        slug: filePath.replace(/\.mdx?$/, ""),
        metadata: data,
      };
    })
    .filter((guide: any) => !guide.metadata.draft)
    .sort((a, b) => {
      if (a.metadata.date > b.metadata.date) {
        return -1;
      }
      if (a.metadata.date < b.metadata.date) {
        return 1;
      }
      return 0;
    });
};
