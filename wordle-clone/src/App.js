import './App.css';
import InputBox from './InputBoxes';

function App() {
  document.body.style = "background: #1f2023";
  return (
    <div className="App">
      <header className="App-header">
        <h1> Wordle Clone </h1>
        <h3> You have 5 guesses left</h3>
        <h3> You have 5 guesses left</h3>
        <h3> You have 5 guesses left</h3>
        <h3> You have 5 guesses left</h3>
        <h3> You have 5 guesses left</h3>
      </header>
      <InputBox />
    </div>
  );
}

export default App;
