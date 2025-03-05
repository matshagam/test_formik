import React from "react";
import { Field, FieldProps } from "formik";
import { Checkbox, Radio, Input, RadioGroup, Stack } from "@chakra-ui/react";

type FieldWrapperProps = {
  name: string;
  type?: string;
  label?: string;
  options?: { value: string; label: string }[];
};

export const FormikFieldWrapper: React.FC<FieldWrapperProps> = ({
  name,
  type,
  label,
  options,
}) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        if (type === "checkbox") {
          return (
            <Checkbox {...field} colorScheme="yellow">
              {label}
            </Checkbox>
          );
        }

        if (type === "radio" && options) {
          return (
            <RadioGroup
              {...field}
              onChange={(value) => form.setFieldValue(name, value)} // Вручную обновляем значение в Formik
            >
              <Stack direction="row" gap={5}>
                {options.map((option) => (
                  <Radio
                    key={option.value}
                    value={option.value}
                    colorScheme="yellow"
                  >
                    {option.label}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          );
        }

        return <Input {...field} focusBorderColor="brand.200" />;
      }}
    </Field>
  );
};
