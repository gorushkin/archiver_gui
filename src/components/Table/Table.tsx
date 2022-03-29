import { Button } from '@mui/material';
import { FC, useRef } from 'react';

import { TableTypes } from '../TablePage/useTablePage';

export enum Buttons {
  dir = 'dir',
  file = 'file',
}

export interface TableRow {
  name: string;
  caption: string;
  value: string | undefined;
  disabled: boolean;
  clickHandler: Function | null;
  changeHandler: Function | null;
  button?: Buttons;
}

interface TableProps {
  items: TableRow[];
  type: TableTypes;
}

const Table: FC<TableProps> = ({ items, type }) => {
  const input = useRef<HTMLInputElement>(null);

  const onFocusHandler = () => {
    if (!!input.current) {
      input.current.select();
    }
  };

  return (
    <ul className="main__table">
      {items.map((item, id) => {
        return (
          <li key={id} className="main__table-row">
            <div className="main__table-cell main__table-cell--01">{item.caption}</div>
            <div className="main__table-cell main__table-cell--02">
              <input
                onChange={(e) => {
                  if (item.changeHandler) {
                    item.changeHandler(e.target.value);
                  }
                }}
                type="text"
                ref={input}
                value={item.value}
                disabled={!item.changeHandler}
                className="main__table-input"
                title={item.value}
                onFocus={onFocusHandler}
              />
            </div>
            {item.clickHandler && (
              <div className="main__table-cell main__table-cell--03">
                <Button
                  onClick={() => {
                    if (item.clickHandler) {
                      item.clickHandler(item.button, item.name);
                    }
                  }}
                  variant="contained"
                >
                  Browse
                </Button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export { Table };
