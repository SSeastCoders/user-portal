import { ErrorMessage } from '@hookform/error-message';
import React from 'react'
import { DeepMap, FieldError, FieldValues, UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames'

interface InputSignUpProps {
  className: string,
  favIcon: string,
  register: UseFormRegisterReturn,
  name: string,
  errors: DeepMap<FieldValues, FieldError>
}

export const InputValidation: React.FC<InputSignUpProps> = ({ className, favIcon, register, name, errors }) => {
  let inputerror = !(name in errors) ? "" : "is-invalid";
  return (
    <div className={className}>
      <div className="input-group">
        <input type="text" className={classNames("form-control", inputerror)} placeholder={name} {...register} />
        <div className="input-group-append">
          <div className="input-group-text">
            <span className={favIcon}></span>
          </div>
        </div>
      </div>
      <ErrorMessage className="invalid-feedback d-block" errors={errors} as="span" name={name}></ErrorMessage>
    </div>
  );
}