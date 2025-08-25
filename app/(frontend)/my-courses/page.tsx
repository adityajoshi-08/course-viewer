// app/my-courses/page.tsx

"use client"; // This page relies on localStorage, so it must be a client component

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCourseMetadata } from '@/actions/courses'; // Import the new action

// Define a type for the course data we'll display
type MyCourseInfo = {
  id: string;
  name: string;
};

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<MyCourseInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyCourses() {
      // 1. Get all course IDs from both progress trackers in localStorage
      const courseProgress = JSON.parse(window.localStorage.getItem('courseProgress') || '{}');
      const completedProgress = JSON.parse(window.localStorage.getItem('completedProgress') || '{}');
      
      const courseIdsFromProgress = Object.keys(courseProgress);
      const courseIdsFromCompleted = Object.keys(completedProgress);
      
      // Use a Set to get a list of unique course IDs
      const allCourseIds = new Set([...courseIdsFromProgress, ...courseIdsFromCompleted]);

      if (allCourseIds.size === 0) {
        setLoading(false);
        return;
      }
      
      // 2. Fetch the name for each unique course ID
      const courseDataPromises = Array.from(allCourseIds).map(async (courseId) => {
        const response: any = await getCourseMetadata(courseId);
        if (response.error) {
          return { id: courseId, name: `Course (ID: ${courseId})` }; // Fallback name
        }
        return { id: courseId, name: response.data.name };
      });
      
      const fetchedCourses = await Promise.all(courseDataPromises);
      setCourses(fetchedCourses);
      setLoading(false);
    }

    fetchMyCourses();
  }, []); // Run only once on component mount

  if (loading) {
    return <div className="p-8">Loading your courses...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>
      
      {courses.length > 0 ? (
        <ul className="space-y-4">
          {courses.map(course => (
            <li key={course.id}>
              <Link 
                href={`/course/${course.id}`} 
                className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-medium text-blue-600">{course.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't started any courses yet. Go explore!</p>
      )}
    </div>
  );
}