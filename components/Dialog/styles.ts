import styled, { css } from 'styled-components';

import { Title, Overlay, Content, Close } from '@radix-ui/react-dialog';

export const DialogOverlay = styled(Overlay)`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  inset: 0;
`;

export const DialogContent = styled(Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;

  background-color: white;
  border-radius: 12px;
`;

export const DialogTitleWrapper = styled.div`
  ${({ theme }) => css`
    padding: ${theme.space.sm} 0;
    border-bottom: 1px solid ${theme.colors.sand6};
  `}
`;

export const DialogTitle = styled(Title)`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.normal};
    color: ${theme.colors.sand12};
    text-align: center;
  `}
`;

export const DialogClose = styled(Close)`
  ${({ theme }) => css`
    padding: ${theme.space.xs};
    display: grid;
    place-items: center;

    position: absolute;
    right: 8px;
    top: 8px;
  `}
`;
