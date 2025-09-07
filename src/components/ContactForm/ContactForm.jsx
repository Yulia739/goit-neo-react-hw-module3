import { ErrorMessage, Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import { useId } from "react";
import { FormSchema } from "../../helpers";
import css from "./ContactForm.module.css";

export default function ContactForm({ addContact, contacts }) {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const initialValues = {
    name: "",
    number: "",
  };

  const formatPhoneNumber = (value) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 7);
    const part1 = digitsOnly.slice(0, 3);
    const part2 = digitsOnly.slice(3, 5);
    const part3 = digitsOnly.slice(5, 7);

    let formatted = part1;
    if (digitsOnly.length > 3) formatted += `-${part2}`;
    if (digitsOnly.length > 5) formatted += `-${part3}`;
    return formatted;
  };

  const handleSubmit = (values, actions) => {
    const isDuplicateNumber = contacts?.some(
      (contact) => contact.number === values.number
    );

    if (isDuplicateNumber) {
      actions.setFieldError(
        "number",
        "This number already exists in the contacts list."
      );
      return;
    }

    addContact({ ...values, id: nanoid() });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FormSchema}
    >
      <Form className={css["form-container"]}>
        <div className={css["fields-container"]}>
          <div className={css["name-field-container"]}>
            <label className={css.label} htmlFor={nameFieldId}>
              Name
            </label>
            <Field
              className={css.field}
              type="text"
              name="name"
              id={nameFieldId}
            />
            <ErrorMessage className={css.error} name="name" component="span" />
          </div>

          <div className={css["name-field-container"]}>
            <label className={css.label} htmlFor={numberFieldId}>
              Number
            </label>
            <Field name="number">
              {({ field, form }) => (
                <input
                  {...field}
                  className={css.field}
                  type="text"
                  id={numberFieldId}
                  inputMode="numeric"
                  placeholder="111-11-11"
                  maxLength={9}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    form.setFieldValue("number", formatted);
                  }}
                />
              )}
            </Field>
            <ErrorMessage
              className={css.error}
              name="number"
              component="span"
            />
          </div>
        </div>

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
