import { getDictionary } from "@/content";
import { route } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { PublicationsPage } from "@/components/pages/PublicationsPage";

const page = getDictionary("pl").meta.pages.publications;
export const metadata = buildMetadata({
  locale: "pl",
  path: route("pl", "publications"),
  title: page.title,
  description: page.description,
});

export default function Page() {
  return <PublicationsPage locale="pl" />;
}
