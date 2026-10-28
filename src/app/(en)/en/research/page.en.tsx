import { getDictionary } from "@/content";
import { route } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { ResearchIndexPage } from "@/components/pages/ResearchPages";

const page = getDictionary("en").meta.pages.research;
export const metadata = buildMetadata({ locale: "en", path: route("en", "research"), title: page.title, description: page.description });

export default function Page() {
  return <ResearchIndexPage locale="en" />;
}
