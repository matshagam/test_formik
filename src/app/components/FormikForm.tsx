import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  useToast,
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
    "Общая площадь должна быть больше или равна сумме площадей жилой и кухни",
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

export default function FormikForm() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const renderFormField = ({
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
  }) => {
    return (
      <FormControl mt={4} isInvalid={!!errors[name] && !!touched[name]}>
        <FormLabel>{label}</FormLabel>
        <FormikFieldWrapper name={name} type={type} />
        {errors[name] && (
          <FormHelperText color="red.500">{errors[name]}</FormHelperText>
        )}
      </FormControl>
    );
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/submit-property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values), // отправляем значения из формы
      });

      const data = await response.json();
      console.log("Ответ сервера:", data);

      toast({
        title: "Данные успешно отправлены!",
        description: "Запись была добавлена в базу данных.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Ошибка отправки формы:", error);
        toast({
          title: "Ошибка отправки данных",
          description: error.message || "Что-то пошло не так.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Неизвестная ошибка",
          description: "Произошло что-то непредсказуемое.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setIsLoading(false); // Сбросим флаг загрузки после завершения
    }
  };

  return (
    <Stack direction="column" align="center" mt={30}>
      <Box w="sm" p={15}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values).finally(() => {
              setSubmitting(false);
            });
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
              <Button
                mt={6}
                w="100%"
                colorScheme="yellow"
                type="submit"
                isLoading={isLoading}
              >
                Отправить
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Stack>
  );
}
