import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import styles from "./todoCss.module.css";
import db from "./firebase";
import { collection, addDoc, onSnapshot, doc } from "firebase/firestore";

const userCol = collection(db, "todo");
const userCol2 = collection(db,"todo")
const App = () => {
  const [notes, setNotes] = useState([
    { title: "jaffar", iscomplete: false },
    { title: "Bilal", iscomplete: false },
  ]);
  const [index, setIndex] = useState(null);
  const [value, setValue] = useState("");
  const [editInputValue, setEditInputValue] = useState(null);

  useEffect(() => {
     const unsubscribe  =  onSnapshot(doc(userCol2), (doc) => {
      
      return  console.log(doc.data());
      
    });
  }, []);

  const editInput = (e) => {
    console.log(editInputValue);
    notes[e.id].title = editInputValue;
    setIndex(null);
  };

  //ADD TODO ///
  const addTodo = async () => {
    try {
      const docRef = await addDoc(userCol, {
        title: value,
        iscomplete: false,
      });
    } catch (error) {
      console.log(error);
    }

    // console.log(value);
    notes.unshift({ title: value, iscomplete: false });
    setNotes([...notes]);
    setValue("");
  };
  ///DELETE ALL TODOs///
  const delAll = () => {
    setNotes([]);
  };

  ///DELETE TODO//
  const delTodo = (e) => {
    notes.splice(e, 1);
    setNotes([...notes]);
  };
  return (
    <>
      <Header />

      <div className={styles.inputBarBox}>
        <div className={styles.inputBar}>
          {/* <InputField /> */}
          <input
            type="text"
            placeholder="Enter Your Notes"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={() => addTodo()}>ADD TODO</button>
          <button onClick={() => delAll()}>DEL TODO'S</button>
        </div>

        <div className={styles.notesBox}>
          <ul>
            {notes.map((val, ind) => {
              return ind === index ? (
                <>
                  {" "}
                  <input
                    type="text"
                    onChange={(e) => setEditInputValue(e.target.value)}
                    placeholder="edit input"
                  />
                  <button id={ind} onClick={(e) => editInput(e.target)}>
                    EDIT
                  </button>
                </>
              ) : (
                <>
                  <li
                    key={ind}
                    className={styles.todoItemList}
                    style={{
                      textDecoration: notes[ind].iscomplete
                        ? "line-through"
                        : "none",
                    }}
                  >
                    <div>
                      <input
                        type="checkbox"
                        id={ind}
                        name={`li${ind}`}
                        onClick={(e) => {
                          notes[e.target.id].iscomplete
                            ? (notes[e.target.id].iscomplete = false)
                            : (notes[e.target.id].iscomplete = true);
                          setNotes([...notes]);
                        }}
                      />
                      {val.title}
                    </div>

                    <div>
                      <button id={ind} onClick={(e) => delTodo(e)}>
                        DEL
                      </button>
                      <button
                        onClick={() => {
                          setIndex(ind);
                          console.log(index);
                        }}
                      >
                        EDIT
                      </button>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
