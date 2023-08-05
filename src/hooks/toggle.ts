import { useState } from "react";

export const useToggle = (defaultVisibility?: boolean) => {
  const [visible, setVisible] = useState(defaultVisibility);

  const toggle = () => {
    setVisible(!visible);
  };

  return {
    visible: visible,
    toggle: toggle,
    setVisible: setVisible,
  };
};
