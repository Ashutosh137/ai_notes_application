import React from "react";
import Image from "next/image";

function SolutionSection() {
  return (
    <div className="relative py-20  dark:bg-gray-900" id="solution">
      <div className="container mx-auto  px-10 md:px-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
            <span className="text-blue-500">Solutions</span> for Every PDF Challenge
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover how our platform addresses common pain points and transforms your PDF workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 md:order-1">
            <div className=" dark:bg-gray-800 rounded-2xl  p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">For Students</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Extract key concepts from textbooks and research papers</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Create study guides automatically from course materials</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Link related concepts across multiple documents</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden ">
              <Image 
                src="/solution2.png" 
                alt="Student using PDF app" 
                fill
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden">
              <Image 
                src="/solution1.png" 
                alt="Professional using PDF app" 
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <div className=" dark:bg-gray-800 rounded-2xl  p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">For Professionals</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Quickly digest lengthy reports and extract actionable insights</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Organize research findings into structured knowledge bases</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Collaborate on documents with AI-assisted annotations</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SolutionSection;
