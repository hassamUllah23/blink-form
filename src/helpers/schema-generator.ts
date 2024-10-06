import * as Yup from "yup";

type ValidationOptionWithMessage<T> = {
  value: T;
  message: string;
};
type ValidationOption<T> = T | ValidationOptionWithMessage<T>;
type ValidationOptions = {
  required?: ValidationOption<boolean>;
  minLength?: ValidationOption<number>;
  maxLength?: ValidationOption<number>;
  minValue?: ValidationOption<number>;
  maxValue?: ValidationOption<number>;
};
type Field = {
  name: string;
  type: "email" | "text" | "number";
  validations?: ValidationOptions;
};
const generateYupSchema = (fields: Array<Field>) => {
  const shape: any = {};
  fields.forEach(({ name, type, validations }) => {
    shape[name] = addCommonValidations(shape, name, validations!!);
    if (type === "text") {
      shape[name] = Yup.string();
    }

    switch (type) {
      case "text": {
        break;
      }
      case "number": {
        shape[name] = Yup.number().required(`${name} is required`);

        break;
      }

      case "email": {
        shape[name] = Yup.string().email("Invalid email");
        break;
      }

      // default:{
      // }
    }
  });
  return Yup.object().shape(shape);
};

function addCommonValidations(
  shape: any,
  name: string,
  validations: ValidationOptions
) {
  if (validations?.required) {
    try {
      const resolvedType = typeof validations.required;
      shape[name] = Yup.string().required(
        resolvedType === "boolean"
          ? `${name} is required`
          : `${
              (validations.required as ValidationOptionWithMessage<boolean>)
                .message
            }`
      );
        
    } catch (error) {
      console.log("ERROR IN COMMIN REQUIRED")

    }
  }

  if (validations?.minLength) {
    try {
      const resolvedType = typeof validations.minLength;
      shape[name] = Yup.string().min(
        resolvedType === "number"
          ? validations.minLength
          : ((validations.minLength as ValidationOptionWithMessage<number>)
              .value as any),
        resolvedType === "number"
          ? `Minimum length is ${validations.minLength}`
          : `${
              (validations.minLength as ValidationOptionWithMessage<number>)
                .message
            }`
      );
        
    } catch (error) {
      console.log("ERROR IN COMMIN MINLENGTH")

    }
  }

  //   if (validations?.maxLength) {
  //     const resolvedType = typeof validations.maxLength;
  //     shape[name] = Yup.string().required(
  //       resolvedType === "number"
  //         ? `Maximum length is ${validations.maxLength}`
  //         : `${
  //             (validations.required as ValidationOptionWithMessage<number>)
  //               .message
  //           }`
  //     );
  //   }

  //   if (validations?.minValue) {
  //     const resolvedType = typeof validations.minValue;
  //     shape[name] = Yup.string().required(
  //       resolvedType === "number"
  //         ? `Minimum value allowed is ${validations.minLength}`
  //         : `${
  //             (validations.required as ValidationOptionWithMessage<boolean>)
  //               .message
  //           }`
  //     );
  //   }

  //   if (validations?.maxLength) {
  //     const resolvedType = typeof validations.maxLength;
  //     shape[name] = Yup.string().required(
  //       resolvedType === "number"
  //         ? `Maximum length is ${validations.maxLength}`
  //         : `${
  //             (validations.required as ValidationOptionWithMessage<boolean>)
  //               .message
  //           }`
  //     );
  //   }

  return shape[name];
}

// function resolveValues<T>(option:ValidationOption<T>):{value:T, message:string}{

//   if(typeof option === Boolean.to){
//     return option
//   }
//   return option.value
// }
// import {ObjectSchema} from 'yup'
const validateYupSchema = (schema: any, value: string) => {
    try {
      schema.validateSync(value);
    } catch (err: any) {
      console.log("ERROR IN VALIDATING")
      return err.message;
    }
    return undefined; // No error
  };
  

export { generateYupSchema, validateYupSchema };
export type { ValidationOptions, }
