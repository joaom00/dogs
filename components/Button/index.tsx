import * as S from './styles';

type TButtonProps = {
  size?: 'small' | 'medium';
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ size = 'small', children, ...props }: TButtonProps) {
  return (
    <S.Wrapper type="button" size={size} {...props}>
      {children}
    </S.Wrapper>
  );
}
