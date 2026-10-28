import { getDictionary } from "@/content";
import { route } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { ContactPage } from "@/components/pages/ContactPage";

const page = getDictionary("pl").meta.pages.contact;
export const metadata = buildMetadata({ locale: "pl", path: route("pl", "contact"), title: page.title, description: page.description });

export default function Page() {
  return <ContactPage locale="pl" />;
}
