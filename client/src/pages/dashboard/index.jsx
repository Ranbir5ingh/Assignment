import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  addTask,
  fetchTasks,
  deleteTask,
  toggleCompleteTask,
  clearCompletedTasks,
  updateTask,
} from "@/store/task-slice";
import Header from "@/components/common/header";
import TaskList from "@/components/task-list";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { taskItems, isLoading, error } = useSelector((state) => state.task);
  const [newTask, setNewTask] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (error) {
      toast.error("Error", {
        description: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchTasks(user.id));
    }
  }, [dispatch]);

  const handleAddTask = () => {
    if (!newTask.trim() || !user) return;

    const taskData = {
      title: newTask,
      completed: false,
    };

    dispatch(
      addTask({
        userId: user.id,
        taskData,
      })
    )
      .unwrap()
      .then(() => {
        setNewTask("");
        toast.success("Task added", {
          description: "Your new task has been created",
        });
      })
      .catch((error) => {
        toast.error("Failed to add task", {
          description: error.message || "Something went wrong",
        });
      });
  };

  const handleToggleComplete = (taskId) => {
    if (!user) return;

    dispatch(
      toggleCompleteTask({
        userId: user.id,
        taskId,
      })
    )
      .unwrap()
      .catch((error) => {
        toast.error("Failed to update task", {
          description: error.message || "Something went wrong",
        });
      });
  };

  const handleDeleteTask = (taskId) => {
    if (!user) return;

    dispatch(
      deleteTask({
        userId: user.id,
        taskId,
      })
    )
      .unwrap()
      .then(() => {
        toast.error("Task deleted", {
          description: "The task has been removed",
        });
      })
      .catch((error) => {
        toast.error("Failed to delete task", {
          description: error.message || "Something went wrong",
        });
      });
  };

  const handleClearCompleted = () => {
    if (!user) return;

    dispatch(clearCompletedTasks(user.id))
      .unwrap()
      .then(() => {
        toast.success("Completed tasks cleared", {
          description: "All completed tasks have been removed",
        });
      })
      .catch((error) => {
        toast.error("Failed to clear completed tasks", {
          description: error.message || "Something went wrong",
        });
      });
  };

  const handleEditTask = (taskId, newTitle) => {
    if (!user) return;

    dispatch(
      updateTask({
        userId: user.id,
        taskId,
        title: newTitle,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Task updated", {
          description: "Your task has been updated successfully",
        });
      })
      .catch((error) => {
        toast.error("Failed to update task", {
          description: error.message || "Something went wrong",
        });
      });
  };

  const filteredTasks = taskItems.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const getTasksStats = () => {
    const completed = taskItems.filter((task) => task.completed).length;
    const pending = taskItems.length - completed;
    return { completed, pending, total: taskItems.length };
  };

  const stats = getTasksStats();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header/>

      <main className="flex-1 container mx-auto px-4 pt-20 pb-6 md:pt-24 md:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold">
                {stats.total}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-green-600">
                {stats.completed}
              </div>
            </CardContent>
          </Card>

          <Card className="sm:col-span-2 md:col-span-1">
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-amber-500">
                {stats.pending}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">My Tasks</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 mb-4 md:mb-6">
              <Input
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAddTask();
                }}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleAddTask}
                className="mt-2 sm:mt-0 whitespace-nowrap"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                Add Task
              </Button>
            </div>

            <Tabs defaultValue="all" className="mb-4" onValueChange={setFilter}>
              <TabsList className="w-full h-auto md:w-fit mb-4 grid grid-cols-3 md:flex">
                <TabsTrigger value="all" className="flex-1 md:flex-initial">
                  All Tasks
                </TabsTrigger>
                <TabsTrigger value="pending" className="flex-1 md:flex-initial">
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="flex-1 md:flex-initial"
                >
                  Completed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <TaskList
                  tasks={filteredTasks}
                  onToggle={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                  isLoading={isLoading}
                />
                {stats.completed > 0 && (
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearCompleted}
                      disabled={isLoading}
                    >
                      Clear Completed
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pending" className="mt-0">
                <TaskList
                  tasks={filteredTasks}
                  onToggle={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                  isLoading={isLoading}
                />
              </TabsContent>

              <TabsContent value="completed" className="mt-0">
                <TaskList
                  tasks={filteredTasks}
                  onToggle={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                  isLoading={isLoading}
                />
                {filteredTasks.length > 0 && filter === "completed" && (
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearCompleted}
                      disabled={isLoading}
                    >
                      Clear All
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;