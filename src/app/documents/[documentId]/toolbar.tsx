"use client";

import { LucideIcon, Undo2Icon } from "lucide-react";

import useEditorStore from "@/store/useEditorStore";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  icon: Icon,
  isActive,
  onClick,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80 disabled:bg-neutral-200/80"
      disabled={!isActive}
    >
      <Icon className="size-4" />
    </button>
  );
};

const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: ({
    label: string;
  } & ToolbarButtonProps)[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        isActive: editor?.can().undo(),
        onClick: () => {
          editor?.commands.undo();
        },
      },
    ],
  ];

  return (
    <div className="flex min-h-[40px] items-center gap-x-0.5 overflow-y-auto rounded-3xl bg-[#f1f4f9] px-2.5 py-0.5">
      {sections.map((section) => (
        <div key={`${section[0].label}-section`}>
          {section.map((item) => (
            <ToolbarButton key={item.label} {...item} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Toolbar;
