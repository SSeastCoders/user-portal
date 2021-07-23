import { ErrorMessage } from '@hookform/error-message';
import React, { useState } from 'react';
import { DeepMap, FieldError, FieldValues, UseFormRegisterReturn } from 'react-hook-form';

interface InputPasswordToggleProps {
  className: string,
  register: UseFormRegisterReturn,
  name: string,
  errors: DeepMap<FieldValues, FieldError>
}

export const InputPasswordToggle: React.FC<InputPasswordToggleProps> = ({ className, register, name, errors }) => {
  const [visibility, setVisbility] = useState(false);
  let favIcon: string = visibility ? "fas fa-lock-open" : "fas fa-lock";
  let type : string = visibility ? "text" : "password";
  return (
    <div className={className}>
      <div className="input-group">
        <input type={type} className="form-control" placeholder={name} {...register} />
        <div className="input-group-append">
          <div className="input-group-text">
            <span onClick={() => setVisbility(!visibility)} className={favIcon}></span>
          </div>
        </div>
      </div>
      <ErrorMessage className="text-center text-danger" errors={errors} as="div" name={name}></ErrorMessage>
    </div>
  );
}