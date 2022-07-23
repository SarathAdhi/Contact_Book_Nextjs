import { Tab } from "@headlessui/react";
import clsx from "clsx";

type Props = {
  tabs: string[];
  panels: any[];
};

export const SwitchTabs = ({ tabs, panels }: Props) => {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-2 rounded-xl bg-blue-900/20 p-1 mb-5">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              clsx(
                "w-full rounded-lg p-2 text-sm font-medium leading-5 text-blue-700 focus:outline-none",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            {tab}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {panels.map((Panel, index) => (
          <Tab.Panel key={index}>
            <Panel />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
