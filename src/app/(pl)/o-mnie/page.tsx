import { getDictionary } from "@/content";
import { route } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { AboutPage } from "@/components/pages/AboutPage";

const page = getDictionary("pl").meta.pages.about;
export const metadata = buildMetadata({ locale: "pl", path: route("pl", "about"), title: page.title, description: page.description });

export default function Page() {
  return <AboutPage locale="pl" />;
}
