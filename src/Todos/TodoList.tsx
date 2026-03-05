import type {Todo} from '../hooks/useAddTodoMutation';

const TodoList = ({todos, isLoading, isError, error}: {
  todos: Todo[],
  isLoading: boolean,
  isError: boolean,
  error: Error | null
}) => {
  

  if (isLoading) return <div className="p-4 animate-pulse text-slate-500">Loading tasks...</div>;
  
  if (isError) return <div className="p-4 text-red-500">Error: {error?.message}</div>;

return (
    <div className="bg-slate-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-xl font-bold text-slate-800">My Tasks</h1>
        </div>

        {/* List */}
        <div className="divide-y divide-slate-100">
          {todos.length > 0 ? (
            todos.map((todo: Todo) => (
              <button
                key={todo.id}
                
                className="w-full flex items-center px-6 py-4 transition-colors hover:bg-slate-50 group text-left"
              >
                {/* Checkbox Circle */}
                <div className={`
                  flex-shrink-0 w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all
                  ${todo.is_completed 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'border-slate-300 group-hover:border-blue-400'}
                `}>
                  {todo.is_completed && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Task Text */}
                <span className={`text-sm font-medium transition-all ${
                  todo.is_completed ? 'text-slate-400 line-through' : 'text-slate-700'
                }`}>
                  {todo.task}
                </span>
              </button>
            ))
          ) : (
            <div className="p-10 text-center text-slate-400 text-sm italic">
              All caught up!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;