function Loader({isOpen}) {
  return (
    <div className={`loader ${isOpen && 'loader_active'}`}>
      <div className="loader__item" />
    </div>
  )
}

export default Loader