// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const [grocceryItems, setGrocceryItems] = useState([]);
  useEffect(() => {
    determineCompletedStatus();
  }, [grocceryItems]);

  const determineCompletedStatus = () => {
    if (!grocceryItems.length) {
      return setIsCompleted(false);
    }
    let isAllCompleted = true;
    grocceryItems.forEach((item) => {
      if (!item.completed) isAllCompleted = false;
    });
    setIsCompleted(isAllCompleted);
  };

  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };
  console.log(grocceryItems);
  const handleAddgroccery = (e) => {
    if (e.key === "Enter") {
      // console.log("called");
      //   grocceryItems.push({
      //     quantity: 1,
      //     name: inputValue,
      //     completed: false,
      //   });
      // }
      if (inputValue) {
        // setGrocceryItems([
        //   ...grocceryItems,
        //   { quantity: 1, name: inputValue, completed: false },
        // ]);
        const updatedGroceryList = [...grocceryItems];

        const itemIndex = updatedGroceryList.findIndex(
          (item) => item.name === inputValue
        );
        if (itemIndex === -1) {
          updatedGroceryList.push({
            quantity: 1,
            name: inputValue,
            completed: false,
          });
        } else {
          updatedGroceryList[itemIndex].quantity++;
        }
        setGrocceryItems(updatedGroceryList);

        // console.log(grocceryItems);
        setInputValue("");
        //  determineCompletedStatus();//use Effect use instead of this,because when you add an item after you're done msg then msg can not modify and not disappear as expected from call
      }
    }
  };
  const handleRemoveItem = (name) => {
    const updatedGroceryList = [...grocceryItems].filter(
      (item) => item.name != name
    );
    console.log(name);
    setGrocceryItems(updatedGroceryList);
    // determineCompletedStatus();
  };

  const handleUpdateCompleteStatus = (status, index) => {
    const updatedGroceryList = [...grocceryItems];
    updatedGroceryList[index].completed = status;
    setGrocceryItems(updatedGroceryList);
    // determineCompletedStatus();
  };

  const renderGroceryList = () => {
    return grocceryItems.map((item, index) => (
      <li key={item.name}>
        <div className="container">
          <input
            type="checkbox"
            onChange={(e) => {
              // console.log(e.target.checked);
              // console.log(e);

              handleUpdateCompleteStatus(e.target.checked, index);
            }}
            value={item.completed}
            checked={item.completed}
          />
          <p
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            {item.name}
            {item.quantity > 1 ? (
              <span
                style={{
                  display: "flex",
                  fontWeight: "bolder",
                  marginLeft: "1rem",
                }}
              >
                x{item.quantity}
              </span>
            ) : null}
          </p>
          <p
            onClick={() => handleRemoveItem(item.name)}
            style={{ marginLeft: "20px", color: "red" }}
          >
            x
          </p>
        </div>
      </li>
    ));
  };
  return (
    <div>
      <div className="App">
        <button
          onClick={() => {
            const updatedGroceryList = [...grocceryItems].map((item) => {
              return {
                ...item,
                completed: false,
              };
            });
            setGrocceryItems(updatedGroceryList);
          }}
        >
          clear all checks
        </button>
        <div>
          {isCompleted && <h4 className="success">You're Done</h4>}
          {/* <h4 className="success">You're Done</h4> */}
          {/* {JSON.stringify(grocceryItems)} */}

          <div className="header">
            <h1>Shopping List</h1>
            <br />
            <img
              src="https://www.pngall.com/wp-content/uploads/5/Shopping-Cart-PNG-Pic.png"
              alt=""
            />
            <br />
            <input
              style={{ marginTop: "5px" }}
              type="text"
              placeholder="Add an item"
              onChange={changeHandler}
              onKeyDown={handleAddgroccery}
              value={inputValue}
            />
          </div>
        </div>
        {/* <ul>
          <li>
            <div className="container">
              <input type="checkbox" />
              
              <p> Carrots</p>
              <p style={{ marginLeft: "20px", color: "red" }}>x</p>
            </div> */}
        {/* {inputValue}
            <button
              onClick={() => {
                setInputValue("");
              }}
            >
              x
            </button> */}
        {/* </li>
        </ul> */}
      </div>
      <ul>{renderGroceryList()}</ul>
    </div>
  );
}

export default App;
