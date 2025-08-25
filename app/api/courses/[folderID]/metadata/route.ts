import { getGoogleDriveApiKey } from "@/lib/utils";
import axios from "axios";
import responseBuilder, { jsonResponse } from "@/lib/response";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ folderID: string }> }
) {
  try {
    const { folderID } = await params;
    const apiKey = getGoogleDriveApiKey();
    // Fetch only the name for efficiency
    const url = `https://www.googleapis.com/drive/v3/files/${folderID}?key=${apiKey}&fields=name`;

    const response = await axios.get<{ name: string }>(url);
    
    return jsonResponse(responseBuilder.success({ name: response.data.name }));
  } catch (error) {
    return jsonResponse(responseBuilder.error("Failed to fetch metadata", 500));
  }
}