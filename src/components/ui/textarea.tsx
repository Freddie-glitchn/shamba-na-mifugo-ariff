
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  showCount?: boolean;
  maxCount?: number;
  resizable?: boolean;
  autoGrow?: boolean;
  minHeight?: number;
  maxHeight?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    showCount, 
    maxCount, 
    onChange, 
    maxLength, 
    resizable = false,
    autoGrow = false,
    minHeight = 80,
    maxHeight = 300,
    ...props 
  }, ref) => {
    const [charCount, setCharCount] = React.useState(props.value?.toString().length || 0);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const combinedRef = useCombinedRefs(ref, textareaRef);
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      
      if (autoGrow && textareaRef.current) {
        adjustHeight();
      }
      
      if (onChange) {
        onChange(e);
      }
    };
    
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      
      textarea.style.height = "auto";
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    };
    
    React.useEffect(() => {
      if (autoGrow && textareaRef.current) {
        adjustHeight();
      }
    }, [props.value, autoGrow]);
    
    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            showCount && "pb-6",
            resizable ? "resize-y" : "resize-none",
            !resizable && autoGrow && "overflow-hidden",
            className
          )}
          ref={combinedRef}
          onChange={handleChange}
          maxLength={maxCount || maxLength}
          style={{ minHeight: `${minHeight}px`, maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
          {...props}
        />
        
        {showCount && (
          <div className={cn(
            "absolute bottom-1 right-2 text-xs text-muted-foreground",
            maxCount && charCount > maxCount * 0.8 && "text-amber-500",
            maxCount && charCount >= maxCount && "text-destructive"
          )}>
            {charCount}{maxCount ? `/${maxCount}` : ""}
          </div>
        )}
      </div>
    )
  }
)

// Helper function to combine refs
function useCombinedRefs<T>(...refs: React.Ref<T>[]) {
  const targetRef = React.useRef<T>(null);

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        (ref as React.MutableRefObject<T | null>).current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}

Textarea.displayName = "Textarea"

export { Textarea }
