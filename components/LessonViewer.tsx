import React from 'react';

interface Lesson {
  id: string;
  name: string;
  mimeType: string;
  url: string;
}

interface LessonViewerProps {
  lesson: Lesson | null;
  onComplete: () => void;
}

export function LessonViewer({ lesson, onComplete }: LessonViewerProps){
  if (!lesson) {
    return <div style={{ flex: 1, padding: '20px' }}>Select a lesson to get started.</div>;
  }
    // lesson = {
    //     id: "1XtgjeAdwycVljvEa8jg3mLwU2Yi5XEW7",
    //     name: "Sample Video Lesson",
    //     mimeType: "video/mp4",
    //     // url: "https://drive.google.com/uc?id=1XtgjeAdwycVljvEa8jg3mLwU2Yi5XEW7&export=download"
    //     url: "https://drive.google.com/file/d/1Z_C9WYEgbr7I7lUQdKtfqhwOFdIfA9k_/preview"
    // }
    
  return (
    <main style={{ flex: 1}} className='overflow-y-auto p-5'>
      <h2>{lesson.name}</h2>

      {lesson.mimeType.startsWith('video/') && (
        // <video controls width="100%" src={lesson.url} key={lesson.id}>
        //   Sorry, your browser doesn't support embedded videos.
        // </video>
        <iframe src={lesson.url} className="w-full h-full" title={lesson.name}></iframe>
      )}
      
      <button onClick={onComplete} style={{ marginTop: '20px' }}>
        Complete and Continue
      </button>
    </main>
  );
};