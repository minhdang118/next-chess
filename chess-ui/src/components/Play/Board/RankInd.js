import "../../../styles/RankInd.css";

const RankInd = ({ranks}) => {
    return (
        <div className="rank-ind">
            {ranks.map((rank) => <span key={rank}>{rank}</span>)}
        </div>
    );
}
 
export default RankInd;