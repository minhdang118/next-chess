const Piece = ({rank, file, piece, handlePieceClick}) => {
    return (
        <div 
        className={`piece ${piece} p-${rank}${file}`}
        onClick={handlePieceClick}
        >
        </div>
    );
}
 
export default Piece;