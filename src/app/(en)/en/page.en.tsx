import { getDictionary } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { HomePage } from "@/components/pages/HomePage";

const { home } = getDictionary("en").meta.pages;
export const metadata = buildMetadata({
  locale: "en",
  path: "/en/",
  title: home.title,
  description: home.description,
  absoluteTitle: true,
});

export default function Page() {
  return <HomePage locale="en" />;
}
