import "../../../styles/FileInd.css";
import { getFileChar } from "../../../utils/helper";

const FileInd = ({files}) => {
    return (
        <div className="file-ind">
            {files.map((file) => <span key={file}>{getFileChar(file)}</span>)}
        </div>
    );
}
 
export default FileInd;