"use client";

import React from "react";

import { Level } from "@tiptap/extension-heading";
import {
  ChevronDownIcon,
  LucideIcon,
  PrinterIcon,
  Redo2Icon,
  SpellCheckIcon,
  Undo2Icon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import useEditorStore from "@/store/useEditorStore";

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
  ];

  const getCurrentHeadingLevel = () => {
    for (let level = 0; level <= 5; level += 1) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-7 min-w-7 shrink-0 items-center justify-between gap-3 overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80">
          <span className="truncate">{getCurrentHeadingLevel()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={label}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
            style={{ fontSize }}
            className={cn(
              "item-center flex gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80",
              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value }) &&
                  "bg-neutral-200/80"),
            )}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: "Infer", value: "Infer" },
    { label: "Arial", value: "Arial" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
    { label: "Pretendard", value: "Pretendard" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-7 w-[120px] shrink-0 items-center justify-between gap-3 overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {fonts.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => {
              editor?.chain().focus().setFontFamily(value).run();
            }}
            style={{ fontFamily: value }}
            className={cn(
              "item-center flex gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-neutral-200/80",
            )}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator
        orientation="vertical"
        className="h-6 w-[1px] bg-neutral-300"
      />
      <FontFamilyButton />
      <Separator
        orientation="vertical"
        className="h-6 w-[1px] bg-neutral-300"
      />
      <HeadingLevelButton />
    </div>
  );
};

export default Toolbar;
