import * as React from 'react';

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
    <div
      className="chip"
      style={{
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        backgroundColor: 'bisque',
        width: 'fit-content',
        padding: '0.3rem',
        borderRadius: '5px',
        marginRight: '0.5rem',
      }}
    >
      <input
        list="chip-options"
        name="chip"
        value={value}
        onInput={onEdit}
        style={{ width: 'fit-content' }}
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
      >
        X
      </button>
    </div>
  );
};

export default Chip;
