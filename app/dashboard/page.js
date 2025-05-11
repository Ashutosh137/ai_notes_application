"use client";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import React, { useEffect } from "react";
import UploadPdfDialog from "./_components/UploadPdfDialog";
import Link from "next/link";
import { FileText, Loader2, Plus } from "lucide-react";

function Dashboard() {
  const { user, isLoaded } = useUser();

  // User creation logic
  const createUser = useMutation(api.user.createUser);
  useEffect(() => {
    if (isLoaded && user) {
      CheckUser();
    }
  }, [user, isLoaded]);

  const CheckUser = async () => {
    try {
      const result = await createUser({
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
        userName: user?.fullName,
      });
      console.log(result);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // File list query
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  return (
    <div className="px-4 md:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="font-bold text-2xl md:text-3xl">My Workspace</h2>
          <p className="text-sm text-muted-foreground">
            {fileList?.length || 0}{" "}
            {fileList?.length === 1 ? "document" : "documents"}
          </p>
        </div>

        <UploadPdfDialog />
      </div>

      {fileList === undefined ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-slate-200 rounded-md h-[150px] animate-pulse"
            ></div>
          ))}
        </div>
      ) : fileList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {fileList.map((file) => (
            <Link key={file._id} href={`/workspace/${file.fileId}`}>
              <div className="group flex flex-col p-4 h-full border rounded-lg hover:border-primary hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-md group-hover:bg-gray-100 mb-3">
                  <FileText className="w-10 h-10 text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm md:text-base line-clamp-2">
                    {file.fileName}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
         <Plus size={50} className="bg-input rounded-full p-2"/>
          <h3 className="text-xl font-medium">No documents yet</h3>
          <p className="text-muted-foreground max-w-md">
            Get started by uploading your first PDF document
          </p>
          <div className="mt-4">
            <UploadPdfDialog />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
