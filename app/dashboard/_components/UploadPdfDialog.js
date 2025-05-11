"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2Icon } from 'lucide-react'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { toast } from 'sonner'
// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
// import workerSrc from "pdfjs-dist/legacy/build/pdf.worker.min.js?url";

// // Set the worker source
// pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
  
function UploadPdfDialog({children,isMaxFile}) {

    const generateUploadUrl=useMutation(api.fileStorage.generateUploadUrl);
    const addFileEntry=useMutation(api.fileStorage.AddFileEntryToDb);
    const getFileUrl=useMutation(api.fileStorage.getFileUrl);
    const embeddDocument=useAction(api.myAction.ingest)
    const {user}=useUser();
    const [file,setFile]=useState();
    const [loading,setLoading]=useState(false);
    const [fileName,setFileName]=useState();
    const [open,setOpen]=useState(false);
    const OnFileSelect=(event)=>{
        setFile(event.target.files[0]);
    }
    


// const extractTextFromPDF = async (file) => {
//   const arrayBuffer = await file.arrayBuffer();
//   const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

//   let fullText = "";

//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const content = await page.getTextContent();  // This will now work
//     const pageText = content.items.map(item => item.str).join(" ");
//     fullText += pageText + "\n";
//   }

//   return fullText.trim();
// };




    const OnUpload=async()=>{
        setLoading(true);

        if(!file||!fileName)
        {
          setLoading(false)
          toast(!file?'Please select pdf':'Please enter filename')
          return ;
        }
        try {
    // ✅ Step 1: Extract text
    // const extractedText = await extractTextFromPDF(file);
    // console.log("Extracted Text",extractedText);

    // ✅ Step 2: Split chunks (no API call!)
         // Step 1: Get a short-lived upload URL
         const postUrl = await generateUploadUrl();

         // Step 2: POST the file to the URL
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": file?.type },
            body: file,
        });
        console.log("result in upload function",result)
        const { storageId } = await result.json();
        console.log('StorageId',storageId);
        const fileId= uuid4();
        const fileUrl=await getFileUrl({storageId:storageId})
          // Step 3: Save the newly allocated storage id to the database
        
          const resp=await addFileEntry({
            fileId:fileId,
            storageId:storageId,
            fileName:fileName??'Untitled File',
            fileUrl:fileUrl,
            createdBy:user?.primaryEmailAddress?.emailAddress
            // textContent: extractedText
          }) 
          console.log("File Entry Response",resp)

        // console.log(resp);

        //API Call to Fetch PDF Proccess Data
        const ApiResp=await axios.get('/api/pdf-loader?pdfUrl='+fileUrl);
        console.log(ApiResp.data.result);
       await embeddDocument({
          splitText:ApiResp.data.result,
          fileId:fileId
        });
        // console.log(embdeddResult)
        setLoading(false);
        setOpen(false);

        toast('File is ready !')
          } catch (error) {
    console.error("Upload error:", error);
    toast("Something went wrong");
    setLoading(false);
  }
    }

  return (
    <Dialog open={open}>
  <DialogTrigger asChild>
      <Button onClick={()=>setOpen(true)} disabled={isMaxFile} className="w-full">+ Upload PDF File</Button>

  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Upload Pdf File</DialogTitle>
      <DialogDescription asChild>
            <div className=''>
            <h2 className='mt-5'>Select a file to Upload</h2>
                <div className='  gap-2 p-3 rounded-md border'>
                   
                    <input type='file' accept='application/pdf'
                    
                    onChange={(event)=>OnFileSelect(event)}/>
                </div>
                <div className='mt-2'>
                    <label>File Name *</label>
                    <Input placeholder="File Name" onChange={(e)=>setFileName(e.target.value)} />
                </div>

               
            </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button"  variant="secondary" onClick={()=>setOpen(false)}>
              Close
            </Button>
          </DialogClose>
          <Button onClick={OnUpload} disabled={loading}>
            {loading?
                <Loader2Icon className='animate-spin'/>:'Upload'
            }
            </Button>
        </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default UploadPdfDialog