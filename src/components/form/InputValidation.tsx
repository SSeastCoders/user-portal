import { ErrorMessage } from '@hookform/error-message';
import React, { useState } from 'react'
import { DeepMap, FieldError, FieldValues, UseFormRegisterReturn } from 'react-hook-form';

interface InputSignUpProps {
  className: string,
  favIcon: string,
  register: UseFormRegisterReturn,
  name: string,
  errors: DeepMap<FieldValues, FieldError>
}

export const InputValidation: React.FC<InputSignUpProps> = ({ className, favIcon, register, name, errors }) => {
  return (
    <div className={className}>
      <div className="input-group">
        <input type="text" className="form-control" placeholder={name} {...register} />
        <div className="input-group-append">
          <div className="input-group-text">
            <span className={favIcon}></span>
          </div>
        </div>
      </div>
      <ErrorMessage className="text-danger text-center" errors={errors} as="div" name={name}></ErrorMessage>
    </div>
  );
}