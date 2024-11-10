//Library
import { FC } from "react";

//Style CSS
import "../../styles/buttons/Button_Keyboard_3d.css";

//====================================================================
//Public Declare
interface ButtonKeyboard3d_Vars {
  textDisplay: string;
}

//Public Function
const ButtonKeyboard3d: FC<ButtonKeyboard3d_Vars> = ({
  textDisplay,
}) => {
  return <button className="button-keyboard-animation">{textDisplay}</button>;
};

export default ButtonKeyboard3d;