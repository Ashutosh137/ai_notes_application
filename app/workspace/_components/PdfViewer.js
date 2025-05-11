import React from "react";

function PdfViewer({ fileUrl }) {
  return (
    <div className="mx-5 h-[calc(100vh-4rem)] ">
      <iframe
        src={fileUrl + "#toolbar=0"}
        height="90vh"
        width="100%"
        className="h-full p-4"
      />
    </div>
  );
}

export default PdfViewer;
