import {ErrorMessage} from '@hookform/error-message';
import React, {useState} from 'react';
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegisterReturn,
} from 'react-hook-form';
import classNames from 'classnames';

interface InputPasswordToggleProps {
  className?: string;
  register: UseFormRegisterReturn;
  name: string;
  placeholder?: string;
  errors: DeepMap<FieldValues, FieldError>;
}

export const InputPasswordToggle: React.FC<InputPasswordToggleProps> = ({
  className,
  register,
  name,
  errors,
  placeholder,
}) => {
  const [visibility, setVisbility] = useState(false);
  const favIcon: string = visibility ? 'fas fa-lock-open' : 'fas fa-lock';
  const type: string = visibility ? 'text' : 'password';
  const inputerror = name in errors ? 'is-invalid' : '';
  return (
    <div className={className}>
      <div className="input-group">
        <input
          type={type}
          className={classNames('form-control', inputerror)}
          placeholder={placeholder}
          {...register}
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <span
              onClick={() => setVisbility(!visibility)}
              className={favIcon}
            ></span>
          </div>
        </div>
      </div>
      <ErrorMessage
        className="invalid-feedback d-block"
        errors={errors}
        as="div"
        name={name}
      ></ErrorMessage>
    </div>
  );
};
