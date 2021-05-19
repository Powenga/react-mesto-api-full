import React, { useCallback } from "react";

export function useTooltip() {
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoToolData, setInfoToolData] = React.useState({
    message: "",
    isError: true,
  });

  const setTooltipMessage = useCallback((message, isError) => {
    setInfoToolData({ message, isError });
  }, [setInfoToolData])

  const openTooltip = useCallback(() => {
    setIsInfoTooltipOpen(true);
  }, [setIsInfoTooltipOpen])

  const closeTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  return {
    setTooltipMessage,
    openTooltip,
    closeTooltip,
    isInfoTooltipOpen,
    infoToolData,
  };
}
