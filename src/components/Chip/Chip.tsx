import * as React from 'react';

interface ChipProps {
  value: string;
  onDelete(e: Event): void;
  onEdit(e: Event): void;
}

const Chip = (): React.ReactElement<ChipProps> => {
  return (
    <div className="chip">
      <div className="chip__editable" contentEditable>
        test
      </div>
    </div>
  );
};

export default Chip;
