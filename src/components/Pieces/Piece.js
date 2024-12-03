const Piece = ({key, rank, file, piece}) => {
    return (
        <div 
        className={`piece ${piece} p-${file}${rank}`} 
        draggable={true}
        key={key}
        >
        </div>
    );
}
 
export default Piece;