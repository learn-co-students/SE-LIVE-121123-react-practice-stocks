import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then((stocksArr) => setStocks(stocksArr));
  }, []);

  function addToPortfolio(stockObj) {
    console.log("🚀 ~ addToPortfolio ~ stockObj:", stockObj);
    setPortfolio([...portfolio, stockObj]);
  }

  function removeFromPortfolio(stockObj) {
    console.log("🚀 ~ removeFromPortfolio ~ stockObj:", stockObj);
    setPortfolio(portfolio.filter(stock => stock.id !== stockObj.id))
  }

  return (
    <div>
      <SearchBar />
      <div className="row">
        <div className="col-8">
          <StockContainer
            stocks={stocks}
            onClickStock={addToPortfolio}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer
            portfolio={portfolio}
            onClickStock={removeFromPortfolio}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
