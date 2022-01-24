import styled, { css } from 'styled-components';

import { Overlay, Content, Title, Action, Cancel } from '@radix-ui/react-alert-dialog';

export const AlertDialogOverlay = styled(Overlay)`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  inset: 0;

  @media (prefers-reduced-motion: no-preference) {
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes overlayShow {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 100;
    }
  }
`;

export const AlertDialogContent = styled(Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  overflow: hidden;

  background-color: white;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;

  @media (prefers-reduced-motion: no-preference) {
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes contentShow {
    0% {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }

    100% {
      opacity: 100;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

export const ProfileImage = styled.div`
  flex: 1;
  display: grid;
  place-items: center;

  img {
    width: 10rem;
    height: 10rem;
  }
`;

export const AlertDialogTitle = styled(Title)`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.medium};
  `}
`;

export const ActionsWrapper = styled.div`
  justify-self: flex-end;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AlertDialogAction = styled(Action)`
  ${({ theme }) => css`
    color: red;
    border-top: 1px solid ${theme.colors.sand6};
    padding: 1.2rem;
    font-weight: ${theme.font.medium};

    &:focus {
      background-color: ${theme.colors.yellow3};
    }
  `}
`;

export const AlertDialogCancel = styled(Cancel)`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.colors.sand6};
    padding: 1.2rem;

    &:focus {
      background-color: ${theme.colors.yellow3};
    }
  `}
`;
