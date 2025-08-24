import { z } from "zod";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CourseSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(["folder", "file"]),
    mimeType: z.string().optional(),
    children: z.array(CourseSchema).optional(),
  })
);

export type CourseItem = z.infer<typeof CourseSchema>;