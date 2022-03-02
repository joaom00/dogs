import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  max-width: 80.9rem;
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputsWrapper = styled.fieldset`
  ${({ theme }) => css`
    border: none;
    margin-top: ${theme.space['3xl']};
  `}
`;

export const InputsTitle = styled.legend`
  ${({ theme }) => css`
    width: 100%;
    border: 0;
    border-bottom: 1px solid ${theme.colors.sand8};
    padding-bottom: 10px;
    font-size: ${theme.font.sizes.xlarge};
    font-weight: ${theme.font.medium};
    color: ${theme.colors.sand12};
  `}
`;

export const InputWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    margin-top: ${theme.space.lg};
  `}
`;

export const TextField = styled.input<{ error?: boolean }>`
  ${({ theme, error }) => css`
    border-radius: ${theme.radii.base};
    padding: 12px 16px;
    border: 1px solid ${theme.colors.sand6};
    outline: none;
    width: 100%;

    &:focus {
      border-color: ${theme.colors.yellow7};
    }

    ${error &&
    css`
      border-color: red;
    `}
  `}
`;

export const Error = styled.span`
  ${({ theme }) => css`
    margin-left: ${theme.space.xs};
    font-size: ${theme.font.sizes.xsmall};
    color: red;
  `}
`;
