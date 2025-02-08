import { CpHubError } from "@/clients/cpHub/CpHubError";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export function setFormError<T extends FieldValues>(
  formContext: UseFormReturn<T>,
  e: CpHubError
) {
  e.validationErrors?.forEach((validationError) => {
    formContext.setError(
      validationError.property as `root.${string}` | "root" | Path<T>,
      {
        // type: "manual",
        message: validationError.constraints
          ? Object.values(validationError.constraints).join(", ")
          : "Unknown error",
      }
    );
  });
}
