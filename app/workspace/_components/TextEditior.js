import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import EditorExtension from "./EditiorExtension";
function TextEditor({ fileId }) {
  const [isLoading, setIsLoading] = useState(true);
  const notes = useQuery(api.notes.GetNotes, {
    fileId: fileId,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start taking your notes here...",
      }),
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
        defaultAlignment: "left",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none p-4 md:p-6 min-h-[calc(100vh-8rem)]",
      },
    },
    onUpdate: () => {
      // Handle auto-save or changes here if needed
    },
  });

  useEffect(() => {
    if (editor && notes !== undefined) {
      try {
        if (notes) {
          editor.commands.setContent(notes);
        } else {
          editor.commands.clearContent();
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error setting editor content:", error);
        toast.error("Failed to load notes");
        setIsLoading(false);
      }
    }
  }, [notes, editor]);

  if (isLoading) {
    return <div className="p-4 space-y-4"></div>;
  }

  return (
    <div className="relative h-[calc(100vh-4rem)] overflow-hidden">
      <div className="sticky top-0 z-10 bg-white border-b">
        <EditorExtension editor={editor} />
      </div>

      <div className="overflow-y-auto h-[calc(100vh-8rem)]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
