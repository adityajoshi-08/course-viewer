import { getGoogleDriveApiKey } from "@/lib/utils";
import axios from "axios";
import responseBuilder, { jsonResponse } from "@/lib/response";

// This handler returns ONLY the modifiedTime of a folder.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ folderID: string }> } // Note: The type is a Promise
) {
  try {
    // Await the params object before destructuring
    const { folderID } = await params;
    const apiKey = getGoogleDriveApiKey();
    
    const url = `https://www.googleapis.com/drive/v3/files/${folderID}?key=${apiKey}&fields=modifiedTime`;

    const response = await axios.get<{ modifiedTime: string }>(url);

    return jsonResponse(responseBuilder.success({ 
      modifiedTime: response.data.modifiedTime 
    }));
    
  } catch (error) {
    console.error("Failed to fetch folder timestamp:", error);
    return jsonResponse(responseBuilder.error("Failed to fetch folder timestamp", 500));
  }
}