/** @format */

export interface HeaderUIProps {
  isCreating: boolean;
  handleClick: () => void;
  error: null | string;
  btnTxt: string;
  children: React.ReactNode;
}
