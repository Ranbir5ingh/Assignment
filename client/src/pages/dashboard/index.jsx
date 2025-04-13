import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Check, Trash2, Loader2, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  addTask, 
  fetchTasks, 
  deleteTask, 
  toggleCompleteTask,
  clearCompletedTasks 
} from '@/store/task-slice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { taskItems, isLoading, error } = useSelector(state => state.task);
  const [newTask, setNewTask] = useState('');
  const {user} = useSelector((state)=>state.auth)
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Show errors as toasts
    if (error) {
      toast.error("Error", {
        description: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (user.id) {
        dispatch(fetchTasks(user.id));
      };
  }, [dispatch]);

  const handleAddTask = () => {
    if (!newTask.trim() || !user) return;
    
    const taskData = {
      title: newTask,
      completed: false
    };
    
    dispatch(addTask({ 
      userId: user.id, 
      taskData 
    }))
      .unwrap()
      .then(() => {
        setNewTask('');
        toast.success("Task added", {
          description: "Your new task has been created",
        });
      })
      .catch(error => {
        toast.error("Failed to add task", {
          description: error.message || "Something went wrong",
        });
      });
  };

  const handleToggleComplete = (taskId) => {
    if (!user) return;
    
    dispatch(toggleCompleteTask({ 
      userId: user.id, 
      taskId 
    }))
      .unwrap()
      .catch(error => {
        toast.error("Failed to update task", {
          description: error.message || "Something went wrong",
        });
      });
  };

  const handleDeleteTask = (taskId) => {
    if (!user) return;
    
    dispatch(deleteTask({ 
      userId: user.id, 
      taskId 
    }))
      .unwrap()
      .then(() => {
        toast.error("Task deleted", {
          description: "The task has been removed",
        });
      })
      .catch(error => {
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
      .catch(error => {
        toast.error("Failed to clear completed tasks", {
          description: error.message || "Something went wrong",
        });
      });
  };

  const filteredTasks = taskItems.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const getTasksStats = () => {
    const completed = taskItems.filter(task => task.completed).length;
    const pending = taskItems.length - completed;
    return { completed, pending, total: taskItems.length };
  };

  const stats = getTasksStats();

  const handleLogout = () => {
    toast.info("Logging out...");
    // In a real app, add actual logout logic here:
    // Example: dispatch(logout());
    // Example: navigate('/login');
  };

  if (isLoading && !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* Fixed Header */}
      <header className="bg-white border-b fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-primary">QuickTask</h1>
          
          {/* Mobile view */}
          <div className="flex md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{user?.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Desktop view */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right mr-2">
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarFallback className="bg-primary text-primary-foreground">{user?.initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Main Content - with top padding to account for fixed header */}
      <main className="flex-1 container mx-auto px-4 pt-20 pb-6 md:pt-24 md:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-green-600">{stats.completed}</div>
            </CardContent>
          </Card>
          
          <Card className="sm:col-span-2 md:col-span-1">
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-amber-500">{stats.pending}</div>
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
                  if (e.key === 'Enter') handleAddTask();
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
              <TabsList className="w-full md:w-auto mb-4 grid grid-cols-3 md:flex">
                <TabsTrigger value="all" className="flex-1 md:flex-initial">All Tasks</TabsTrigger>
                <TabsTrigger value="pending" className="flex-1 md:flex-initial">Pending</TabsTrigger>
                <TabsTrigger value="completed" className="flex-1 md:flex-initial">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <TaskList 
                  tasks={filteredTasks} 
                  onToggle={handleToggleComplete} 
                  onDelete={handleDeleteTask}
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
                  isLoading={isLoading} 
                />
              </TabsContent>
              
              <TabsContent value="completed" className="mt-0">
                <TaskList 
                  tasks={filteredTasks} 
                  onToggle={handleToggleComplete} 
                  onDelete={handleDeleteTask}
                  isLoading={isLoading}
                />
                {filteredTasks.length > 0 && filter === 'completed' && (
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

const TaskList = ({ tasks, onToggle, onDelete, isLoading }) => {
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

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div 
          key={task._id} 
          className={`flex items-center justify-between p-3 border rounded-md ${
            task.completed ? 'border-green-200 bg-green-50' : 'border-slate-200'
          }`}
        >
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className={task.completed ? 'text-green-600' : 'text-slate-400'}
              onClick={() => onToggle(task._id)}
              disabled={isLoading}
            >
              {task.completed ? <Check className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
            </Button>
            
            <div className="ml-2 break-all">
              <p className={`${task.completed ? 'line-through text-muted-foreground' : ''} pr-2`}>
                {task.title}
              </p>
              <p className="text-xs text-muted-foreground">
                Added {formatDate(task.createdAt)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 shrink-0 ml-2">
            {task.completed && (
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 hidden sm:inline-flex">
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
};

// Helper component for the circle icon
const Circle = ({ className }) => {
  return (
    <div className={`rounded-full border-2 ${className}`}></div>
  );
};

// Helper function to format dates
const formatDate = (date) => {
  if (!date) return 'unknown date';
  
  try {
    const now = new Date();
    const taskDate = new Date(date);
    
    // Check if date is valid
    if (isNaN(taskDate.getTime())) {
      return 'invalid date';
    }
    
    const diff = now - taskDate;
    
    // Less than 24 hours
    if (diff < 86400000) {
      return 'today';
    }
    // Less than 48 hours
    else if (diff < 172800000) {
      return 'yesterday';
    }
    // Format as date
    else {
      return taskDate.toLocaleDateString();
    }
  } catch (error) {
    return 'unknown date';
  }
};

export default Dashboard;