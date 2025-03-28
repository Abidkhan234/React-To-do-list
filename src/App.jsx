import React, { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const inputBox = useRef(null);

  const [todos, setTodos] = useState([]);

  const getFromLS = () => {
    let newTodos = JSON.parse(localStorage.getItem("todos"));

    setTodos(newTodos);
  };

  useEffect(() => {
    getFromLS();
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (inputBox.current.value === "") {
      alert("Enter a task");
      return;
    }

    setTodos([
      ...todos,
      { id: uuidv4(), text: inputBox.current.value, isCompleted: false },
    ]);

    inputBox.current.value = "";
  };

  const handleDelete = (id) => {
    let filterTodo = todos.filter((v) => v.id !== id);

    setTodos(filterTodo);
  };

  const handleCompletion = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (todo.isCompleted === false) {
          todo.isCompleted = true;
        } else {
          todo.isCompleted = false;
        }

        return {
          id: todo.id,
          text: todo.text,
          isCompleted: todo.isCompleted,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleEdit = (id) => {
    const updatedTodos = todos.map((v) => {
      if (v.id === id) {
        inputBox.current.value = v.text;
        handleDelete(v.id);
      }
    });
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-[600px] rounded-md border-2 border-b-gray-800 py-4 px-5 flex flex-col gap-6 h-[400px]">
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-4xl font-bold">React</h1>
          <h2 className="text-4xl font-bold">To-Do-List</h2>
        </div>
        <div className="bg-gray-300 w-full rounded-4xl ps-3 flex justify-between items-center overflow-hidden shrink-0">
          <input
            type="text"
            ref={inputBox}
            className="text-lg font-medium grow outline-0 px-2 py-3"
          />
          <button
            onClick={handleAdd}
            className="font-medium sm:text-lg py-3 px-2 text-white cursor-pointer bg-emerald-600"
          >
            Add Task
          </button>
        </div>

        <div className="flex flex-col gap-4 mt-3 overflow-y-auto ms-2">
          {todos.length <= 0 ? (
            <h1 className="text-2xl font-semibold text-center">No Tasks</h1>
          ) : (
            ""
          )}

          {todos.map((element) => {
            return (
              <div
                key={element.id}
                className="flex justify-between items-center bg-gray-200 p-2 rounded-md"
              >
                <p
                  onClick={() => {
                    handleCompletion(element.id);
                  }}
                  className={`${
                    element.isCompleted == true
                      ? "line-through text-gray-400"
                      : ""
                  } font-medium sm:text-lg grow cursor-pointer text-sm`}
                >
                  {element.text}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleEdit(element.id);
                    }}
                    className="bg-blue-500 text-white py-2 px-3 rounded-md cursor-pointer text-lg"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(element.id);
                    }}
                    className="bg-red-500 text-white py-2 px-3 rounded-md cursor-pointer text-lg"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
