import React from 'react';
import { Resizable, ResizableBox, ResizableProps } from 'react-resizable';

const ResizableComponent: React.FC<ResizableProps> = ({ width, height, resizeHandles, children, handleSize }:any) => {
  // You can implement any logic related to resizing here if needed

  return (
    <Resizable width={width} height={height} resizeHandles={resizeHandles} handleSize={handleSize}>
      <div className="border">
        {children}
      </div>  
    </Resizable>
  );
};

export default ResizableComponent;