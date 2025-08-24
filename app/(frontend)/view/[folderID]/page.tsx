"use client"
import { getCourses } from '@/actions/courses';
import CourseSidebar from '@/components/CourseSidebar';
import { LessonViewer } from '@/components/LessonViewer';
import { CourseItem } from '@/schema/CourseItem';
import { useParams } from 'next/navigation';
import React from 'react';

// Helper function to reliably find the first file to display
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

export default function ViewCourse() {
  const params = useParams();
  const folderID = String(params.folderID);

  // FIX 1: The type should be an array of CourseItem
  const [data, setData] = React.useState<CourseItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeLesson, setActiveLesson] = React.useState<CourseItem | null>(null);

  React.useEffect(() => {
    if (!folderID) return;

    async function fetchData() {
      setLoading(true);
      try {
        const response: any = await getCourses(folderID);
        if (response.error) {
          console.error(response.error);
        } else {
          setData(response.data);
          // Set the first actual lesson as active, not just the first item
          const firstLesson = findFirstLesson(response.data);
          setActiveLesson(firstLesson);
        }
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [folderID]); 

  function handleLessonClick(item: CourseItem) {
    setActiveLesson(item);
  }

  if (loading) {
    return <div>Loading course...</div>;
  }

  return (
    <div className='flex w-screen h-screen'>
      <CourseSidebar
        items={data}
        // FIX 2: Pass the ID from the activeLesson object, not the whole object
        activeLessonId={activeLesson?.id || null}
        completedLessons={new Set()}
        onLessonClick={handleLessonClick}
      />
      <LessonViewer
        // Pass the full lesson object to the viewer
        lesson={activeLesson}
        onComplete={() => {}} // Placeholder function
      />
    </div>
  );
}