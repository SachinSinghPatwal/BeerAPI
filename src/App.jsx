import { useState, useEffect } from "react";
import "./App.css";
import BeerCard from "./components/BeerCard";
import SearchBar from "./components/SearchBar";

function App() {
  const [beers, setBeers] = useState([]);
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const response = await fetch("https://api.sampleapis.com/beers/ale");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setBeers(data);
        setFilteredBeers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBeers();
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredBeers(beers);
      return;
    }

    const filtered = beers.filter(
      (beer) =>
        beer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beer.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beer.rating?.average?.toString().includes(searchTerm) ||
        beer.brewer?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBeers(filtered);
  };

  if (loading) return <div className="loading">Loading beers...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app-container">
      <h1>Beer Explorer</h1>
      <SearchBar onSearch={handleSearch} />

      {filteredBeers.length === 0 ? (
        <p className="no-results">No beers found matching your search.</p>
      ) : (
        <div className="beer-grid">
          {filteredBeers.map((beer) => (
            <BeerCard key={beer.id} beer={beer} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
