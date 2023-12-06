function PageButton({currentPage, setCurrentPage, page}) {
  function handleButtonClick() {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <button className={`pageButton ${page === currentPage && 'pageButton_active'}`} type="button" onClick={handleButtonClick} disabled={page === currentPage}>
      {page}
    </button>
  );
}

export default PageButton