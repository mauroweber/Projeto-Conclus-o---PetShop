
export default function getValidationErrors(err){debugger
  const validationErrors= {};

  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
