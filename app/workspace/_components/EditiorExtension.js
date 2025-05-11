import { chatSession } from '@/configs/AIModel'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { ListBulletIcon } from '@radix-ui/react-icons'
import { useAction, useMutation } from 'convex/react'
import { AlignCenter, AlignLeft, AlignRight, Bold, Code, Download, Heading1, Heading2, Heading3, Highlighter, Italic, List, Space, Sparkles, Strikethrough, TextQuote, Underline } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { toast } from 'sonner'
import { saveAs } from 'file-saver';
import htmlDocx from 'html-docx-js/dist/html-docx';
import { FileSaveContext } from '@/app/_context/FileSaveContext'
import axios from "axios";

function EditiorExtension({editor}) {
    const {fileId}=useParams();
    const SearchAI=useAction(api.myAction.search)
    const saveNotes=useMutation(api.notes.AddNotes)
    const {user}=useUser();
    const {fileSave,setFileSave}=useContext(FileSaveContext);

    const onAiClick=async()=>{
        toast("AI is getting your answer...")
        const selectedText=editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        );
        if (!selectedText || selectedText.trim() === '') {
          toast.error("Please select a question or some text before using the AI.");
          return;
        }
        console.log("selectedText",selectedText);

        console.log("Calling SearchAI with:", selectedText, fileId);
const result = await SearchAI({
  query: selectedText,
  fileId: fileId,
});
console.log("RAW RESULT:", result);

        const UnformattedAns=JSON.parse(result);
        let AllUnformattedAns='';
        UnformattedAns&&UnformattedAns.forEach(item=>{
            AllUnformattedAns=AllUnformattedAns+item.pageContent
        });
        // if (!AllUnformattedAns || AllUnformattedAns.trim().length === 0) {
        //   toast.error("No content found for the question");
        //   return;
        // }
        const PROMPT = `
You are a helpful assistant. Given the following question and answer content, generate an HTML-formatted answer.

- Highlight the key lines using <mark> tags.
- Do not include markdown code blocks (e.g., no \`\`\`html).
- Only return pure HTML content.

Question: ${selectedText}

Answer content: ${AllUnformattedAns}
`;      console.log("PROMPT",PROMPT)
        const AiModelResult=await chatSession.sendMessage(PROMPT);
        console.log("AI MODEL Result",AiModelResult.response.text());
       const  FinalAns=AiModelResult.response.text().replace('```','').replace('html','').replace('```','');

        const AllText=editor.getHTML();
        editor.commands.setContent(AllText+'<p> <strong>Answer: </strong>'+FinalAns+' </p>');

        saveNotes({
          notes:editor.getHTML(),
          fileId:fileId,
          createdBy:user?.primaryEmailAddress?.emailAddress
        })
       
    }

    

    const download=()=>{
      console.log(editor.getHTML())
      const htmlString = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>Document</title></head>
      <body>${editor.getHTML()}</body>
      </html>
    `;
      let converted = htmlDocx.asBlob(htmlString);
      console.log(converted)
      saveAs(converted, 'document.docx');
    }

    useEffect(()=>{
      fileSave&&saveNotes({
        notes:editor.getHTML(),
        fileId:fileId,
        createdBy:user?.primaryEmailAddress?.emailAddress
      })
      fileSave&&toast('File Saved')
    },[fileSave])
    const handleVoiceInput = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        toast.error("Speech recognition not supported in this browser");
        return;
      }
    
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
    
      toast("Listening... Speak now!");
    
      recognition.onresult = async (event) => {
        const spokenText = event.results[0][0].transcript;
        console.log("You said:", spokenText);
        toast.success(`You said: ${spokenText}`);
        const result=await SearchAI({
            query:spokenText,
            fileId:fileId
        })
        const UnformattedAns=JSON.parse(result);
        let AllUnformattedAns='';
        UnformattedAns&&UnformattedAns.forEach(item=>{
            AllUnformattedAns=AllUnformattedAns+item.pageContent
        });
    
        // Send to Gemini
        const PROMPT = `You are a helpful assistant. Given the following question and answer content, generate an HTML-formatted answer.

- Highlight the key lines using <mark> tags.
- Do not include markdown code blocks (e.g., no \`\`\`html).
- Only return pure HTML content.

Question: ${spokenText}

Answer content: ${AllUnformattedAns}
`; 
console.log("PROMPT",PROMPT)
        const AiModelResult=await chatSession.sendMessage(PROMPT);
        console.log("AI MODEL Result",AiModelResult.response.text());
       const  FinalAns=AiModelResult.response.text().replace('```','').replace('html','').replace('```','');

        const AllText=editor.getHTML();
        editor.commands.setContent(AllText+'<p> <strong>Answer: </strong>'+FinalAns+' </p>');
        const response = await axios.post(
  "http://localhost:8000/speech-to-text",
  { prompt: editor.getHTML() },
  { responseType: "blob" }
);

// Get Gemini's text from header
const finalText = response.headers["x-answer-text"];

// Play audio
const audioBlob = new Blob([response.data], { type: "audio/wav" });
const audioUrl = URL.createObjectURL(audioBlob);
new Audio(audioUrl).play();

// Append to editor
const currentHTML = editor.getHTML();
editor.commands.setContent(currentHTML + `<p><strong>Answer (voice):</strong> ${finalText}</p>`);

// Save
saveNotes({
  notes: editor.getHTML(),
  fileId: fileId,
  createdBy: user?.primaryEmailAddress?.emailAddress,
});
      };
    
      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        toast.error("Speech recognition failed");
      };
    
      recognition.start();
    };
    

  return editor&&(
    <div className='p-5 '>
        <div className="control-group">
        <div className="button-group flex gap-3">
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'text-blue-500' : ''}
          >
            <Heading1/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'text-blue-500' : ''}
          >
            <Heading2/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'text-blue-500' : ''}
          >
            <Heading3/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'text-blue-500' : ''}
          >
            <Bold/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'text-blue-500' : ''}
          >
            <Italic/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'text-blue-500' : ''}
          >
            <Underline/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'text-blue-500' : ''}
          >
            <Code/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'text-blue-500' : ''}
          >
            <List/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'text-blue-500' : ''}
          >
            <TextQuote/>
          </button>
          <button
            onClick={() => editor.chain().focus()?.toggleHighlight().run()}
            className={editor.isActive('highlight') ? 'text-blue-500' : ''}
          >
            <Highlighter/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'text-blue-500' : ''}
          >
            <Strikethrough/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'text-blue-500' : ''}
          >
            <AlignLeft/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'text-blue-500' : ''}
          >
            <AlignCenter/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'text-blue-500' : ''}
          >
            <AlignRight/>
          </button>

          <button
            onClick={() => onAiClick()}
            className={'hover:text-blue-500'}
          >
            <Sparkles/>
          </button>
          <button onClick={download}>
            <Download/>
          </button>
          </div>
          </div>
          <button onClick={handleVoiceInput}>
  🎙️
</button>
    </div>
  )
}

export default EditiorExtension