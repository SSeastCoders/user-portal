import React from 'react';
import {useAccordionToggle} from 'react-bootstrap';

interface CollapseButtonProps {
  eventKey: string;
  className?: string;
}

export const CollapseButton: React.FC<CollapseButtonProps> = ({
  children,
  eventKey,
  className,
}) => {
  const accordianClick = useAccordionToggle(eventKey);
  return (
    <button type="button" className={className} onClick={accordianClick}>
      {children}
    </button>
  );
};
