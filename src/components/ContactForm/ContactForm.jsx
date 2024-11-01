import * as Yup from "yup";
import { useId } from "react";
import { nanoid } from "nanoid";
import MaskedInput from "react-text-mask";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

const initialValues = {
  name: "",
  number: "",
};

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(
      /^\d{3}-\d{2}-\d{2}$/,
      "Phone number must be in the format 777-77-77"
    )
    .required("Required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    const finalContact = { id: nanoid(), ...values };
    dispatch(addContact(finalContact));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      {({ values, setFieldValue }) => (
        <Form className={css.form}>
          <div className={css.formItem}>
            <label className={css.formItemLabel} htmlFor={nameFieldId}>
              Name
            </label>
            <Field
              className={css.inputField}
              type="text"
              name="name"
              id={nameFieldId}
              placeholder="Ivan Ivanov"
            />
            <ErrorMessage
              name="name"
              component="span"
              className={css.formError}
            />
          </div>
          <div className={css.formItem}>
            <label className={css.formItemLabel} htmlFor={numberFieldId}>
              Number
            </label>
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
              value={values.number}
              onChange={(event) => setFieldValue("number", event.target.value)}
              placeholder="777-77-77"
              className={css.inputField}
              name="number"
              id={numberFieldId}
            />
            <ErrorMessage
              name="number"
              component="span"
              className={css.formError}
            />
          </div>
          <button className={css.button} type="submit">
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
