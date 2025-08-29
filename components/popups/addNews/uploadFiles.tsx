import React, { useRef } from "react";

interface DocumentUploadProps {
  projectId: string;
  onUploaded?: () => void;
}

export default function DocumentUpload({ projectId, onUploaded }: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Ouvre l’explorateur de fichiers au clic sur le bouton
  function handleButtonClick() {
    inputRef.current?.click();
  }

  // Envoie le fichier au serveur quand il est choisi
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectId", projectId);
    await fetch("/api/documents", {
      method: "POST",
      body: formData,
    });
    if (onUploaded) onUploaded();
  }

  return (
    <div>
      <button type="button" onClick={handleButtonClick}>
        Ajouter un document
      </button>
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      />
    </div>
  );
}