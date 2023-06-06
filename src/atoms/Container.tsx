import type { ContainerFooterProps } from "./ContainerFooter";
import ContainerFooter from "./ContainerFooter";
import type { ContainerHeaderProps } from "./ContainerHeader";
import ContainerHeader from "./ContainerHeader";

interface ContainerProps {
  header?: string | true | JSX.Element;
  headerProps?: ContainerHeaderProps;
  externalHeader?: true;
  footer?: string | true | JSX.Element;
  footerProps?: ContainerFooterProps;
  externalFooter?: true;
  loading?: boolean;
  skeleton?: JSX.Element;
}

const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  children,
  header,
  headerProps = {},
  footer,
  footerProps = {},
}) => {
  const renderHeader = () => {
    if (header) {
      if (typeof header === "boolean" || typeof header === "string") {
        return (
          <ContainerHeader {...headerProps}>
            {headerProps.title ?? header}
          </ContainerHeader>
        );
      }

      if (typeof header === "object") {
        return header;
      }
    }

    return null;
  };

  const renderFooter = () => {
    if (footer) {
      if (typeof footer === "boolean" || typeof footer === "string") {
        return (
          <ContainerFooter {...footerProps}>
            {footerProps.title ?? footer}
          </ContainerFooter>
        );
      }

      if (typeof footer === "object") {
        return footer;
      }
    }

    return null;
  };
  return (
    <div>
      {renderHeader()}
      <div>{children}</div>
      {renderFooter()}
    </div>
  );
};

export default Container;
