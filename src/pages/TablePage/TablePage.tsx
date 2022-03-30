import { Button } from '@mui/material';

import { Table } from '../../components/Table/Table';

import { useTablePage } from './useTablePage';

const TablePage = () => {
  const { tableRows, onBackClickhandler, onResetClickhandler, onSubmitClickhandler } =
    useTablePage();

  return (
    <div className="main__page">
      <Table items={tableRows} />
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
