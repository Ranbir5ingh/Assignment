import { Check, Loader2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function TaskList({ tasks, onToggle, onDelete, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="rounded-full bg-muted p-3 mb-3">
          <Check className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-medium">No tasks found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Add a new task to get started.
        </p>
      </div>
    );
  }

  const Circle = ({ className }) => {
    return <div className={`rounded-full border-2 ${className}`}></div>;
  };

  const formatDate = (date) => {
    if (!date) return "unknown date";
    try {
      const now = new Date();
      const taskDate = new Date(date);

      if (isNaN(taskDate.getTime())) {
        return "invalid date";
      }

      const diff = now - taskDate;

      if (diff < 86400000) {
        return "today";
      } else if (diff < 172800000) {
        return "yesterday";
      } else {
        return taskDate.toLocaleDateString();
      }
    } catch (error) {
      return "unknown date";
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`flex items-center justify-between p-3 border rounded-md ${
            task.completed ? "border-green-200 bg-green-50" : "border-slate-200"
          }`}
        >
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className={task.completed ? "text-green-600" : "text-slate-400"}
              onClick={() => onToggle(task._id)}
              disabled={isLoading}
            >
              {task.completed ? (
                <Check className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </Button>

            <div className="ml-2 break-all">
              <p
                className={`${
                  task.completed ? "line-through text-muted-foreground" : ""
                } pr-2`}
              >
                {task.title}
              </p>
              <p className="text-xs text-muted-foreground">
                Added {formatDate(task.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0 ml-2">
            {task.completed && (
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 hover:bg-green-100 hidden sm:inline-flex"
              >
                Completed
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
              onClick={() => onDelete(task._id)}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
