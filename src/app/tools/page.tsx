import ToolsShowcase from "@/components/ToolsShowcase";
import PageHeader from "@/components/PageHeader";
export const metadata = { title: "Tools — AIBA" };
export default function Tools() {
  return (<><PageHeader eyebrow="Our stack" title="The tools we use." lede="The AI tools we teach and the ones our teams use to build. Most have a free version. Pick a group to filter, and each card shows the lessons that use it." /><ToolsShowcase /></>);
}
