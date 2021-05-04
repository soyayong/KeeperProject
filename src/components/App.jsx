import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const removeWatermark = () => {
    const ids = [];
    const iframes = document.body.querySelectorAll("iframe");
    for (const iframe of iframes) {
      if (iframe.id.startsWith("sb__open-sandbox")) ids.push(iframe.id);
    }
    for (const id of ids) {
      const node = document.createElement("div");
      node.style.setProperty("display", "none", "important");
      node.id = id;
      document.getElementById(id).remove();
      document.body.appendChild(node);
    }
  };

  setTimeout(removeWatermark, 1000);

  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
