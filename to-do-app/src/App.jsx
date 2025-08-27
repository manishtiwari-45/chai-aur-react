import { useState, useEffect } from 'react';
import './App.css';
import { TodoProvider } from './contexts';
// 1. Import Header and Footer from your components index
import { TodoForm, TodoItem, Header, Footer } from './components';

function App() {
  const [todos, setTodos] = useState([]);

  const addToDo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateToDo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteToDo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todoArr = JSON.parse(localStorage.getItem("todos"));
    if (todoArr && todoArr.length > 0) {
      setTodos(todoArr);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addToDo, updateToDo, deleteToDo, toggleComplete }}>
      <div className="flex flex-col min-h-screen bg-[#070333]">
        <Header />
        
    
        <main className="flex-grow">
          <div className="py-8">
            <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">
                Manage Your Todos
              </h1>
              <div className="mb-4">
                <TodoForm />
              </div>
              <div className="flex flex-wrap gap-y-3">
                {todos.map((todo) => (
                  <div key={todo.id} className="w-full">
                    <TodoItem todo={todo} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </TodoProvider>
  );
}

export default App;