/** @format */

export interface HeaderUIProps {
  isCreating: boolean;
  handleClick: () => void;
  error: null | string | boolean;
  btnTxt: string;
  children: React.ReactNode;
}
