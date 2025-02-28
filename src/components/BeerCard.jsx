function BeerCard({ beer }) {
  const fallbackImage = "https://via.placeholder.com/150x200?text=No+Image";

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <div className="beer-card">
      <div className="beer-image">
        <img
          src={beer.image || fallbackImage}
          alt={beer.name}
          onError={handleImageError}
        />
      </div>
      <div className="beer-info">
        <h2>{beer.name}</h2>
        <p className="beer-price">Price: {beer.price}</p>
        {beer.rating && (
          <p className="beer-rating">
            Rating:{" "}
            {beer.rating.average ? beer.rating.average.toFixed(1) : "N/A"}
            {beer.rating.reviews && (
              <span> ({beer.rating.reviews} reviews)</span>
            )}
          </p>
        )}
        {beer.brewer && <p className="beer-brewer">Brewer: {beer.brewer}</p>}
      </div>
    </div>
  );
}

export default BeerCard;
