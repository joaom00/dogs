import React from 'react';
import { useRouter } from 'next/router';
import { AnySchema, ValidationError } from 'yup';

export const useYupValidationResolver = (validationSchema: AnySchema) =>
  React.useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: (errors as ValidationError).inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path as string]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

export const useContextualRoute = () => {
  const router = useRouter();
  const returnHref = React.useRef(router.asPath);

  React.useEffect(() => {
    returnHref.current = router.asPath;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.username]);

  const query = new URLSearchParams(router.query as Record<string, string>).toString();

  const href = `${router.pathname}?${query}`;

  return [href, returnHref.current] as const;
};
