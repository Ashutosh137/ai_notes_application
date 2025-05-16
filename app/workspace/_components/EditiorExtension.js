"use client";
import { chatSession } from "../../../configs/AIModel";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Download,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  Mic,
  Sparkles,
  Strikethrough,
  TextQuote,
  Underline,
  Play,
  Pause,
  Square,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import htmlDocx from "html-docx-js/dist/html-docx";
import { FileSaveContext } from "../../../app/_context/FileSaveContext";

function EditorExtension({ editor }) {
  const { fileId } = useParams();
  const SearchAI = useAction(api.myAction.search);
  const saveNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();
  const { fileSave, setFileSave } = useContext(FileSaveContext);
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [remainingText, setRemainingText] = useState("");

  // Text-to-Speech Functions
  const handlePlay = () => {
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );

    if (!selectedText) {
      toast.error("Please select text to speak");
      return;
    }

    if (!window.speechSynthesis) {
      toast.error("Text-to-speech not supported in your browser");
      return;
    }

    if (remainingText) {
      handleResume();
      return;
    }

    speechSynthesis.cancel();
    const newUtterance = new SpeechSynthesisUtterance(selectedText);
    setUtterance(newUtterance);

    newUtterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setRemainingText("");
    };

    newUtterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setRemainingText("");
    };

    speechSynthesis.speak(newUtterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (window.speechSynthesis) {
      try {
        speechSynthesis.pause();
        setIsPaused(true);
        setIsPlaying(false);
      } catch (e) {
        if (utterance) {
          speechSynthesis.cancel();
          const charIndex = utterance.charIndex || 0;
          setRemainingText(utterance.text.slice(charIndex));
          setIsPaused(true);
          setIsPlaying(false);
        }
      }
    }
  };

  const handleResume = () => {
    if (!remainingText) return;

    const newUtterance = new SpeechSynthesisUtterance(remainingText);
    setUtterance(newUtterance);

    newUtterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setRemainingText("");
    };

    speechSynthesis.speak(newUtterance);
    setRemainingText("");
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    if (window.speechSynthesis) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setRemainingText("");
    }
  };

  const onAiClick = async () => {
    toast("AI is getting your answer...");
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    if (!selectedText || selectedText.trim() === "") {
      toast.error("Please select text before using AI.");
      return;
    }

    try {
      const result = await SearchAI({
        query: selectedText,
        fileId: fileId,
      });

      const UnformattedAns = JSON.parse(result);
      let AllUnformattedAns = "";
      UnformattedAns?.forEach((item) => {
        AllUnformattedAns += item.pageContent;
      });

      const PROMPT = `
You are a helpful assistant. Given the following question and answer content, generate an HTML-formatted answer.
- Highlight key lines using <mark> tags.
- No markdown code blocks.
- Only return pure HTML content.

Question: ${selectedText}
Answer content: ${AllUnformattedAns}
`;
      const AiModelResult = await chatSession.sendMessage(PROMPT);
      const FinalAns = AiModelResult.response
        .text()
        .replace(/```/g, "")
        .replace("html", "");

      const AllText = editor.getHTML();
      editor.commands.setContent(
        AllText + "<p><strong>Answer: </strong>" + FinalAns + "</p>"
      );

      saveNotes({
        notes: editor.getHTML(),
        fileId: fileId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
    } catch (error) {
      toast.error("Failed to get AI response");
      console.error(error);
    }
  };

  const download = () => {
    const htmlString = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>Document</title></head>
      <body>${editor.getHTML()}</body>
      </html>
    `;
    const converted = htmlDocx.asBlob(htmlString);
    saveAs(converted, "document.docx");
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = async (event) => {
      setIsListening(false);
      const spokenText = event.results[0][0].transcript;
      toast.success(`You said: ${spokenText}`);

      try {
        const result = await SearchAI({
          query: spokenText,
          fileId: fileId,
        });

        const UnformattedAns = JSON.parse(result);
        let AllUnformattedAns = "";
        UnformattedAns?.forEach((item) => {
          AllUnformattedAns += item.pageContent;
        });

        const PROMPT = `Generate an answer for: ${spokenText}\nContent: ${AllUnformattedAns}`;
        const AiModelResult = await chatSession.sendMessage(PROMPT);
        const FinalAns = AiModelResult.response
          .text()
          .replace(/```/g, "")
          .replace("html", "");

        const AllText = editor.getHTML();
        editor.commands.setContent(
          AllText + "<p><strong>Answer: </strong>" + FinalAns + "</p>"
        );
        const newUtterance = new SpeechSynthesisUtterance(AllText);
        setUtterance(newUtterance);

        newUtterance.onend = () => {
          setIsPlaying(false);
          setIsPaused(false);
          setRemainingText("");
        };

        newUtterance.onerror = () => {
          setIsPlaying(false);
          setIsPaused(false);
          setRemainingText("");
        };

        speechSynthesis.speak(newUtterance);
        setIsPlaying(true);
        setIsPaused(false);

        saveNotes({
          notes: editor.getHTML(),
          fileId: fileId,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        });
      } catch (error) {
        toast.error("Voice command failed");
        console.error(error);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      toast.error("Speech recognition failed");
      console.error(event.error);
    };

    recognition.onstart = () => {
      setIsListening(true);
      toast("Listening... Speak now!");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  useEffect(() => {
    if (fileSave) {
      saveNotes({
        notes: editor.getHTML(),
        fileId: fileId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      toast("File Saved");
    }
  }, [fileSave]);

  const ToolButton = ({
    onClick,
    active,
    icon: Icon,
    label,
    className = "",
  }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${
        active ? "text-blue-600 bg-blue-50" : "text-gray-600"
      } ${className}`}
      aria-label={label}
      title={label}
    >
      <Icon className="w-5 h-5" />
    </button>
  );

  const ToolDivider = () => <div className="w-px h-6 bg-gray-200 mx-1" />;

  return (
    editor && (
      <div className="p-2 md:p-4 bg-white border-b sticky top-0 z-10">
        <div className="flex flex-wrap items-center gap-1 md:gap-2 overflow-x-auto">
          {/* Text Formatting */}
          <div className="flex items-center gap-1">
            <ToolButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive("bold")}
              icon={Bold}
              label="Bold"
            />
            <ToolButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive("italic")}
              icon={Italic}
              label="Italic"
            />
            <ToolButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              active={editor.isActive("underline")}
              icon={Underline}
              label="Underline"
            />
            <ToolButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              active={editor.isActive("strike")}
              icon={Strikethrough}
              label="Strikethrough"
            />
            <ToolButton
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              active={editor.isActive("highlight")}
              icon={Highlighter}
              label="Highlight"
            />
          </div>

          <ToolDivider />

          {/* Headings */}
          <div className="flex items-center gap-1">
            <ToolButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              active={editor.isActive("heading", { level: 1 })}
              icon={Heading1}
              label="Heading 1"
            />
            <ToolButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              active={editor.isActive("heading", { level: 2 })}
              icon={Heading2}
              label="Heading 2"
            />
            <ToolButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              active={editor.isActive("heading", { level: 3 })}
              icon={Heading3}
              label="Heading 3"
            />
          </div>

          <ToolDivider />

          {/* Alignment */}
          <div className="flex items-center gap-1">
            <ToolButton
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              active={editor.isActive({ textAlign: "left" })}
              icon={AlignLeft}
              label="Align Left"
            />
            <ToolButton
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              active={editor.isActive({ textAlign: "center" })}
              icon={AlignCenter}
              label="Align Center"
            />
            <ToolButton
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              active={editor.isActive({ textAlign: "right" })}
              icon={AlignRight}
              label="Align Right"
            />
          </div>

          <ToolDivider />

          {/* Lists & Blocks */}
          <div className="flex items-center gap-1">
            <ToolButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              active={editor.isActive("bulletList")}
              icon={List}
              label="Bullet List"
            />
            <ToolButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              active={editor.isActive("blockquote")}
              icon={TextQuote}
              label="Blockquote"
            />
            <ToolButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              active={editor.isActive("code")}
              icon={Code}
              label="Code"
            />
          </div>

          <ToolDivider />

          {/* AI & Actions */}
          <div className="flex items-center gap-1">
            <ToolButton
              onClick={onAiClick}
              icon={Sparkles}
              label="AI Assist"
              className="text-purple-600 hover:bg-purple-50"
            />
            <ToolButton
              onClick={handleVoiceInput}
              icon={Mic}
              label="Voice Input"
              className={`${isListening ? "text-red-600 animate-pulse" : "text-gray-600"}`}
            />
            <ToolButton
              onClick={download}
              icon={Download}
              label="Download"
              className="text-green-600 hover:bg-green-50"
            />

            {/* Text-to-Speech Controls */}
            {!isPlaying && !isPaused && (
              <ToolButton
                onClick={handlePlay}
                icon={Play}
                label="Play"
                className="text-blue-600 hover:bg-blue-50"
              />
            )}
            {isPlaying && (
              <ToolButton
                onClick={handlePause}
                icon={Pause}
                label="Pause"
                className="text-yellow-600 hover:bg-yellow-50"
              />
            )}
            {isPaused && (
              <ToolButton
                onClick={handleResume}
                icon={Play}
                label="Resume"
                className="text-green-600 hover:bg-green-50"
              />
            )}
            {(isPlaying || isPaused) && (
              <ToolButton
                onClick={handleStop}
                icon={Square}
                label="Stop"
                className="text-red-600 hover:bg-red-50"
              />
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default EditorExtension;
