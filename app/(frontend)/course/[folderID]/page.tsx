// app/courses/[folderID]/page.tsx

"use client";

import React from 'react';
import { useParams } from 'next/navigation';
// Ensure your actions file has a 'getCourse' function
import { getCourses } from '@/actions/courses'; 
import CourseSidebar from '@/components/CourseSidebar';
import { LessonViewer } from '@/components/LessonViewer';
import { CourseItem } from '@/schema/CourseItem';

// --- Helper Functions ---

/**
 * Recursively searches through course items to find the first item of type 'file'.
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

/**
 * Flattens the nested course structure into a single, ordered array of lessons (files).
 */
function getFlatLessons(items: CourseItem[]): CourseItem[] {
  return items.reduce<CourseItem[]>((acc, item) => {
    if (item.type === 'file') {
      acc.push(item);
    } else if (item.type === 'folder' && item.children) {
      acc.push(...getFlatLessons(item.children));
    }
    return acc;
  }, []);
}

// Define a type for the last-viewed progress
type CourseProgress = {
  [courseId: string]: string; // Maps a courseId to its last viewed lessonId
};

// --- Main Component ---

export default function ViewCourse() {
  const params = useParams();
  const courseId = String(params.folderID);

  const [data, setData] = React.useState<CourseItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [completedLessons, setCompletedLessons] = React.useState(new Set<string>());
  const [activeLesson, setActiveLesson] = React.useState<CourseItem | null>(null);

  React.useEffect(() => {
    if (!courseId) return;

    // Simplified data fetching logic without caching
    async function initializeCourse() {
      setLoading(true);

      // Directly fetch fresh data from the server every time
      const freshData: any = await getCourses(courseId);
      
      if (freshData.error) {
        console.error(freshData.error);
        setLoading(false);
        return;
      }

      // Set the course data and page title
      setData(freshData.data);
      if (freshData.metadata?.courseName) {
        document.title = freshData.metadata.courseName + " - Course Viewer";
      }

      // Load user progress from localStorage (we still keep this)
      loadUserProgress(freshData.data);
      
      setLoading(false);
    }

    function loadUserProgress(courseData: CourseItem[]) {
      const completedString = window.localStorage.getItem('completedProgress');
      if (completedString) {
          const allCompleted = JSON.parse(completedString);
          if (allCompleted[courseId]) {
              setCompletedLessons(new Set(allCompleted[courseId]));
          } else {
              setCompletedLessons(new Set());
          }
      }
      const progressString = window.localStorage.getItem('courseProgress');
      const allProgress: CourseProgress = progressString ? JSON.parse(progressString) : {};
      const lastViewedId = allProgress[courseId];
      let lessonToView = findLessonById(courseData, lastViewedId || "");
      if (!lessonToView) {
          lessonToView = findFirstLesson(courseData);
      }
      setActiveLesson(lessonToView);
    }

    initializeCourse();
  }, [courseId]);

  /**
   * Handles clicks on a lesson in the sidebar.
   */
  function handleLessonClick(item: CourseItem) {
    setActiveLesson(item);
    const progressString = window.localStorage.getItem('courseProgress');
    const allProgress: CourseProgress = progressString ? JSON.parse(progressString) : {};
    allProgress[courseId] = item.id;
    window.localStorage.setItem('courseProgress', JSON.stringify(allProgress));
  }

  /**
   * Marks the current lesson as complete and moves to the next one.
   */
  function handleCompleteAndContinue() {
    if (!activeLesson || data.length === 0) return;

    const newCompleted = new Set(completedLessons);
    newCompleted.add(activeLesson.id);
    setCompletedLessons(newCompleted);

    // Save completion progress to localStorage
    const completedString = window.localStorage.getItem('completedProgress');
    const allCompletedProgress = completedString ? JSON.parse(completedString) : {};
    allCompletedProgress[courseId] = Array.from(newCompleted);
    window.localStorage.setItem('completedProgress', JSON.stringify(allCompletedProgress));

    // Move to the next lesson
    const flatLessons = getFlatLessons(data);
    const currentIndex = flatLessons.findIndex(lesson => lesson.id === activeLesson.id);

    if (currentIndex !== -1 && currentIndex < flatLessons.length - 1){
      const nextLesson = flatLessons[currentIndex + 1];
      handleLessonClick(nextLesson);
    } else {
      alert("You've completed all lessons in this course!");
    }
  }

  if (loading) {
    return <div>Loading course...</div>;
  }

  return (
    <div className='flex w-screen h-screen container mx-auto'>
      <CourseSidebar
        items={data}
        activeLessonId={activeLesson?.id || null}
        completedLessons={completedLessons}
        onLessonClick={handleLessonClick}
      />
      <LessonViewer
        lesson={activeLesson}
        onComplete={handleCompleteAndContinue}
      />
    </div>
  );
}