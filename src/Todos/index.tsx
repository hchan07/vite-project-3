import { useTodos } from '../hooks/useTodos';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

const Todos = () => {
	const { data: todos, isLoading, isError, error } = useTodos();

	return (
		<div className="bg-[#F0F2F5] flex flex-col items-center py-20 px-4 font-sans">
			<div className="w-full max-w-lg">
				<AddTodo />
				<TodoList
					todos={todos}
					isLoading={isLoading}
					isError={isError}
					error={error}
				/>
			</div>
		</div>
	);
};

export default Todos;
