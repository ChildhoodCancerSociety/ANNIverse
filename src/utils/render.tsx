// TODO: these types honestly make very little sense. "true" is not renderable, but is a value that can be passed in. "RenderableWithFunc" is just... bad nomenclature. this can and should be cleaned up whenever it might matter
// a true "Renderable" type would really be JSX.Element | React.ReactNode | string
type JSXEl = JSX.Element | React.ReactNode;
export type Renderable = true | string | JSXEl;
export type RenderableWithFunc = React.FC | Renderable;

/**
 *
 * @param renderable some truthy value that either represents a render function, JSX, or other auto-renderable value
 * @param renderItem a specific end-renderable item (render func, string, or JSX element)
 * @param renderFunctionProps props for a renderable/ renderItem that is a render function
 * @returns
 */
export const renderGeneric = (
  renderable: RenderableWithFunc,
  renderItem?: Exclude<RenderableWithFunc, true>,
  renderFunctionProps = {}
): string | JSXEl => {
  if (renderable === "true" && renderItem) {
    return renderGeneric(renderItem, undefined, renderFunctionProps);
  }

  if (typeof renderable === "string" || typeof renderable === "object")
    return renderable;

  if (typeof renderable === "function") {
    const RenderFunction = renderable;
    return <RenderFunction {...renderFunctionProps} />;
  }

  return null;
};
