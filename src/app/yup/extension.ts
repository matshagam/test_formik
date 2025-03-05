import * as Yup from "yup";

// Расширяем Yup метод для 'number'
Yup.addMethod<Yup.NumberSchema>(
  Yup.number,
  "moreThanSumOfFields",
  function (
    fields: string[],
    message: string,
  ) {
    return this.test("moreThanSumOfFields", message, function (value) {
      const { parent, createError } = this;

      // Если массива полей нет или он пустой, возвращаем true
      if (!Array.isArray(fields) || fields.length === 0) {
        return true;
      }

      // Подсчитываем сумму указанных полей. Используем parent для доступа к значениям текущей формы
      const sum = fields.reduce((acc, field) => {
        const fieldValue = parent[field];
        return acc + (Number(fieldValue) || 0);
      }, 0);

      // Проверяем, чтобы значение текущего поля превышало сумму
      if (typeof value !== "number" || value < sum) {
        return createError({ path: this.path, message });
      }

      return true;
    });
  },
);

// Обновляем декларацию модулей для Yup, чтобы включить созданный метод
declare module "yup" {
  interface NumberSchema {
    moreThanSumOfFields(fields: string[], message?: string): this;
  }
}
