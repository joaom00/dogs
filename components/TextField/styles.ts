import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space.xs};
    margin-bottom: ${theme.space.sm};
    max-width: 40rem;
    width: 100%;
  `}
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Input = styled.input<{ error: boolean }>`
  ${({ theme, error }) => css`
    outline: none;
    padding: 1rem ${theme.space.sm};
    border-radius: ${theme.radii.base};

    border: 1.5px solid ${theme.colors.sand6};

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
