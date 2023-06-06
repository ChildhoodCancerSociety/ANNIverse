export interface ContainerHeaderProps {
  title?: string;
}

const ContainerHeader: React.FC<
  React.PropsWithChildren<ContainerHeaderProps>
> = ({ title, children }) => {
  return (
    <>
      {title}
      {children}
    </>
  );
};

export default ContainerHeader;
