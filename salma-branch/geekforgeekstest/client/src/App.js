import logo from "./logo.svg";
import "./App.css";

function App() {
return (
	<div className="App">
    <form action="../../post" method="post"
			className="form">
		<button type="submit">Connected?</button>
		</form>
    <form action="../../results" method="post"
			className="form">
		<button type="submit">get results?</button>
		</form>

	</div>
);
}

export default App;
