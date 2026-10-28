import { getDictionary } from "@/content";
import { route } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { ResearchIndexPage } from "@/components/pages/ResearchPages";

const page = getDictionary("pl").meta.pages.research;
export const metadata = buildMetadata({ locale: "pl", path: route("pl", "research"), title: page.title, description: page.description });

export default function Page() {
  return <ResearchIndexPage locale="pl" />;
}
