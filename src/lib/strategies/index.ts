import DropdownStrategy from "./DropdownStrategy";
import TextStrategy from "./TextStrategy";
import NormalStrategy from "./NormalStrategy";
import FixedStrategy from "./FixedStrategy";
import HoverStrategy from "./HoverStrategy";

const strategies = {
  dropdown: DropdownStrategy,
  text: TextStrategy,
  normal: NormalStrategy,
  fixed: FixedStrategy,
  hover: HoverStrategy
}

export default strategies;
