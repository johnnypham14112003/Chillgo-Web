//React
import { FC, ChangeEvent, CSSProperties } from "react";

//Asset
import Blink_Star from "../../assets/svgs/Blink_Star.svg";

//Style CSS
import "../../styles/buttons/Button_Toggle_Theme.css";

//====================================================================
//Public Declare
interface ButtonToggleTheme_Vars {
  isToggled: boolean;
  onClicked: (event: ChangeEvent<HTMLInputElement>) => void;
  sizeValue: string;
}

//Public Function
export const ButtonToggleTheme: FC<ButtonToggleTheme_Vars> = ({
  isToggled,
  onClicked,
  sizeValue,
}) => {
  return (
    <label
      className="theme-switch"
      style={{ "--toggle-size": sizeValue } as CSSProperties}
    >
      <input
        type="checkbox"
        className="theme-switch__checkbox"
        checked={isToggled}
        onChange={onClicked}
      />
      <div className="theme-switch__container">
        <div className="theme-switch__clouds"></div>
        <div className="theme-switch__stars-container">
          <img src={Blink_Star} alt="blink-star" />
        </div>
        <div className="theme-switch__circle-container">
          <div className="theme-switch__sun-moon-container">
            <div className="theme-switch__moon">
              <div className="theme-switch__spot"></div>
              <div className="theme-switch__spot"></div>
              <div className="theme-switch__spot"></div>
            </div>
          </div>
        </div>
      </div>
    </label>
  );
};
