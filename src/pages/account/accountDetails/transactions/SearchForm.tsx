/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {useForm} from 'react-hook-form';
import ButtonSpinner from '../../../../components/button/ButtonSpinner';
import {InputValidation} from '../../../../components/form/InputValidation';
import {SearchData} from './TransactionTable';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

interface SearchFormValue {
  search?: string;
  fromDate?: string;
  toDate?: string;
  fromAmount?: number;
  toAmount?: number;
}

type Action = {
  type: string;
  payload?: SearchData;
};

interface SearchFormProps {
  dispatch: React.Dispatch<Action>;
  refetch: any;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const dateRegex = /^$|^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/;

const schema = Yup.object().shape({
  search: Yup.string(),
  fromDate: Yup.string().matches(dateRegex, 'not a valid date'),
  toDate: Yup.string().matches(dateRegex, 'not a valid date'),
  fromAmount: Yup.number()
    .typeError('Only numbers are accepted.')
    .nullable()
    .transform((value: string, originalValue: string) =>
      originalValue.trim() === '' ? null : value
    ),
  toAmount: Yup.number()
    .typeError('Only numbers are accepted.')
    .nullable()
    .transform((value: string, originalValue: string) =>
      originalValue.trim() === '' ? null : value
    ),
});

export const SearchForm: React.FC<SearchFormProps> = ({
  dispatch,
  refetch,
  setPage,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SearchFormValue>({resolver: yupResolver(schema)});
  const onSubmit = (data: SearchFormValue) => {
    const startDate = data.fromDate;
    dispatch({
      type: 'update',
      payload: {
        search: data.search,
        fromDate: startDate,
        toDate: data.toDate,
        fromAmount: data.fromAmount,
        toAmount: data.toAmount,
      },
    });
    setPage(0);
    refetch();
    console.log(data);
  };
  console.log(errors);
  return (
    <div>
      <h2 className="tw-pt-5">Filter by any of these transaction details.</h2>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="form-horizontal tw-pt-5"
      >
        <div className="form-group row">
          <label htmlFor="inputName" className="col-md-2 col-form-label">
            Search
          </label>
          <InputValidation
            className="col-md-6"
            name="search"
            register={register('search')}
            errors={errors}
          ></InputValidation>
        </div>
        <div className="form-group row">
          <label htmlFor="inputEmail" className="col-md-2 col-form-label">
            From Amount
          </label>
          <InputValidation
            className="col-md-6"
            name="fromAmount"
            register={register('fromAmount')}
            errors={errors}
          ></InputValidation>
        </div>
        <div className="form-group row">
          <label htmlFor="inputName2" className="col-md-2 col-form-label">
            To Amount
          </label>
          <InputValidation
            className="col-md-6"
            name="toAmount"
            register={register('toAmount')}
            errors={errors}
          ></InputValidation>
        </div>
        <div className="form-group row">
          <label htmlFor="inputExperience" className="col-md-2 col-form-label">
            From Date
          </label>
          <InputValidation
            className="col-md-6"
            name="fromDate"
            register={register('fromDate')}
            errors={errors}
          ></InputValidation>
        </div>
        <div className="form-group row">
          <label htmlFor="inputExperience" className="col-md-2 col-form-label">
            To Date
          </label>
          <InputValidation
            className="col-md-6"
            name="toDate"
            register={register('toDate')}
            errors={errors}
          ></InputValidation>
        </div>
        <div className="form-group row">
          <div className="offset-md-2 col-md-10">
            <ButtonSpinner isLoading={false} type="submit" theme="primary">
              Submit
            </ButtonSpinner>
          </div>
        </div>
      </form>
    </div>
  );
};
