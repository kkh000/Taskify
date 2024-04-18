import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function LoginButton({ children, onClick, disabled, ...rest }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        'w-fit tb:w-[520px] tb:h-[50px] flex-center rounded-md bg-tp-violet_900 text-white disabled:bg-gray-400'
      }>
      {children}
    </button>
  );
}

export default LoginButton;
