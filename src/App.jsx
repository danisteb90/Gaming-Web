import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

export const App = () => {
	return (
		<main className="relative min-h-screen w-screen overflow-x-hidden">
			<Navbar />
			<Hero />
			<About />
		</main>
	);
};

export default App;
