import { getDictionary } from "@/content";
import { route } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { PublicationsPage } from "@/components/pages/PublicationsPage";

const page = getDictionary("en").meta.pages.publications;
export const metadata = buildMetadata({
  locale: "en",
  path: route("en", "publications"),
  title: page.title,
  description: page.description,
});

export default function Page() {
  return <PublicationsPage locale="en" />;
}
