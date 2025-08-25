import React from 'react';

// Interfaces remain the same...
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

export function LessonViewer({ lesson, onComplete }: LessonViewerProps) {
  if (!lesson) {
    return <div style={{ flex: 1, padding: '20px' }}>Select a lesson to get started.</div>;
  }
    
  return (
    // --- MODIFIED ---
    // Turn the main container into a flex column that fills the available height.
    <main style={{ flex: 1 }} className='flex flex-col h-full overflow-hidden p-5 pt-1'>
      
      {/* --- MODIFIED --- */}
      {/* This container will now grow to fill the space, and the iframe will fill it. */}
      {lesson.mimeType.startsWith('video/') && (
        <div className="w-full h-[80%]">
          <iframe 
            src={lesson.url} 
            className="w-full h-full" 
            title={lesson.name}
            // Add allowFullScreen for a better user experience
            allowFullScreen 
          ></iframe>
        </div>
      )}

      {/* --- MODIFIED --- */}
      {/* This container will not shrink, ensuring the button is always visible and clickable. */}
      <div className='w-full flex items-center justify-between mt-4 flex-shrink-0'>
        <h2 className='text-lg font-semibold font-poppins break-words max-w-[75%]'>{lesson.name}</h2>
        <button 
          onClick={onComplete} 
          className='border border-blue-500 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer w-[15vw]'
        >
          Complete and Continue
        </button>
      </div>
    </main>
  );
};