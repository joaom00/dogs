import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    max-width: 93.5rem;
    margin: 0 auto;
    padding: ${theme.space.sm};
    padding-bottom: ${theme.space.xs};
    border-bottom: 1px solid ${theme.colors.sand6};

    display: grid;
    grid-row-gap: ${theme.space.lg};
    grid-column-gap: ${theme.space.md};
    grid-template-columns: 8.4rem 1fr;
    grid-template-areas:
      'profileImage profileInfo'
      'profileBio profileBio'
      'profileStats profileStats';

    @media ${theme.media.greaterThan('medium')} {
      padding: ${theme.space.md} ${theme.space.xl};
      padding-bottom: ${theme.space['3xl']};
      grid-template-columns: 18.4rem 1fr;
      grid-column-gap: 7rem;
      grid-template-areas:
        'profileImage profileInfo'
        'profileImage profileStats'
        'profileImage profileBio';
    }
  `}
`;

export const ProfileImage = styled.img`
  ${({ theme }) => css`
    grid-area: profileImage;

    width: 8.4rem;
    height: 8.4rem;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;

    @media ${theme.media.greaterThan('medium')} {
      width: 18.4rem;
      height: 18.4rem;
    }
  `}
`;

export const ProfileInfo = styled.div`
  ${({ theme }) => css`
    grid-area: profileInfo;

    @media ${theme.media.greaterThan('medium')} {
      display: flex;
      align-items: center;
      gap: ${theme.space.sm};
      margin-top: ${theme.space.md};
    }
  `}
`;

export const ProfileUsername = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xlarge};
    color: ${theme.colors.sand12};
    font-weight: ${theme.font.medium};
    margin-bottom: ${theme.space.sm};

    @media ${theme.media.greaterThan('medium')} {
      margin-bottom: 0;
    }
  `}
`;

export const ProfileStats = styled.div`
  ${({ theme }) => css`
    grid-area: profileStats;

    display: flex;
    justify-content: space-between;
    color: ${theme.colors.sand12};
    border-top: 1px solid ${theme.colors.sand6};
    padding: ${theme.space.sm} ${theme.space.xl};
    font-size: ${theme.font.sizes.xsmall};

    text-align: center;

    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;

    strong {
      display: block;
      font-size: ${theme.font.sizes.medium};
      font-weight: ${theme.font.bold};
      margin-bottom: ${theme.space.xs};
    }

    > p:not(:first-child) {
      cursor: pointer;
    }

    @media ${theme.media.greaterThan('medium')} {
      width: auto;
      position: inherit;
      left: 0;
      right: 0;
      margin-left: 0;
      margin-right: 0;

      border-top: 0;
      text-align: left;
      justify-content: flex-start;
      padding: 0;
      gap: ${theme.space['2xl']};
      font-size: ${theme.font.sizes.medium};

      strong {
        display: inline;
      }
    }
  `}
`;

export const ProfileBio = styled.div`
  ${({ theme }) => css`
    grid-area: profileBio;

    line-height: ${theme.space.md};
  `}
`;

export const Feed = styled.ul`
  ${({ theme }) => css`
    max-width: 93.5rem;
    margin: 0 auto;
    margin-top: ${theme.space.lg};
    padding-bottom: ${theme.space.lg};

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0.8rem;

    @media ${theme.media.greaterThan('medium')} {
      grid-gap: 2.8rem;
    }

    li {
      display: grid;
      grid-template-columns: 1fr;
      cursor: pointer;

      img {
        grid-area: 1/1;
        width: 100%;
        max-width: 29.3rem;
        min-width: 12.3rem;
        height: 100%;
        max-height: 29.3rem;
        min-height: 12.3rem;
        object-fit: cover;
        display: block;

        @media ${theme.media.greaterThan('medium')} {
          height: 29.3rem;
        }
      }

      &:hover ${Overlay} {
        display: flex;
      }
    }
  `}
`;

export const Overlay = styled.div`
  ${({ theme }) => css`
    grid-area: 1/1;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 2;

    display: none;
    justify-content: center;
    align-items: center;
    gap: ${theme.space.md};

    color: white;
  `}
`;

export const FollowWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 40px 1fr 76px;
    align-items: center;
    padding: ${theme.space.sm} ${theme.space.md};

    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
  `}
`;

export const FollowUsername = styled.p`
  ${({ theme }) => css`
    font-weight: ${theme.font.medium};
    font-size: ${theme.font.sizes.small};
    margin-bottom: 4px;
  `}
`;

export const FollowName = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.sand11};
  `}
`;

export const FollowAction = styled.button`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    border: 1px solid ${theme.colors.sand6};
    color: ${theme.colors.sand12};
    border-radius: ${theme.radii.base};
    height: 100%;
  `}
`;
