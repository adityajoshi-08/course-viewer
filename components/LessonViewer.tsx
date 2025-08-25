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
    <main style={{ flex: 1}} className='overflow-y-auto p-5 pt-1'>
      {lesson.mimeType.startsWith('video/') && (
        // <video controls width="100%" src={lesson.url} key={lesson.id}>
        //   Sorry, your browser doesn't support embedded videos.
        // </video>
        <div className="w-full h-[80vh]" >
            <iframe src={lesson.url} className="w-full h-full max-h-[80vh]" title={lesson.name}></iframe>
        </div>
      )}
      <div className='w-full flex items-center justify-between mt-4'>
        <h2 className='text-xl font-semibold font-poppins'>{lesson.name}</h2>
        <button onClick={onComplete} className='border border-blue-500 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer'>
            Complete and Continue
        </button>
      </div>
    </main>
  );
};