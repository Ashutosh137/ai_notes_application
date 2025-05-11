import React from "react";
import { BookOpen, FileText, Search, Sparkles, Clock, Share2 } from 'lucide-react';

function FeatureSection() {
  return (
    <div className="relative py-20 px-10 md:px-20" id="features">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <div className="relative">
        <div className="flex flex-col justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
              Powerful <span className="text-red-500">Features</span> for Effortless PDF Management
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our AI-powered tools transform how you interact with PDF documents, making information extraction and note-taking seamless.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 mt-16 max-w-6xl mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI-Powered Summaries</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Generate concise summaries of any PDF document with a single click, extracting key insights instantly.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-blue-500/10 p-4 mb-4">
                <Search className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Smart Search</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Find exactly what you need with our intelligent search that understands context and meaning.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-red-500/10 p-4 mb-4">
                <FileText className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Intelligent Annotations</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Add context-aware annotations that organize themselves and link related concepts automatically.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Knowledge Extraction</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Transform dense PDFs into structured knowledge that integrates with your existing notes.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-blue-500/10 p-4 mb-4">
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Time-Saving Automation</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Automate repetitive tasks like highlighting, categorizing, and organizing your research materials.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-red-500/10 p-4 mb-4">
                <Share2 className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Seamless Sharing</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Share your annotated PDFs and insights with colleagues while maintaining perfect formatting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSection;
