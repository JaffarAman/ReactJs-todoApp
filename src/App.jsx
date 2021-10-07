import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import styles from "./todoCss.module.css";
import { db } from "./firebase";
import { v4 as uuidv4 } from 'uuid'
import { addDoc, collection ,getDocs ,updateDoc , doc ,setDoc , deleteDoc } from "firebase/firestore";

// const dbCol = collection(db, "todos");

const App = () => {
  const [notes, setNotes] = useState([
    // { title: "jaffar", iscomplete: false },
    // { title: "Bilal", iscomplete: false },
  ]);

  const [index, setIndex] = useState(null);
  const [value, setValue] = useState("");
  const [editInputValue, setEditInputValue] = useState(null);

  useEffect( () => {
    const getData  = async ()=> { 
      const dbRef = collection(db , "todos") 
      const docSnapshot = await getDocs(dbRef);
      let todo = []
      docSnapshot.forEach(data=>{
          todo.push({...data.data() , key : data.id})
        
      })
      setNotes(todo && todo || [])  
    }
    getData()

  }, []);

  const editInput = async (e) => {
    const key = notes[e.id].key
    const docRef = doc(db , "todos" , key )
    await updateDoc(docRef , {
        title  : editInputValue 
    })
    console.log(editInputValue);
    notes[e.id].title = editInputValue;
    setIndex(null);
  };

  //ADD TODO ///

  const addTodo = async () => {
    if(value.length > 3){
      const key = uuidv4()
      const dbRef = doc(db , "todos" , String(key));
      
           await setDoc(dbRef, {
          title: value,
          iscomplete: false,
        })
        .then((res)=>{
          console.log(res)
        })
        .catch(err=>console.log(err))
      
      
  
      notes.unshift({ title: value, iscomplete: false , key : key});
      setNotes([...notes]);
      setValue("");
    }else{
      alert("enter correct todo")
    }
  
  };
  ///DELETE ALL TODOs///
  const delAll = async () => {
    const dbRef = doc(db , "todos ")
    await deleteDoc(dbRef)
    setNotes([]);
  };

  ///DELETE TODO//
  const delTodo = async (e) => {
    const key = notes[e.target.id].key
    const docRef = doc(db , "todos" , key )
    await deleteDoc(docRef)

    notes.splice(e, 1);
    setNotes([...notes]);
  };


  const handleComplete = async (e)=>{
    const key  = notes[e.target.id].key
    console.log(e.target.checked)
    const dbRef = doc(db , "todos" , key)
    e.target.checked ?   await updateDoc(dbRef , {
        iscomplete :true
         
    }) : await updateDoc(dbRef , {
      iscomplete :false
       
  }) 

    e.target.checked? (notes[e.target.id].iscomplete = true):
    (notes[e.target.id].iscomplete = false)
    setNotes([...notes])



    
    
  }
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
          {/* <button onClick={() => delAll()}>DEL TODO'S</button> */}
        </div>

        <div className={styles.notesBox}>
          <ul>
            {notes.map((val, ind) => {
              return ind === index ? (
                <div className={styles.inputEditBox}>
                  {" "}
                  <input
                    type="text"
                    onChange={(e) => setEditInputValue(e.target.value)}
                    placeholder={notes[index].title}
                  />
                  <button id={ind} onClick={(e) => editInput(e.target)}>
                    EDIT
                  </button>
                </div>
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
                        onChange={(e) => handleComplete(e)}
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
