//Library
import { FC, ChangeEvent } from "react";

//Style CSS
import "../../styles/buttons/Button_Toggle_Nav.css";

//====================================================================
//Public Declare
interface ButtonToggleNav_Vars {
  isToggled: boolean;
  onClicked: (event: ChangeEvent<HTMLInputElement>) => void;
  colorValue: string;
  sizeValue: string;
}

//Public Function
export const ButtonToggleNav: FC<ButtonToggleNav_Vars> = ({
  isToggled,
  onClicked,
  colorValue,
  sizeValue,
}) => {
  return (
    <label className="toggle-nav-switch">
      <input type="checkbox" checked={isToggled} onChange={onClicked} />
      <svg style={{ height: sizeValue }} viewBox="0 0 32 32">
        <path
          style={{ stroke: colorValue }}
          className="line line-top-bottom"
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
        ></path>
        <path
          style={{ stroke: colorValue }}
          className="line"
          d="M7 16 27 16"
        ></path>
      </svg>
    </label>
  );
};
