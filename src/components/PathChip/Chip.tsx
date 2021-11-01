import './index.scss';

import React from 'react';

interface ChipProps {
  value?: string;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  onEdit?: React.FormEventHandler<HTMLSpanElement>;
  editable?: boolean;
}

const Chip = ({
  value = 'N/A',
  onDelete,
  onEdit,
  editable = true,
}: ChipProps): React.ReactElement<ChipProps> => {
  return (
    <div className="chip">
      <input
        list="chip-options"
        name="chip"
        value={value}
        onInput={onEdit}
        type="search"
      />
      <datalist id="chip-options">
        <option value="*">(select all)</option>
        <option value="[a, b, c]">(select indices/keys)</option>
        <option value="a">(select index/key)</option>
      </datalist>
      <button
        name="delete-chip"
        disabled={!onDelete || !editable}
        onClick={onDelete}
        className="delete"
      >
        X
      </button>
    </div>
  );
};

export default Chip;
