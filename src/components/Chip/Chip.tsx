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
      <span
        className="chip__editable"
        contentEditable={editable}
        onInput={onEdit}
      >
        {value}
      </span>
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
