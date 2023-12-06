import Position from '../Position/Position.jsx';
import PageButton from '../PageButton/PageButton.jsx';

function Table({matchedItems, currentPage, setCurrentPage, maxPage, deleteMatchedItems, setPopupOpen, setPopupData}) {
  const pageNumbers = [];

  for(let i = 1; i <= maxPage; i++) {
    pageNumbers.push(i)
  }

  function handleNextPageButton() {
    setCurrentPage(currentPage + 1)
    window.scrollTo(0, 0)
  }

  function handlePrevPageButton() {
    setCurrentPage(currentPage - 1)
    window.scrollTo(0, 0)
  }

  const positions = matchedItems.results.map((data) => (
    <Position
      deleteMatchedItems={deleteMatchedItems}
      data={data}
      setPopupOpen={setPopupOpen}
      setPopupData={setPopupData}
      key={data.id}
    />
  ));

  const pageButtons = pageNumbers.map((page, index) => (
    <PageButton
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      page={page}
      key={index}
    />
  ));

  return (
    <section className="table">
      <div className="table__headers">
        <h2 className="table__title">
          Товары Дилеров
        </h2>
        <h2 className="table__title">
          Товары Просепт
        </h2>
      </div>
      <div className="table__list">
        {positions}
      </div>
      <div className="table__nav">
        <button className={`table__button ${currentPage === 1 && 'table__button_disabled'}`} type="button" onClick={handlePrevPageButton} disabled={currentPage === 1}>
          <svg className="table__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19 12a1 1 0 0 1-1 1H8.414l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L8.414 11H18a1 1 0 0 1 1 1z" />
          </svg>
        </button>
        {pageButtons}
        <button className={`table__button ${currentPage === maxPage && 'table__button_disabled'}`} type="button" onClick={handleNextPageButton} disabled={currentPage === maxPage}>
          <svg className="table__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19 12a1 1 0 0 1-1 1H8.414l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L8.414 11H18a1 1 0 0 1 1 1z" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default Table