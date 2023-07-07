import { useMemo } from "react";

import { renderGeneric } from "@/utils/render";
import type { Renderable } from "@/utils/render";

import type { ContainerBoundaryProps } from "./ContainerBoundary";
import ContainerBoundary from "./ContainerBoundary";

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

enum RoundingConfig {
  TOP = "top",
  BOTTOM = "bottom",
  NONE = "none",
  ALL = "all",
}

const roundingMap: Record<RoundingConfig, string> = {
  top: "rounded-t",
  bottom: "rounded-b",
  none: "",
  all: "rounded",
};

const createContainerClasses = (
  classString = "",
  roundingConfig = RoundingConfig.ALL
) => {
  const classes = classString.split(" ");

  const bgPrefix = "bg-";
  const borderPrefix = "border-";
  const inputBg: string[] = [];
  const inputBorder: string[] = [];

  classes.forEach((className) => {
    if (className.includes(bgPrefix)) inputBg.push(className);
    if (className.includes(borderPrefix)) inputBorder.push(className);
  });

  const spacingClasses = "px-4 py-3";
  const bgClasses = inputBg.length
    ? inputBg.join(" ")
    : "bg-green-100 dark:bg-green-950";
  const borderClasses = inputBorder.length
    ? inputBorder.join(" ")
    : "border-green-200 border-[2px] border-solid";
  const roundingClasses = roundingMap[roundingConfig];
  const otherClasses = "rounded";

  return [
    spacingClasses,
    bgClasses,
    borderClasses,
    roundingClasses,
    otherClasses,
  ].join(" ");
};

interface ContainerProps {
  header?: string | true | JSX.Element;
  headerProps?: ContainerBoundaryProps;
  externalHeader?: true;
  footer?: string | true | JSX.Element;
  footerProps?: ContainerBoundaryProps;
  externalFooter?: true;
  loading?: boolean;
  loadingSkeleton?: JSX.Element | React.FC | React.ReactNode;
  containerStyle?: React.CSSProperties;
  containerClassname?: string;
}
const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  children,
  header = null,
  headerProps = {},
  externalHeader,
  footer = null,
  footerProps = {},
  externalFooter,
  loading,
  loadingSkeleton,
  containerStyle = {},
  containerClassname = "",
}) => {
  const renderHeader = () => renderContainerBoundary(header, headerProps);
  const renderFooter = () => renderContainerBoundary(footer, footerProps);

  const containerClasses = useMemo(() => {
    let roundingConfig = RoundingConfig.NONE;
    if (externalFooter && externalHeader) roundingConfig = RoundingConfig.ALL;
    else if (externalFooter && !externalHeader)
      roundingConfig = RoundingConfig.TOP;
    else if (externalHeader && !externalFooter)
      roundingConfig = RoundingConfig.BOTTOM;

    return createContainerClasses(containerClassname, roundingConfig);
  }, [containerClassname, externalFooter, externalHeader]);

  return (
    <div className={containerClasses} style={containerStyle}>
      {renderHeader()}
      <div>{children}</div>
      {renderFooter()}
    </div>
  );
};

export default Container;
