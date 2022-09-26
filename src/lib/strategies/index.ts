import DropdownStrategy from "./DropdownStrategy";
import TextStrategy from "./TextStrategy";
import NormalStrategy from "./NormalStrategy";
import FixedStrategy from "./FixedStrategy";

const strategies = {
  dropdown: DropdownStrategy,
  text: TextStrategy,
  normal: NormalStrategy,
  fixed: FixedStrategy
}

export default strategies;
