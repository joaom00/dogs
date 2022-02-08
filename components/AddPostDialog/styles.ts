import styled, { css } from 'styled-components';

import { Overlay, Title, Content, Close, Trigger } from '@radix-ui/react-dialog';

export const DialogOverlay = styled(Overlay)`
  background-color: rgba(0, 0, 0, 0.85);
  position: fixed;
  inset: 0;

  @media (prefers-reduced-motion: no-preference) {
    animation: overlayShow 250ms cubic-bezier(0.16, 1, 0.3, 1);
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

export const DialogTrigger = styled(Trigger)`
  ${({ theme }) => css`
    display: flex;
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.sand12};
    user-select: none;
    cursor: pointer;
    padding: ${theme.space.sm};
    width: 100%;

    &:hover {
      outline: none;
      background-color: ${theme.colors.sand4};
    }
  `}
`;

export const DialogTitleWrapper = styled.div`
  ${({ theme }) => css`
    padding: ${theme.space.sm} 0;
    border-bottom: 1px solid ${theme.colors.sand6};
    display: grid;
    grid-template-columns: 1fr auto 1fr;
  `}
`;

export const DialogTitle = styled(Title)`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.medium};
    color: ${theme.colors.sand12};
    grid-column-start: 2;
  `}
`;

export const SendButton = styled.button`
  ${({ theme }) => css`
    margin-left: auto;
    margin-right: ${theme.space.sm};
    color: ${theme.colors.yellow11};

    display: flex;
    align-items: center;
    gap: ${theme.space.xs};
  `}
`;

export const DialogContent = styled(Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 932px;
  height: 547px;

  background-color: white;
  border-radius: 12px;

  display: flex;
  flex-direction: column;

  @media (prefers-reduced-motion: no-preference) {
    animation: contentShow 250ms cubic-bezier(0.16, 1, 0.3, 1);
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

export const DialogContentMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
`;

export const DialogLeftContentMain = styled.div`
  height: 100%;
`;

export const DialogRightContentMain = styled.div`
  ${({ theme }) => css`
    height: 100%;
    border-left: 1px solid ${theme.colors.sand6};
  `}
`;

export const Textarea = styled.textarea`
  ${({ theme }) => css`
    width: 100%;
    outline: none;
    border: none;
    resize: none;
    font-family: inherit;
    border-bottom: 1px solid ${theme.colors.sand6};
    padding: ${theme.space.sm};
  `}
`;

export const DialogClose = styled(Close)`
  ${({ theme }) => css`
    padding: ${theme.space.xs};
    display: grid;
    place-items: center;
    color: ${theme.colors.yellow1};

    position: absolute;
    right: 8px;
    top: 8px;
  `}
`;
