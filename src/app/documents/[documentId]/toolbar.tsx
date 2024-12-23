"use client";

import React from "react";

import {
  LucideIcon,
  PrinterIcon,
  Redo2Icon,
  SpellCheckIcon,
  Undo2Icon,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import useEditorStore from "@/store/useEditorStore";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  icon: Icon,
  isActive = true,
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
      {
        label: "Redo",
        icon: Redo2Icon,
        isActive: editor?.can().redo(),
        onClick: () => {
          editor?.commands.redo();
        },
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => {
          window.print();
        },
      },
      {
        label: "SpellCheck",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false",
          );
        },
      },
    ],
  ];

  return (
    <div className="flex min-h-[40px] items-center gap-x-0.5 overflow-y-auto rounded-3xl bg-[#f1f4f9] px-2.5 py-0.5">
      {sections.map((section) => (
        <React.Fragment key={`${section[0].label}-section`}>
          {section.map((item) => (
            <ToolbarButton key={item.label} {...item} />
          ))}
          <Separator
            orientation="vertical"
            className="h-6 w-[1px] bg-neutral-300"
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Toolbar;
