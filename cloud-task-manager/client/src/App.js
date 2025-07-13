import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "./firebase";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) fetchTasks(u.uid);
    });
  }, []);

  const fetchTasks = async (uid) => {
    const res = await axios.get(`http://localhost:5000/api/tasks/${uid}`);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!input || !user) return;
    const newTask = { title: input, completed: false, userId: user.uid };
    await axios.post("http://localhost:5000/api/tasks", newTask);
    setInput("");
    fetchTasks(user.uid);
  };

  const signIn = () => signInWithPopup(auth, new GoogleAuthProvider());

  return (
    <div>
      <h1>Task Manager</h1>
      {user ? (
        <>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={addTask}>Add Task</button>
          <ul>
            {tasks.map((t) => (
              <li key={t._id}>{t.title}</li>
            ))}
          </ul>
        </>
      ) : (
        <button onClick={signIn}>Login with Google</button>
      )}
    </div>
  );
}

export default App;
