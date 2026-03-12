import { useState } from 'react';
import { useAddTodoMutation } from '../hooks/useAddTodoMutation';
import { useQueryClient } from '@tanstack/react-query';

type AddTodoFormProps = {
	// Use FormEvent for the event object 'e'
	onSubmitAddTodo: (e: React.SubmitEvent<HTMLFormElement>) => void;
	todoText: string;
	onChangeTodoText: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AddTodoForm = ({
	onSubmitAddTodo,
	todoText,
	onChangeTodoText,
}: AddTodoFormProps) => {
	return (
		<form onSubmit={onSubmitAddTodo} className="flex gap-2 mb-6">
			<input
				type="text"
				value={todoText}
				onChange={onChangeTodoText}
				placeholder="Add todo"
				className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm text-gray-700"
			/>
			<button
				type="submit"
				className="bg-[#2563EB] text-white px-5 py-3 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
			>
				<svg
					className="w-6 h-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2.5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 4v16m8-8H4"
					/>
				</svg>
			</button>
		</form>
	);
};

const AddTodo = () => {
	const [todoText, setTodoText] = useState('');
	const addTodoMutation = useAddTodoMutation();
	const queryClient = useQueryClient();

	const handleChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTodoText(e.target.value);
	};

	const handleSubmitAddTodo = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		addTodoMutation.mutate(todoText, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['todos'] });
				setTodoText('');
			},
			onError: (e) => {
				console.log(e.message);
			},
		});
	};

	return (
		<AddTodoForm
			todoText={todoText}
			onChangeTodoText={handleChangeTodoText}
			onSubmitAddTodo={handleSubmitAddTodo}
		/>
	);
};

export default AddTodo;
