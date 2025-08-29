interface Document {
  id: string;
  title: string;
  fileUrl: string;
  projectId: string;
}

interface ProjectDocumentsProps {
  documents: Document[];
}

export default function ProjectDocuments({ documents }: ProjectDocumentsProps) {
  if (!documents || documents.length === 0) return <div>Aucun document</div>;
  return (
    <ul className="space-y-2">
      {documents.map(doc => (
        <li key={doc.id} className="flex items-center gap-3">
          {/\.(jpg|jpeg|png)$/i.test(doc.fileUrl) ?
            <img src={doc.fileUrl} alt={doc.title} className="w-24 h-24 object-cover rounded" />
            :
            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="underline">
              {doc.title}
            </a>
          }
        </li>
      ))}
    </ul>
  );
}