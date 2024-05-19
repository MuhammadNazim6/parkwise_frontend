import { func, number } from 'prop-types';
import ReactPaginate from 'react-paginate';

const Pagination = ({ initialPage, pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      activeClassName='pagination-active' // The class name for the active page
      breakClassName='pagination-break' // The class name for the break ('...')
      containerClassName='pagination-container' // The class name for the pagination container
      initialPage={initialPage} // The initial page
      marginPagesDisplayed={2} // The number of pages displayed at the margins
      nextClassName='pagination-next-prev' // The class name for the next button
      onPageChange={onPageChange} // The function to call when the page changes
      pageCount={pageCount} // The total number of pages
      pageRangeDisplayed={3} // The range of pages displayed
      pageClassName='pagination-page' // The class name for the page
      previousClassName='pagination-next-prev' // The class name for the previous button
    />
  );
}


Pagination.propTypes = {
  initialPage: number.isRequired, // The initial page is required and must be a number
  pageCount: number.isRequired, // The total number of pages is required and must be a number
  onPageChange: func.isRequired, // The function to call when the page changes is required
};

export default Pagination