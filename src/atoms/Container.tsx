import { renderGeneric } from "@/utils/render";
import type { Renderable } from "@/utils/render";

import type { ContainerBoundaryProps } from "./ContainerBoundary";
import ContainerBoundary from "./ContainerBoundary";

interface ContainerProps {
  header?: string | true | JSX.Element;
  headerProps?: ContainerBoundaryProps;
  externalHeader?: true;
  footer?: string | true | JSX.Element;
  footerProps?: ContainerBoundaryProps;
  externalFooter?: true;
  loading?: boolean;
  loadingSkeleton?: JSX.Element | React.FC | React.ReactNode;
}

const renderContainerBoundary = (
  boundary: Renderable,
  boundaryProps: ContainerBoundaryProps
) =>
  renderGeneric(
    boundary,
    <ContainerBoundary {...boundaryProps}>
      {boundaryProps.title ?? boundary}
    </ContainerBoundary>,
    boundaryProps
  );

const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  children,
  header = null,
  headerProps = {},
  footer = null,
  footerProps = {},
}) => {
  const renderHeader = () => renderContainerBoundary(header, headerProps);
  const renderFooter = () => renderContainerBoundary(footer, footerProps);

  return (
    <div>
      {renderHeader()}
      <div>{children}</div>
      {renderFooter()}
    </div>
  );
};

export default Container;
