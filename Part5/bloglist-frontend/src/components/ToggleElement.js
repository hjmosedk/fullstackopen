import React, { useState, useImperativeHandle } from 'react';

const ToggleElement = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleElementVisibilty = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleElementVisibilty };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleElementVisibilty}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleElementVisibilty}>Cancel</button>
      </div>
    </div>
  );
});

export default ToggleElement;
