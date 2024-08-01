import type { ZodError, ZodSchema } from "zod";

export const validateAction = async ({
  request,
  schema,
}: {
  request: Request;
  schema: ZodSchema;
}) => {
  const formData = Object.fromEntries(await request.formData());

  try {
    const parsedData = schema.parse(formData);
    return { formData: parsedData, errors: null };

  } catch (error) {
    const zodError = error as ZodError;
    const errors = zodError.issues.reduce((acc, issue) => {
      acc[issue.path[0] as string] = issue.message;
      return acc;
    }, {} as Record<string, string>);
    return { formData: formData, errors };
  }
};
