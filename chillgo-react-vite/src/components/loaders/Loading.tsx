//Library
import { FC } from "react";

//Style CSS
import "../../styles/loaders/Loading_Loader.css";

interface LoadingLoader_Vars {
  displayText: string;
}

export const LoadingLoader: FC<LoadingLoader_Vars> = ({displayText}) => {
  return (
    <div id="wifi-loader">
      <svg viewBox="0 0 86 86" className="circle-outer">
        <circle r="40" cy="43" cx="43" className="back"></circle>
        <circle r="40" cy="43" cx="43" className="front"></circle>
        <circle r="40" cy="43" cx="43" className="new"></circle>
      </svg>
      <svg viewBox="0 0 60 60" className="circle-middle">
        <circle r="27" cy="30" cx="30" className="back"></circle>
        <circle r="27" cy="30" cx="30" className="front"></circle>
      </svg>

      <div data-text={displayText} className="text"></div>
    </div>
  );
};
