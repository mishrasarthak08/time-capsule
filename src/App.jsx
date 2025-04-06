import HistoricalEvents from './components/HistoricalEvents';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Time Capsule</h1>
        <p>Discover historical events from any day in history</p>
      </header>

      <main className="app-content">
        <HistoricalEvents />
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Time Capsule - Made By Sarthak Mishra</p>
      </footer>
    </div>
  );
}

export default App; 