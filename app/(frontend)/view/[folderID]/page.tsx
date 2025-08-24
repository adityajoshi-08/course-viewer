"use client"

import { getCourses } from '@/actions/courses';
import CourseSidebar from '@/components/CourseSidebar';
import { LessonViewer } from '@/components/LessonViewer';
import { CourseItem } from '@/schema/CourseItem';
import { useParams } from 'next/navigation';
import React from 'react';

// --- Helper Functions ---

/**
 * Recursively searches through course items to find the first item of type 'file'.
 * This serves as a fallback for the first time a user views a course.
 * @param items - The array of CourseItem to search through.
 * @returns The first 'file' type CourseItem found, or null.
 */
function findFirstLesson(items: CourseItem[]): CourseItem | null {
  for (const item of items) {
    if (item.type === 'file') return item;
    if (item.type === 'folder' && item.children) {
      const found = findFirstLesson(item.children);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Recursively searches through course items to find a specific lesson by its unique ID.
 * This is used to retrieve the correct lesson object from freshly fetched course data.
 * @param items - The array of CourseItem to search through.
 * @param id - The ID of the lesson to find.
 * @returns The CourseItem matching the ID, or null if not found.
 */
function findLessonById(items: CourseItem[], id: string): CourseItem | null {
  for (const item of items) {
    if (item.id === id && item.type === 'file') return item;
    if (item.type === 'folder' && item.children) {
      const found = findLessonById(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

// Define a type for our progress object for better type safety
type CourseProgress = {
  [courseId: string]: string; // Maps a courseId to its last viewed lessonId
};


// --- Main Component ---

export default function ViewCourse() {
  const params = useParams();
  // We'll use folderID as the unique identifier for the course
  const courseId = String(params.folderID);

  const [data, setData] = React.useState<CourseItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [activeLesson, setActiveLesson] = React.useState<CourseItem | null>(null);

  React.useEffect(() => {
    if (!courseId) return;

    async function fetchData() {
      setLoading(true);
      try {
        // Fetch the latest course structure from the server
        const response: any = await getCourses(courseId);
        if (response.error) {
          console.error(response.error);
          setData([]);
          return;
        }

        if (response.metadata && response.metadata.courseName) {
          document.title = response.metadata.courseName + " - Course Viewer";
        } else {
          document.title = "Course Viewer";
        }

        const courseData: CourseItem[] = response.data || [];
        setData(courseData);

        let lessonToView: CourseItem | null = null;
        
        // 1. Get the entire progress object from storage
        const progressString = window.localStorage.getItem('courseProgress');
        const allProgress: CourseProgress = progressString ? JSON.parse(progressString) : {};

        // 2. Look up the last viewed lesson ID for the *current* course
        const lastViewedLessonId = allProgress[courseId];

        if (lastViewedLessonId) {
          // 3. Find the lesson object within the freshly fetched data
          lessonToView = findLessonById(courseData, lastViewedLessonId);
        }

        // 4. If no progress was stored, or the lesson was deleted, fall back to the first lesson
        if (!lessonToView) {
          lessonToView = findFirstLesson(courseData);
        }

        setActiveLesson(lessonToView);

      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [courseId]); 

  /**
   * Handles clicks on a lesson in the sidebar.
   * Sets the new active lesson and saves its ID to local storage.
   * @param item - The CourseItem that was clicked.
   */
  function handleLessonClick(item: CourseItem) {
    setActiveLesson(item);

    // 1. Get the current progress object or create a new one
    const progressString = window.localStorage.getItem('courseProgress');
    const allProgress: CourseProgress = progressString ? JSON.parse(progressString) : {};

    // 2. Update or add the progress for the current course
    allProgress[courseId] = item.id;

    // 3. Save the entire updated object back to storage
    window.localStorage.setItem('courseProgress', JSON.stringify(allProgress));
  }

  if (loading) {
    return <div>Loading course...</div>;
  }

  return (
    <div className='flex w-screen h-screen'>
      <CourseSidebar
        items={data}
        activeLessonId={activeLesson?.id || null}
        completedLessons={new Set()}
        onLessonClick={handleLessonClick}
      />
      <LessonViewer
        lesson={activeLesson}
        onComplete={() => {}} // Placeholder function for completion logic
      />
    </div>
  );
}