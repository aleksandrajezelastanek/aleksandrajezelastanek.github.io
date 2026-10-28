import { getDictionary } from "@/content";
import { route } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { ExpertisePage } from "@/components/pages/ExpertisePage";

const page = getDictionary("en").meta.pages.expertise;
export const metadata = buildMetadata({ locale: "en", path: route("en", "expertise"), title: page.title, description: page.description });

export default function Page() {
  return <ExpertisePage locale="en" />;
}
