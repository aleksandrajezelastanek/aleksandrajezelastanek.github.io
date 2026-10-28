import { getDictionary } from "@/content";
import { route } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { ExpertisePage } from "@/components/pages/ExpertisePage";

const page = getDictionary("pl").meta.pages.expertise;
export const metadata = buildMetadata({ locale: "pl", path: route("pl", "expertise"), title: page.title, description: page.description });

export default function Page() {
  return <ExpertisePage locale="pl" />;
}
