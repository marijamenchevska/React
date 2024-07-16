import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loader() {
    return (
        <div className="text-slate-50 py-7 text-center">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin size-8 align-middle"/>
        </div>
    )
}