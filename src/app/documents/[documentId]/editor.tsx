"use client";

import { use } from "react";

import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";

import useEditorStore from "@/store/useEditorStore";

interface EditorProps {
  params: Promise<{ documentId: string }>;
}

const Editor = ({ params }: EditorProps) => {
  const { documentId } = use(params);
  // eslint-disable-next-line no-console
  console.log(documentId);
  const { setEditor } = useEditorStore();
  const editor = useEditor({
    onCreate: (props) => {
      setEditor(props.editor);
    },
    onUpdate: (props) => {
      setEditor(props.editor);
    },
    onFocus: (props) => {
      setEditor(props.editor);
    },
    onBlur: (props) => {
      setEditor(props.editor);
    },
    onTransaction: (props) => {
      setEditor(props.editor);
    },
    onSelectionUpdate: (props) => {
      setEditor(props.editor);
    },
    onContentError: (props) => {
      setEditor(props.editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right: 56px;",
        class:
          "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] min-w-[816px] py-10 cursor-text",
      },
    },
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      ImageResize,
    ],
    content: `
			<table>
				<tbody> 
					<tr> 
						<th>Name</th>
						<th colspan="3">Description</th> 
					</tr>
					<tr>
						<td>Cyndi Lauper</td>
						<td>Singer</td>
						<td>Songwriter</td> 
						<td>Actress</td>
					</tr>
				</tbody>
			</table>
		`,
  });

  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:overflow-visible print:bg-white print:p-0">
      <div className="mx-auto flex w-[816px] min-w-0 justify-center py-4 print:w-full print:min-w-0 print:py-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
