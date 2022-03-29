import { Button } from '@mui/material';
import { FC } from 'react';

import { Table } from '../Table/Table';

import { useTablePage, TableTypes } from './useTablePage';
interface TablePageProps {
  type: TableTypes;
}

const TablePage: FC<TablePageProps> = ({ type }) => {
  const { tableRows, onBackClickhandler, onResetClickhandler, onSubmitClickhandler } =
    useTablePage(type);

  return (
    <div className="main__page">
      <Table items={tableRows} type={type} />
      <div className="main__row">
        <Button
          className="main__button main__button--left main__button--submit"
          variant="contained"
          color="error"
          onClick={onBackClickhandler}
        >
          Back
        </Button>
        <Button
          className="main__button main__button--center main__button--submit"
          variant="contained"
          color="error"
          onClick={onResetClickhandler}
        >
          Reset
        </Button>
        <Button
          onClick={onSubmitClickhandler}
          className="main__button main__button--right main__button--submit"
          variant="contained"
        >
          Pack
        </Button>
      </div>
    </div>
  );
};

export { TablePage };
