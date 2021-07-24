import React from 'react';
import {Button, ButtonProps} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

interface AppButtonProps extends ButtonProps {
  isLoading?: boolean;
  icon?: string;
  theme?: string;
}

const AppButton: React.FC<AppButtonProps> = ({
  children,
  isLoading,
  icon,
  theme = 'primary',
  disabled,
  ...otherProps
}) => {
  let spinnerTemplate;
  let iconTemplate;

  if (isLoading) {
    spinnerTemplate = (
      <Spinner
        className="ml-2"
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    );
  }

  if (icon) {
    iconTemplate = <i className={`${icon} mr-2`} />;
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <Button

      {...otherProps}
      variant={theme}
      disabled={isLoading || disabled}
    >
      {iconTemplate}
      {children}
      {spinnerTemplate}
    </Button>
  );
};

export default AppButton;