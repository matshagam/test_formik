"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Image,
  Stack,
} from "@chakra-ui/react";
import { FormikFieldWrapper } from "./FormikFieldWrapper";
import "../yup/config";
import "../yup/extension";

const nameValidation = Yup.string().required();
const addressValidation = Yup.string().required();
const totalFloorsValidation = Yup.number()
  .required()
  .min(3)
  .max(200)
  .typeError("Количество этажей должно быть числом");
const floorValidation = Yup.number()
  .required()
  .min(1)
  .max(Yup.ref("totalFloors"), "Этаж не может быть больше количества этажей")
  .typeError("Этаж должен быть числом");
const squareValidation = Yup.number()
  .required()
  .min(0)
  .max(400)
  .moreThanSumOfFields(
    ["kitchenSquare", "livingSquare"],
    "Общая площадь должна быть больше суммы жилой площади и площади кухни",
  )
  .typeError("Площадь должна быть числом");
const livingSquareValidation = Yup.number()
  .required()
  .min(0)
  .typeError("Жилая площадь должна быть числом");
const kitchenSquareValidation = Yup.number()
  .required()
  .min(0)
  .typeError("Площадь кухни должна быть числом");

const validationSchema = Yup.object().shape({
  name: nameValidation,
  address: addressValidation,
  totalFloors: totalFloorsValidation,
  floor: floorValidation,
  square: squareValidation,
  livingSquare: livingSquareValidation,
  kitchenSquare: kitchenSquareValidation,
});

const initialValues = {
  name: "",
  address: "",
  floor: "",
  totalFloors: "",
  square: "",
  livingSquare: "",
  kitchenSquare: "",
  isProcessing: false,
  isResidential: "",
};

function renderFormField({
  name,
  label,
  type = "text",
  errors,
  touched,
}: {
  name: string;
  label: string;
  type?: string;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean | undefined>;
}) {
  return (
    <FormControl mt={4} isInvalid={!!errors[name] && !!touched[name]}>
      <FormLabel>{label}</FormLabel>
      <FormikFieldWrapper name={name} type={type} />
      {errors[name] && (
        <FormHelperText color="red.500">{errors[name]}</FormHelperText>
      )}
    </FormControl>
  );
}

export default function App() {
  return (
    <Stack direction="column" align="center">
      <Box w="sm" p={15}>
        <Image src="/icons/logo.svg" alt="HomeOfferIcon" w="sm" p={15} />
      </Box>
      <Box w="sm" p={15}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Форма отправлена:", { values });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Box mb={5}>
                <FormikFieldWrapper
                  name="isResidential"
                  type="radio"
                  options={[
                    { value: "жилое", label: "Жилое" },
                    { value: "нежилое", label: "Нежилое" },
                  ]}
                />
              </Box>
              {renderFormField({
                name: "name",
                label: "Название объекта",
                errors,
                touched,
              })}
              {renderFormField({
                name: "address",
                label: "Адрес",
                errors,
                touched,
              })}
              {renderFormField({
                name: "totalFloors",
                label: "Количество этажей в доме",
                type: "number",
                errors,
                touched,
              })}
              {renderFormField({
                name: "floor",
                label: "Этаж",
                type: "number",
                errors,
                touched,
              })}
              {renderFormField({
                name: "square",
                label: "Площадь",
                type: "number",
                errors,
                touched,
              })}
              {renderFormField({
                name: "kitchenSquare",
                label: "Площадь кухни",
                type: "number",
                errors,
                touched,
              })}
              {renderFormField({
                name: "livingSquare",
                label: "Жилая площадь",
                type: "number",
                errors,
                touched,
              })}
              <Box mt={5}>
                <FormikFieldWrapper
                  name="isProcessing"
                  type="checkbox"
                  label="Согласие на обработку"
                />
              </Box>
              <Button mt={6} w="100%" colorScheme="yellow" type="submit">
                Отправить
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Stack>
  );
}
