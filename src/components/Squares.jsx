export function Squares({ index, updateBoard, children, isSelected }) {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handeClick = () => {
    updateBoard(index);
  };

  return (
    <div className={className} onClick={handeClick}>
      {children}
    </div>
  );
}
