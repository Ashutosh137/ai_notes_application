"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import PdfViewer from "../_components/PdfViewer";
import { useQueries, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import TextEditior from "../_components/TextEditior";

function Workspace() {
  const { fileId } = useParams();
  const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
    fileId: fileId,
  });



  if (fileInfo) {
    return (
      <div>
        <WorkspaceHeader fileName={fileInfo?.fileName} />

        <div className="grid grid-cols-1 mx-5 md:grid-cols-2 gap-5">
          <TextEditior fileId={fileId} />
          <PdfViewer fileUrl={fileInfo?.fileUrl} />
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }
}

export default Workspace;
