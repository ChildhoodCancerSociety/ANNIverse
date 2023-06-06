export interface ContainerFooterProps {
  title?: string;
  left?: string | JSX.Element;
  center?: string | JSX.Element;
  right?: string | JSX.Element;
}

const ContainerFooter: React.FC<
  React.PropsWithChildren<ContainerFooterProps>
> = ({ title, left, center, right, children }) => {
  return (
    <>
      {title}
      {children}
    </>
  );
};

export default ContainerFooter;
