export function getGoogleDriveApiKey(): string {
    console.log("API Key:", process.env.GOOGLE_DRIVE_API_KEY);
    return process.env.GOOGLE_DRIVE_API_KEY || "";
}