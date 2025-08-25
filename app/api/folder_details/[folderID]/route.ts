// app/folder_details/[folderID]/route.ts

import axios from "axios";
import { NextRequest } from "next/server";
import responseBuilder, { jsonResponse } from "@/lib/response";
import { CourseItem } from "@/schema/CourseItem";
import { getGoogleDriveApiKey } from "@/lib/utils";

// --- Re-introducing the TypeScript interfaces for type safety ---
interface GoogleDriveResponseObject {
  id: string;
  name: string;
  kind: string;
  mimeType?: string;
}

interface GoogleDriveResponse {
  files: GoogleDriveResponseObject[];
}

// Helper to get folder metadata (name AND modifiedTime)
async function getFolderMetadata(folderID: string) {
  const apiKey = getGoogleDriveApiKey();
  const url = `https://www.googleapis.com/drive/v3/files/${folderID}?key=${apiKey}&fields=name,modifiedTime`;
  const response = await axios.get<{ name: string; modifiedTime: string }>(url);
  return response.data;
}

// Main handler
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ folderID: string }> }
) {
  try {
    const { folderID } = await context.params;

    const [folderMetadata, nestedCourseData] = await Promise.all([
      getFolderMetadata(folderID),
      getFolderContents(folderID),
    ]);

    const metadata = {
      courseName: folderMetadata.name,
      modifiedTime: folderMetadata.modifiedTime,
    };

    return jsonResponse(responseBuilder.success(nestedCourseData, metadata));
  } catch (error) {
    console.error("Failed to fetch Google Drive data:", error);
    return jsonResponse(responseBuilder.error("Failed to retrieve course data."));
  }
}

// Recursive helper to get contents
async function getFolderContents(folderID: string): Promise<CourseItem[]> {
  const apiKey = getGoogleDriveApiKey();
  const url = `https://www.googleapis.com/drive/v3/files?key=${apiKey}&q='${folderID}' in parents&fields=files(id, name, mimeType)&orderBy=name`;

  // --- FIX APPLIED ---
  // Use the generic type for a fully typed response
  const response = await axios.get<GoogleDriveResponse>(url);
  const files = response.data.files || [];
  const content: CourseItem[] = [];

  for (const file of files) {
    if (file.mimeType === "application/vnd.google-apps.folder") {
      const children = await getFolderContents(file.id);
      content.push({ id: file.id, name: file.name, type: "folder", children });
    } else {
      content.push({
        id: file.id,
        name: file.name,
        type: "file",
        mimeType: file.mimeType,
        url: `https://drive.google.com/file/d/${file.id}/preview`,
      });
    }
  }
  return content;
}