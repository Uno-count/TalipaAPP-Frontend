import { TabLinks } from "../TabLink";

export default function OrderTabLinks({ tabs, className = "" }) {
  const orderTabs = tabs.map((tab) => ({
    tab,
    key: tab,
    title: tab,
  }));
  return (
    <TabLinks
      tabs={orderTabs}
      className={`no-scrollbar sticky top-0 z-10 flex flex-nowrap  overflow-x-auto bg-white  text-lg shadow-md ${className}`}
      defaultClassName="flex px-14 md:px-5 items-center justify-center p-4 capitalize"
      activeClassName="border-b border-primary text-primary"
    />
  );
}
