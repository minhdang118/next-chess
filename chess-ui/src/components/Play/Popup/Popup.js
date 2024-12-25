import "../../../styles/Popup.css";
import PromotionBox from "./PromotionBox";
import { Status } from "../../../const";
import { useSelector } from "react-redux";
import { selectStatus } from "../../../app/gameSlice";

const Popup = () => {
    const status = useSelector(selectStatus);

    // no popup in an ongoing game
    if (status === Status.ongoing) {
        return null;
    }

    return ( 
        <div className="popup">
            <PromotionBox />
        </div>
    );
}
 
export default Popup;