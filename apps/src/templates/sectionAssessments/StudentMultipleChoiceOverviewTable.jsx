import React, {Component, PropTypes} from 'react';
import {Table, sort} from 'reactabular';
import {tableLayoutStyles, sortableOptions} from "../tables/tableConstants";
import i18n from '@cdo/locale';
import wrappedSortable from '../tables/wrapped_sortable';
import orderBy from 'lodash/orderBy';

export const COLUMNS = {
  QUESTION: 0,
  STUDENT_NAME: 1,
  NUM_MULTIPLE_CHOICE_CORRECT: 2,
  NUM_MULTIPLE_CHOICE: 3,
  PERCENT_CORRECT: 4,
  SUBMISSION_TIMESTAMP: 5,
};

const studentOverviewDataPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  numMultipleChoiceCorrect: PropTypes.number.isRequired,
  numMultipleChoice: PropTypes.number.isRequired,
  percentCorrect: PropTypes.string.isRequired,
  submissionTimestamp: PropTypes.string,
});

class StudentAssessmentOverviewTable extends Component {
  static propTypes= {
    studentOverviewData: PropTypes.arrayOf(studentOverviewDataPropType),
  };

  state = {
    [COLUMNS.NAME]: {
      direction: 'desc',
      position: 0
    }
  };

  getSortingColumns = () => {
    return this.state.sortingColumns || {};
  };

  onSort = (selectedColumn) => {
    this.setState({
      sortingColumns: sort.byColumn({
        sortingColumns: this.state.sortingColumns,
        // Custom sortingOrder removes 'no-sort' from the cycle
        sortingOrder: {
          FIRST: 'asc',
          asc: 'desc',
          desc: 'asc'
        },
        selectedColumn
      })
    });
  };

  getColumns = (sortable) => {
    let dataColumns = [
      {
        property: 'name',
        header: {
          label: i18n.studentName(),
          props: {style: tableLayoutStyles.headerCell},
          transforms: [sortable],
        },
        cell: {
          props: {style:tableLayoutStyles.cell},
        }
      },
      {
        property: 'numMultipleChoiceCorrect',
        header: {
          label: i18n.numMultipleChoiceCorrect(),
          props: {style: tableLayoutStyles.headerCell},
        },
        cell: {
          props: {style:tableLayoutStyles.cell},
        }
      },
      {
        property: 'numMultipleChoice',
        header: {
          label: i18n.numMultipleChoice(),
          props: {style: tableLayoutStyles.headerCell},
        },
        cell: {
          props: {style:tableLayoutStyles.cell},
        }
      },
      {
        property: 'percentCorrect',
        header: {
          label: i18n.percentCorrect(),
          props: {style: tableLayoutStyles.headerCell},
        },
        cell: {
          props: {style:tableLayoutStyles.cell},
        }
      },
      {
        property: 'submissionTimeStamp',
        header: {
          label: i18n.submissionTimestamp(),
          props: {style: tableLayoutStyles.headerCell},
        },
        cell: {
          props: {style:tableLayoutStyles.cell},
        }
      },
    ];
    return dataColumns;
  };

  render() {
    // Define a sorting transform that can be applied to each column
    const sortable = wrappedSortable(this.getSortingColumns, this.onSort, sortableOptions);
    const columns = this.getColumns(sortable);
    const sortingColumns = this.getSortingColumns();

    const sortedRows = sort.sorter({
      columns,
      sortingColumns,
      sort: orderBy,
    })(this.props.studentOverviewData);

    return (
      <Table.Provider
        columns={columns}
        style={tableLayoutStyles.table}
      >
        <Table.Header />
        <Table.Body rows={sortedRows} rowKey="id" />
      </Table.Provider>
    );
  }
}

export default StudentAssessmentOverviewTable;
