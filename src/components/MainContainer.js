import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("")
  const [filterBy, setFilterBy] = useState("")

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then((stocksArr) => setStocks(stocksArr));
  }, []);

  function addToPortfolio(stockToAdd) {
    console.log("🚀 ~ addToPortfolio ~ stockToAdd:", stockToAdd);
    if(!portfolio.some(stock => stock.id === stockToAdd.id)) {
      setPortfolio([...portfolio, stockToAdd]);
    }
  }

  function removeFromPortfolio(stockObj) {
    console.log("🚀 ~ removeFromPortfolio ~ stockObj:", stockObj);
    setPortfolio(portfolio.filter(stock => stock.id !== stockObj.id))
  }

  const stocksToDisplay = [...stocks]
    .sort((stock1, stock2) => {
      if (sortBy == "Alphabetically"){
        return stock1.ticker.localeCompare(stock2.ticker)
      } else if (sortBy == "Price"){
        return stock1.price - stock2.price
      }
    })
    .filter(stock => stock.type.includes(filterBy))

  return (
    <div>
      <SearchBar 
        sortBy={sortBy}
        onChangeSort={setSortBy}
        filterBy={filterBy}
        onChangeFilter={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer
            stocks={stocksToDisplay}
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
