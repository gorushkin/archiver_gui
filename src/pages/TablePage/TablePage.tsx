import { Button } from '@mui/material';

import { Buttons } from '../../components/Buttons/Buttons';
import { Table } from '../../components/Table/Table';

import { useTablePage } from './useTablePage';

const TablePage = () => {
  const { tableRows, onBackClickhandler, onResetClickhandler, onSubmitClickhandler } =
    useTablePage();

  return (
    <div className="main__page">
      <div className="main__buttons-wrapper">
        <Buttons />
      </div>
      <div className="main__table-wrapper">
        <Table items={tableRows} />
      </div>
      <div className="main__row">
        {/* <Button
          className="main__button main__button--left main__button--submit"
          variant="contained"
          color="error"
          onClick={onBackClickhandler}
        >
          Back
        </Button> */}
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
