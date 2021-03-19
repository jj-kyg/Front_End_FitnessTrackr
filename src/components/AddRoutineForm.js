import React, { useState } from "react";
import { getToken } from "../auth";
import Modal from "react-modal";
Modal.setAppElement("#root");

const AddRoutineForm = ({routines, setRoutines, authenticate}) => {
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const [ name, setName ] = useState("");
  const [ goal, setGoal ] = useState("");

  const makeRoutine = (event) => {
    event.preventDefault();

    if (getToken() && authenticate) {
      fetch("https://still-plains-94282.herokuapp.com/api/routines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          name: name,
          goal: goal,
          isPublic: true,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if(result.error){
            alert("routine exists")
          }
          const newRoutines = [...routines];
          console.log(newRoutines, "line 28")
          newRoutines.push(result);
          setRoutines(newRoutines);
          console.log(newRoutines)
        })
        .catch(console.error);
    }
  };

  return (
    <div>
      <button
        onClick={(event) => {
          event.preventDefault();
          setModalIsOpen(true);
        }}>
        MAKE NEW ROUTINE
      </button>
      <Modal
        style={{
          overlay: {
            position: "fixed",
            top: 300,
            left: 300,
            right: 300,
            bottom: 700,
            backgroundColor: "light purple"
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "5px solid gold",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "10px",
          },
        }}
        isOpen={modalIsOpen}
      >
        <form onSubmit={makeRoutine}>
    <label>Routine Name</label>
      <input 
        type="text" 
        placeholder="Enter name of Routine"
        onChange={(event) => {setName(event.target.value)}}
      />
      <label>Routine Goal</label>
       <input 
        type="text" 
        placeholder="Enter name of Routine"
        onChange={(event) => {setGoal(event.target.value)}}
      />
      <button  type="submit">
            Create Routine
          </button>
          <button
            className="closeModalButton"
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
    </form>
      </Modal>
    </div>
  );
};

export default AddRoutineForm;