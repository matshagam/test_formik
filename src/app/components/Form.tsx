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

// Схема валидации
const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  address: Yup.string().required(),
  totalFloors: Yup.number()
    .required()
    .min(3)
    .max(200)
    .typeError("Количество этажей должно быть числом"),
  floor: Yup.number()
    .required()
    .min(1)
    .max(
      Yup.ref("totalFloors"),
      "Этаж не может быть больше количества этажей в доме",
    )
    .typeError("Этаж должен быть числом"),
  square: Yup.number()
    .required()
    .min(0)
    .max(400)
    .moreThanSumOfFields(
      ["kitchenSquare", "livingSquare"],
      "Общая площадь должна быть больше суммы жилой площади и площади кухни",
    )
    .typeError("Площадь должна быть числом"),
  livingSquare: Yup.number()
    .required()
    .min(0)
    .typeError("Жилая площадь должна быть числом"),
  kitchenSquare: Yup.number()
    .required()
    .min(0)
    .typeError("Площадь кухни должна быть числом"),
});

export default function App() {
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

              {/* Название объекта */}
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel>Название объекта</FormLabel>
                <FormikFieldWrapper name="name" />
                {errors.name && (
                  <FormHelperText color="red.500">{errors.name}</FormHelperText>
                )}
              </FormControl>

              {/* Адрес */}
              <FormControl
                mt={4}
                isInvalid={!!errors.address && touched.address}
              >
                <FormLabel>Адрес</FormLabel>
                <FormikFieldWrapper name="address" />
                {errors.address && (
                  <FormHelperText color="red.500">
                    {errors.address}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Всего этажей */}
              <FormControl
                mt={4}
                isInvalid={!!errors.totalFloors && touched.totalFloors}
              >
                <FormLabel>Количество этажей в доме</FormLabel>
                <FormikFieldWrapper name="totalFloors" type="number" />
                {errors.totalFloors && (
                  <FormHelperText color="red.500">
                    {errors.totalFloors}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Этаж */}
              <FormControl mt={4} isInvalid={!!errors.floor && touched.floor}>
                <FormLabel>Этаж</FormLabel>
                <FormikFieldWrapper name="floor" type="number" />
                {errors.floor && (
                  <FormHelperText color="red.500">
                    {errors.floor}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Площадь */}
              <FormControl mt={4} isInvalid={!!errors.square && touched.square}>
                <FormLabel>Площадь</FormLabel>
                <FormikFieldWrapper name="square" type="number" />
                {errors.square && (
                  <FormHelperText color="red.500">
                    {errors.square}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Площадь кухни */}
              <FormControl
                mt={4}
                isInvalid={!!errors.kitchenSquare && touched.kitchenSquare}
              >
                <FormLabel>Площадь кухни</FormLabel>
                <FormikFieldWrapper name="kitchenSquare" type="number" />
                {errors.kitchenSquare && (
                  <FormHelperText color="red.500">
                    {errors.kitchenSquare}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Жилая площадь */}
              <FormControl
                mt={4}
                isInvalid={!!errors.livingSquare && touched.livingSquare}
              >
                <FormLabel>Жилая площадь</FormLabel>
                <FormikFieldWrapper name="livingSquare" type="number" />
                {errors.livingSquare && (
                  <FormHelperText color="red.500">
                    {errors.livingSquare}
                  </FormHelperText>
                )}
              </FormControl>

              <Box mt={5}>
                <FormikFieldWrapper
                  name="isProcessing"
                  type="checkbox"
                  label="Согласие на обработку"
                />
              </Box>

              {/* Кнопка отправки */}
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
