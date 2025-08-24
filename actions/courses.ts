import axios from "axios";

export async function getCourses(folderID: string) {
    const response = await axios.get(`/api/folder_details/${folderID}`);
    return response.data;
}