import React from 'react';
import TableComponent from './TableComponent';

const columns = [
  { heading: 'ID' },
  { heading: 'Project' },
  { heading: 'Total', subHeadings: ['Total', 'Paid', 'Payable', 'Due'] },
  { heading: 'Base Price', subHeadings: ['Total', 'Paid', 'Payable', 'Due'] },
  { heading: 'Extra Work', subHeadings: ['Total', 'Paid', 'Payable', 'Due'] },
  { heading: 'Inflation', subHeadings: ['Total', 'Paid', 'Payable', 'Due'] },
  { heading: 'Service Charges', subHeadings: ['Total', 'Paid', 'Payable', 'Due'] },
];

const rows = [
  { id: 1, 
    project: 'Project 1', 
    columns: [100, 80, 20, 0, 50, 30, 20, 0, 75, 50, 25, 0, 90, 60, 30, 0, 80, 60, 20, 0] 
  },
  { id: 2, 
    project: 'Project 2', 
    columns: [150, 120, 30, 0, 70, 50, 20, 0, 85, 60, 25, 0, 95, 70, 25, 0, 75, 55, 15, 0] 
  },
  { id: 3, 
    project: 'Project 3', 
    columns: [150, 120, 30, 0, 70, 50, 20, 0, 85, 60, 25, 0, 95, 70, 25, 0, 75, 55, 15, 0] 
  },
  { id: 4, 
    project: 'Project 4', 
    columns: [150, 120, 30, 0, 70, 50, 20, 0, 85, 60, 25, 0, 95, 70, 25, 0, 75, 55, 15, 0] 
  },
  { id: 5, 
    project: 'Project 5', 
    columns: [150, 120, 30, 0, 70, 50, 20, 0, 85, 60, 25, 0, 95, 70, 25, 0, 75, 55, 15, 0] 
  },
  { id: 6, 
    project: 'Project 6', 
    columns: [150, 120, 30, 0, 70, 50, 20, 0, 85, 60, 25, 0, 95, 70, 25, 0, 75, 55, 15, 0] 
  },
 
];

function Table() {
  return <TableComponent columns={columns} rows={rows} />;
}

export default Table;
