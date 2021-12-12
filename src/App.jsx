import './App.css';
import { useState, useEffect } from 'react';

const emojiDict = {
  "😉": "Wink",
  "😋": "Delicious",
  "😃": "Happy",
  "😡": "Angry",
  "🤣": "LoL"
}

const App = () => {
  const [emoji, setEmoji] = useState("")
  const [count, setCount] = useState(0)
  const [clockState, setClock] = useState(new Date().toLocaleTimeString())
  // const [name,setName]=useState("")


  const clickHandler = (decre) => {

    if (decre) {
      let newCount = count - 1
      setCount(newCount)
    } else {
      let newCount = count + 1
      setCount(newCount)
    }

  }



  const emojiHandler = (event) => {
    const inputEmoji = event.target.value
    const meaning = emojiDict[inputEmoji]
    setEmoji(meaning)
    if (meaning === undefined) {
      setEmoji("Emoji is either not in our database or it's invalid")
    }
    if (inputEmoji === "") {
      setEmoji("Please type an emoji")
    }

  }
  const onEmojiClick = (key) => {
    setEmoji(emojiDict[key])
  }

  // const userName = (event)=>{
  //   setName(event.target.value)
  // }
  const clearCounter = () => {
    setCount(0)
  }



  useEffect(() => {
    const timerId = setInterval(() => {
      setClock(new Date().toLocaleTimeString())
    }, 1000);
    return () => {
      clearInterval(timerId)
    }


  }, [clockState])

  return (
    <div className="App">
      <header className="App-header">
        <input onChange={(e) => { emojiHandler(e) }} type="text" className="input" />
        <h1 onChange={(e) => { emojiHandler(e) }}>{emoji === "" ? setEmoji("Please type an emoji") : emoji}</h1>
        <section>
          {
            <ul>
              {Object.keys(emojiDict).map((key, i) => {
                return <li onClick={() => { onEmojiClick(key) }} key={i}>{key}</li>
              })}
            </ul>
          }
        </section>
        <h1>React show</h1>
        <h2>{clockState}</h2>
        <h2><strong onClick={() => { clickHandler(true) }} style={{ margin: "1rem", cursor: "pointer", padding: "1rem", userSelect: "none" }}>-</strong>{count}<strong onClick={() => { clickHandler() }} style={{ margin: "1rem", cursor: "pointer", padding: "1rem", userSelect: "none" }}>+</strong></h2>
        <button className="clear-btn" onClick={() => { clearCounter() }}>Clear</button>
      </header>
    </div>
  );
}

export default App;
