
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  showCount?: boolean;
  maxCount?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, showCount, maxCount, onChange, maxLength, ...props }, ref) => {
    const [charCount, setCharCount] = React.useState(props.value?.toString().length || 0);
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      
      if (onChange) {
        onChange(e);
      }
    };
    
    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            showCount && "pb-6",
            className
          )}
          ref={ref}
          onChange={handleChange}
          maxLength={maxCount || maxLength}
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
Textarea.displayName = "Textarea"

export { Textarea }
