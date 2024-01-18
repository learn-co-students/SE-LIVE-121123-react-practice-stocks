import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, onClickStock }) {
  const portfolioCards = portfolio.map((stock) => (
    <Stock
      key={stock.id}
      stock={stock}
      onClickStock={onClickStock}
    />
  ));
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolioCards}
    </div>
  );
}

export default PortfolioContainer;
