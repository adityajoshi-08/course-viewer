import axios from "axios";

import { NextRequest } from "next/server";
import responseBuilder, { jsonResponse } from "@/lib/response";
import { CourseItem } from "@/schema/CourseItem";
import { getGoogleDriveApiKey } from "@/lib/utils";



interface GoogleDriveResponseObject {
  "id": string;
  "name": string;
  "kind": string;
  "mimeType"?: string;
}

interface GoogleDriveResponse {
  "files": GoogleDriveResponseObject[];
}

// interface CourseItem {
//   id: string;
//   name: string;
//   type: "folder" | "file";
//   mimeType?: string;
//   children?: CourseItem[];
// }

/**
 * Fetches the name of a single folder from Google Drive.
 * @param folderID The ID of the folder to fetch.
 * @returns The name of the folder.
 */
async function getFolderName(folderID: string): Promise<string> {
  const apiKey = getGoogleDriveApiKey();
  const url = `https://www.googleapis.com/drive/v3/files/${folderID}?key=${apiKey}&fields=name`;
  
  const response = await axios.get<{ name: string }>(url);
  return response.data.name;
}

// Your main API route handler
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ folderID: string }> }
) {
  try {
    const { folderID } = await context.params;

    // --- MODIFIED LOGIC ---
    // Run both async operations in parallel for better performance
    const [courseName, nestedCourseData] = await Promise.all([
      getFolderName(folderID),         // Fetches the root folder's name
      getFolderContents(folderID)      // Recursively fetches all contents
    ]);

    // Create a metadata object with the course name
    const metadata = { courseName };

    // Pass the data and the new metadata to the response builder
    return jsonResponse(responseBuilder.success(nestedCourseData, metadata));

  } catch (error) {
    console.error("Failed to fetch Google Drive data:", error);
    return jsonResponse(responseBuilder.error("Failed to retrieve course data."));
  }
}

// Helper function to recursively fetch folder contents
async function getFolderContents(folderID: string): Promise<CourseItem[]> {
  const apiKey = getGoogleDriveApiKey();
  const url = `https://www.googleapis.com/drive/v3/files?key=${apiKey}&q='${folderID}' in parents&fields=files(id, name, mimeType)&orderBy=name`;

  const response = await axios.get<GoogleDriveResponse>(url);
  const files = response.data.files || [];

  // This will store the final, nested structure
  const content: CourseItem[] = [];

  for (const file of files) {
    if (file.mimeType === 'application/vnd.google-apps.folder') {
      const subfolderContent = await getFolderContents(file.id);
      content.push({
        id: file.id,
        name: file.name,
        type: 'folder',
        children: subfolderContent,
      });
    } else {

      // const downloadUrl = `https://drive.google.com/uc?id=${file.id}&export=download`;
      const downloadUrl = `https://drive.google.com/file/d/${file.id}/preview`;

      content.push({
        id: file.id,
        name: file.name,
        type: 'file',
        mimeType: file.mimeType,
        url: downloadUrl, // Add the manually constructed URL
      });
    }
  }

  return content;
}