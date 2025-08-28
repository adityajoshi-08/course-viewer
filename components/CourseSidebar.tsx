"use client"
import { CourseItem } from "@/schema/CourseItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Checkbox } from "./ui/checkbox";

interface CourseItemProps {
    item: CourseItem;
    activeLessonId: string | null;
    completedLessons: Set<string>;
    onLessonClick: (item: CourseItem) => void;
}

export function CourseItemComponent({ item, activeLessonId, completedLessons, onLessonClick }: CourseItemProps) {
  const isActive = item.id === activeLessonId;
  const isCompleted = completedLessons.has(item.id);

  const itemClasses = `
    w-full p-2 pl-6 cursor-pointer transition-colors text-sm break-words
    ${isActive ? 'bg-blue-100 text-blue-800 font-semibold' : 'hover:bg-gray-100'}
  `;

  if (item.type === 'folder') {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={item.id} className="border-none">
          {/* The folder name is the trigger */}
          <AccordionTrigger className="p-2 text-xs font-bold uppercase text-gray-500 hover:no-underline">
            {item.name}
          </AccordionTrigger>
          {/* The folder's children are the content */}
          <AccordionContent>
            {item.children?.map((child: CourseItem) => (
              <CourseItemComponent 
                key={child.id}
                item={child} 
                activeLessonId={activeLessonId}
                completedLessons={completedLessons}
                onLessonClick={onLessonClick}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  // This is for rendering the files (lessons)
  return (
    <div 
      onClick={() => onLessonClick(item)}
      className={`${itemClasses} flex items-center gap-2`}
    >
      <Checkbox
        checked={isCompleted}
        disabled 
        // This class forces the checkbox to be visible even when disabled
        className="disabled:opacity-100"
      />
      <span className="w-[90%]">{item.name}</span>
    </div>
  );
}

// ... (CourseSidebar default export remains the same)

interface CourseSidebarProps {
  items: CourseItem[];
  activeLessonId: string | null;
  completedLessons: Set<string>;
  onLessonClick: (item: CourseItem) => void;
}


export default function CourseSidebar({items, activeLessonId, completedLessons, onLessonClick }: CourseSidebarProps) {
  return (
    // This is the corrected container div
    <div className="flex flex-col gap-2 pt-10 pb-5 flex-shrink-0 w-[300px] h-screen overflow-y-auto border-r">
      <span className="font-bold">
        {document.title}
      </span>
      {(items || []).map(item => (
        <CourseItemComponent 
          key={item.id}
          item={item}
          activeLessonId={activeLessonId}
          completedLessons={completedLessons}
          onLessonClick={onLessonClick}
        />
      ))}
    </div>
  );
}