"use client";

import React, { useState } from "react";
import { ColorChangeHandler, ColorResult, SketchPicker } from "react-color";

import { Level } from "@tiptap/extension-heading";
import {
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
      className={cn(
        "flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80",
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

const VerticalSeparator = () => {
  return (
    <Separator orientation="vertical" className="h-6 w-[1px] bg-neutral-300" />
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const handleColorChange: ColorChangeHandler = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-7 min-w-7 shrink-0 flex-col items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80">
          <span>A</span>
          <div className="h-0.5 w-4" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-0 p-0">
        <SketchPicker color={value} onChange={handleColorChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#FFFFFF";

  const handleColorChange: ColorChangeHandler = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-7 min-w-7 shrink-0 flex-col items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80">
          <HighlighterIcon className="size-4" />
          <div className="h-0.5 w-4" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-0 p-0">
        <SketchPicker color={value} onChange={handleColorChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  const handleLinkChange = () => {
    editor?.chain().focus().setLink({ href: value }).run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="flex h-7 min-w-7 shrink-0 flex-col items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-0 p-0">
        <form
          className="flex items-center gap-x-2 p-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            handleLinkChange();
          }}
        >
          <Input
            placeholder="https://example.com"
            autoFocus
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
          <Button type="submit">Apply</Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageUploadButton = () => {
  const { editor } = useEditorStore();
  const [imageUrl, setImageUrl] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onChange(url);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-7 min-w-7 shrink-0 flex-col items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80">
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleImageUpload}>
            <UploadIcon className="mr-2 size-4" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialogOpen(true)}>
            <SearchIcon className="mr-2 size-4" />
            Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image URL"
            value={imageUrl}
            onChange={({ target }) => setImageUrl(target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
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
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => {
          editor?.chain().focus().toggleBold().run();
        },
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => {
          editor?.chain().focus().toggleItalic().run();
        },
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => {
          editor?.chain().focus().toggleUnderline().run();
        },
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        isActive: false,
        onClick: () => {}, // TODO: comment 추가 기능 구현
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        isActive: editor?.isActive("taskList"),
        onClick: () => {
          editor?.chain().focus().toggleTaskList().run();
        },
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => {
          editor?.chain().focus().unsetAllMarks().run();
        },
      },
    ],
  ];

  return (
    <div className="flex min-h-[40px] items-center gap-x-0.5 overflow-y-auto rounded-3xl bg-[#f1f4f9] px-2.5 py-0.5">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <VerticalSeparator />
      <FontFamilyButton />
      <VerticalSeparator />

      <HeadingLevelButton />
      <VerticalSeparator />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />
      <HighlightButton />
      <VerticalSeparator />
      <LinkButton />
      <ImageUploadButton />
      {/* TODO: Highlight Color */}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
