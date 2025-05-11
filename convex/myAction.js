import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { api } from "./_generated/api.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText:v.any(),
    fileId:v.string()
  },
  handler: async (ctx,args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,// Array
      {fileId:args.fileId},//String
      new GoogleGenerativeAIEmbeddings({
        apiKey:'AIzaSyBkc1gF3iUPo9rNh_ak0YblKvW75s1wgIY',
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }

    );
    return "Completed.."

  },
});
// export const ingest = action({
//   args: {
//     splitText: v.any(),
//     fileId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const documents = args.splitText.map((text, i) => {
//   console.log(`Embedding #${i}:`, text.slice(0, 50)); // Print a preview
//   return new Document({
//     pageContent: text,
//     metadata: { fileId: args.fileId },
//   });
// });

//     await ConvexVectorStore.fromDocuments(
//       documents,
//       new GoogleGenerativeAIEmbeddings({
//         apiKey: 'AIzaSyBkc1gF3iUPo9rNh_ak0YblKvW75s1wgIY',
//         model: "text-embedding-004",
//         taskType: TaskType.RETRIEVAL_DOCUMENT,
//         title: "Document title",
//       }),
//       { ctx }
//     );

//     return "Completed..";
//   },
// });

// export const search = action({
//   args: {
//     query: v.string(),
//     fileId: v.string()
//   },
//   handler: async (ctx, args) => {
//     const vectorStore = new ConvexVectorStore(
//       new GoogleGenerativeAIEmbeddings({
//         apiKey: 'AIzaSyBkc1gF3iUPo9rNh_ak0YblKvW75s1wgIY',
//         model: "text-embedding-004",
//         taskType: TaskType.RETRIEVAL_DOCUMENT,
//         title: "Document title",
//       }),
//       { ctx } // ✅ CORRECT CLOSURE
//     );

//     console.log("in my action argument", args.fileId);

//     const resultOne = await vectorStore.similaritySearch(args.query, 5);
//     const filtered = resultOne.filter(q => q.metadata?.fileId === args.fileId);

//     console.log("printing result one", filtered);

//     return filtered;
//   },
// });
export const search = action({
  args: {
    query: v.string(),
    fileId: v.string()
  },
 handler: async (ctx, args) => {
  try {
    console.log("Starting search with fileId:", args.fileId, "and query:", args.query);

    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: 'AIzaSyBkc1gF3iUPo9rNh_ak0YblKvW75s1wgIY',
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    const allResults = await vectorStore.similaritySearch(args.query, 30);
    console.log("ALL results:", allResults.map(r => r.metadata));

    const filtered = allResults.filter(
      (q) => q.metadata?.fileId === args.fileId
    );

    console.log("Filtered results:", filtered);
    return JSON.stringify(filtered);
  } catch (err) {
    console.error("Search action error:", err);
    throw new Error("Search failed: " + err.message);
  }
}
});
