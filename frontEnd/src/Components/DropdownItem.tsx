interface Props {
  title: string;
  // imgSrc?: string;
  children?: React.ReactNode;
}
const DropdownItem = ({ title, children }: Props) => {
  return (
    <div className="px-1 my-2 d-flex justify-content-between align-items-center dropdown-item">
      {title}
      {children}
    </div>
  );
};

export default DropdownItem;
