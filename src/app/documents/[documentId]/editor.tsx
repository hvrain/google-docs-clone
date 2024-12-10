import { use } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface EditorProps {
  params: Promise<{ documentId: string }>;
}

const Editor = ({ params }: EditorProps) => {
  const { documentId } = use(params);
  // eslint-disable-next-line no-console
  console.log(documentId);
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div className="bg-[#FAFBFD]">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
