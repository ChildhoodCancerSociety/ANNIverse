export interface ContainerBoundaryProps {
  /**
   *
   */
  title?: string;

  /**
   *
   */
  left?: string | JSX.Element;

  /**
   *
   */
  center?: string | JSX.Element;

  /**
   *
   */
  right?: string | JSX.Element;
}

const ContainerBoundary: React.FC<
  React.PropsWithChildren<ContainerBoundaryProps>
> = ({ title, left, center, right, children }) => {
  return (
    <>
      {title}
      {children}
    </>
  );
};

export default ContainerBoundary;
