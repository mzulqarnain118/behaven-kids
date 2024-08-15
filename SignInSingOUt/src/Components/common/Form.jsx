import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Controls from ".";
import { useYupValidationResolver } from "../../utils/YupDefaultSchema";

export default function Form({
  onSubmit,
  children,
  submitLabel,
  defaultValues,
  disableReset = false,
  leftBtnHandler,
  leftBtnLabel,
  type,
  validationsSchema,
}) {
  const resolver = validationsSchema
    ? useYupValidationResolver(validationsSchema)
    : null;
  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    control,
    reset,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver, defaultValues });

  useEffect(() => {
    if (isSubmitSuccessful) {
      // Reset the form with the defaultValues
      !disableReset && reset();
    }
  }, [isSubmitSuccessful, reset]);

  const formProps = {
    register,
    unregister,
    handleSubmit,
    control,
    setValue,
    errors,
    getValues,
    reset,
    leftBtnHandler,
    leftBtnLabel,
  };

  return (
    <form className="col gap-1" onSubmit={handleSubmit(onSubmit)}>
      {children({ ...formProps })}
      {type === "actions" ? (
        <div className="row-between">
          <Controls.MuiButton
            label={leftBtnLabel ?? "Cancel"}
            onClick={leftBtnHandler}
            className="child"
          />
          <Controls.MuiButton
            variant="contained"
            type="submit"
            label={submitLabel ?? "Save"}
            className="child"
          />
        </div>
      ) : (
        <Controls.MuiButton
          size="md"
          variant="contained"
          type="submit"
          label={submitLabel ?? "Save"}
        />
      )}
    </form>
  );
}

// Exporting all the props from useForm
export const useCustomForm = () => {
  const formProps = useForm();

  return { ...formProps };
};
