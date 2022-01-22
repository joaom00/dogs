import styled, { css } from 'styled-components';

export const DropzoneWrapper = styled.div`
  ${({ theme }) => css`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${theme.space.md};

    p {
      font-size: ${theme.font.sizes.large};
    }

    span {
      color: ${theme.colors.sand11};
      strong {
        font-weight: ${theme.font.medium};
      }
    }
  `}
`;

export const DropzoneButton = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.colors.yellow9};
    padding: ${theme.space.xs} ${theme.space.sm};
    border-radius: ${theme.radii.base};
    display: block;
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.yellow10};
    }
  `}
`;

export const DropzoneImageWrapper = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
