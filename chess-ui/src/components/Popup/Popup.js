import "../../styles/Popup.css";
import PromotionBox from "./PromotionBox";
import { useAppContext } from "../../contexts/Context";
import { Status } from "../../const";

const Popup = () => {
    const {appState} = useAppContext();

    // no popup in an ongoing game
    if (appState.status === Status.ongoing) {
        return null;
    }

    return ( 
        <div className="popup">
            <PromotionBox />
        </div>
    );
}
 
export default Popup;