import bgImage from './assets/container-bg.jpg';
import { BsThreeDots } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFilteredOpen, setIsFilteredOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const data = localStorage.getItem('todos');
    if (data) setTodos(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  const addTodo = (text, date) => {
    setTodos([...todos, { id: todos.length + 1, text, date, isCompleted: false }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleCompletion = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const applyFilter = (filter) => {
    setSelectedFilter(filter);
    setIsFilteredOpen(false);
    setIsSettingsOpen(false);
  };

  const resetFilter = () => {
    setSelectedFilter("");
  };

  // **Dynamic Search & Filter Logic**
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = searchText
      ? todo.text.toLowerCase().includes(searchText.toLowerCase())
      : true;

    if (!selectedFilter) return matchesSearch;

    const today = new Date();
    const todoDate = new Date(todo.date);

    const matchesFilter = {
      today: todoDate.toDateString() === today.toDateString(),
      week: (() => {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        return todoDate >= weekStart && todoDate <= today;
      })(),
      month: todoDate.getFullYear() === today.getFullYear() && todoDate.getMonth() === today.getMonth(),
      year: todoDate.getFullYear() === today.getFullYear(),
    }[selectedFilter] ?? true;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${bgImage})` }}></div>

      <div className="relative z-10 w-11/12 mx-auto pt-10">
        <div className="flex items-center justify-between h-20 rounded-md px-4 shadow-lg">
          <h1 className="font-bold text-3xl md:text-5xl text-black">Todo App</h1>

          <div className="relative flex gap-3 items-center">
            {isSearch && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={handleSearchChange}
                  className="bg-white rounded-lg shadow-lg p-2 w-20 md:w-60 border border-gray-300"
                />
                {searchText && (
                  <IoMdClose
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    onClick={clearSearch}
                  />
                )}
              </div>
            )}

            <div className="bg-black rounded-md px-3 py-2 cursor-pointer" 
            onClick={() => {
              setIsSettingsOpen(!isSettingsOpen)
              setIsFilteredOpen(!setIsFilteredOpen)
            }}>
              <BsThreeDots className="text-white" />
            </div>

            {selectedFilter && (
              <button
                className="bg-black text-white font-medium px-3 py-2 rounded-md text-sm"
                onClick={resetFilter}
              >
                Reset Filter
              </button>
            )}

            {isSettingsOpen && (
              <div className="absolute top-[3rem] right-0 bg-white rounded-lg shadow-lg p-4 w-40 border border-gray-300">
                <p
                  className="text-black font-medium px-2 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
                  onClick={() => {
                    setIsSearch(!isSearch);
                    setIsSettingsOpen(false);
                  }}
                >
                  Search
                </p>
                <hr className="border-gray-300 my-1" />
                <p
                  className="relative text-black font-medium px-2 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
                  onClick={() => setIsFilteredOpen(!isFilteredOpen)}
                >
                  Add Filters
                </p>
              </div>
            )}
          </div>
        </div>

        {isFilteredOpen && (
          <div className="absolute top-24 right-0 bg-white rounded-lg shadow-lg p-4 w-60 border border-gray-300">
            <p className="font-bold text-lg mb-2">Upload Date</p>
            <hr className="border-gray-300 my-2" />
            <p className="cursor-pointer px-2 py-2 hover:bg-gray-100 rounded-md" onClick={() => applyFilter("today")}>
              Today
            </p>
            <p className="cursor-pointer px-2 py-2 hover:bg-gray-100 rounded-md" onClick={() => applyFilter("week")}>
              This Week
            </p>
            <p className="cursor-pointer px-2 py-2 hover:bg-gray-100 rounded-md" onClick={() => applyFilter("month")}>
              This Month
            </p>
            <p className="cursor-pointer px-2 py-2 hover:bg-gray-100 rounded-md" onClick={() => applyFilter("year")}>
              This Year
            </p>
          </div>
        )}

        <div className="mt-5">
          <TodoList todos={filteredTodos} deleteTodo={deleteTodo} toggleCompletion={toggleCompletion} />
        </div>

        <div>
          <AddTodo addTodo={addTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;
