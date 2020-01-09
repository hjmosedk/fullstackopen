import React, { useState, useImperativeHandle } from 'react';
import { Button } from 'semantic-ui-react';

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
        <Button
          data-cy='newBlog'
          color={'pink'}
          inverted
          onClick={toggleElementVisibilty}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          data-cy='cancel'
          color={'pink'}
          inverted
          onClick={toggleElementVisibilty}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
});

export default ToggleElement;
