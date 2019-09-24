import { Link, Router } from "../../routes";
import React, { useState } from "react";
import { TRIP_EXPENSES_QUERY, TRIP_QUERY } from "../../graphql/queries";
import { addDays, parse, subDays } from "date-fns";

import Button from "../elements/Button";
import DatePicker from "react-datepicker";
import DatePickerCustomInput from "./elements/DatePickerCustomInput";
import ErrorField from "./errors/ErrorField";
import ErrorMessage from "./errors/ErrorMessage";
import Input from "./elements/Input";
import Label from "./elements/Label";
import { UPDATE_EXPENSE_MUTATION } from "../../graphql/mutations";
import classNames from "classnames";
import { redirect } from "../../lib/utils";
import uniqBy from "lodash/uniqBy";
import { useMutation } from "@apollo/react-hooks";

const EditExpenseForm = props => {
  const [expense, setExpense] = useState({
    title: props.expense.title,
    amount: props.expense.amount,
    date: new Date(props.expense.date)
  });

  const handleChange = event => {
    setExpense({
      ...expense,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeDate = date => {
    setExpense({
      ...expense,
      date
    });
  };

  const [updateExpense, { loading, error }] = useMutation(
    UPDATE_EXPENSE_MUTATION,
    {
      variables: {
        tripId: props.expense.trip.id,
        expenseId: props.expense.id,
        input: { ...expense }
      },
      refetchQueries: [
        {
          query: TRIP_QUERY,
          variables: { id: props.expense.trip.id }
        },
        {
          query: TRIP_EXPENSES_QUERY,
          variables: { tripId: props.expense.trip.id }
        }
      ]
    }
  );

  return (
    <>
      <div className="w-full">
        <form
          className="pt-4 pb-8 mb-4"
          onSubmit={async e => {
            e.preventDefault();
            const res = await updateExpense();
            Router.pushRoute("trip", { id: props.expense.trip.id });
          }}
        >
          <ErrorMessage error={error} />
          <div className="mb-4">
            <Label for="title">Title</Label>
            <Input
              name="title"
              id="title"
              type="text"
              placeholder="Title"
              required
              onChange={handleChange}
              value={expense.title}
            />
            <ErrorField error={error} field="title" />
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 mr-4">
              <Label for="amount">Amount</Label>
              {/* TODO number format */}
              <Input
                name="amount"
                id="amount"
                type="number"
                step="any"
                placeholder="Amount"
                required
                onChange={handleChange}
                value={expense.amount}
              />
              <ErrorField error={error} field="amount" />
            </div>
            <div className="w-1/2 ml-4">
              <Label>Currency</Label>
              <p className="text-xl mt-4 text-gray-800">
                {props.expense.currency.symbol} ({props.expense.currency.name})
              </p>
            </div>
          </div>
          <div className="mb-4">
            <Label>Date</Label>
            {/* TODO locale */}
            <DatePicker
              customInput={<DatePickerCustomInput />}
              selected={expense.date}
              onChange={handleChangeDate}
              minDate={new Date(props.expense.trip.startDate)}
              maxDate={new Date(props.expense.trip.endDate)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="d MMMM yyyy H:mm"
              timeCaption="Time"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              shouldCloseOnSelect={true}
            />
            <ErrorField error={error} field="date" />
          </div>
          <div className="flex items-center justify-end mt-5">
            <Button loading={loading} type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditExpenseForm;
