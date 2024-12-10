import Editor from "./editor";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  return (
    <div>
      <Editor params={params} />
    </div>
  );
};

export default DocumentIdPage;
