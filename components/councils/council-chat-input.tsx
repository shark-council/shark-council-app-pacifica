import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { Spinner } from "../ui/spinner";

export function CouncilChatInput(props: {
  onSend: (message: string) => void;
  disabled: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleSubmit() {
    const value = textareaRef.current?.value.trim();
    if (!value || props.disabled) {
      return;
    }
    props.onSend(value);
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  }

  return (
    <div className="flex gap-2 items-end pt-2">
      <Textarea
        ref={textareaRef}
        onKeyDown={handleKeyDown}
        disabled={props.disabled}
        placeholder="Ask the council..."
        rows={2}
        className={cn(
          "flex-1 resize-none min-h-15",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
      />
      <Button
        onClick={handleSubmit}
        disabled={props.disabled}
        className="h-auto py-3 px-6"
      >
        {props.disabled && <Spinner />}
        Send
      </Button>
    </div>
  );
}
