const Piece = ({key, rank, file, piece, handlePieceClick}) => {

    return (
        <div 
        className={`piece ${piece} p-${rank}${file}`} 
        onClick={handlePieceClick}
        key={key}
        >
        </div>
    );
}
 
export default Piece;