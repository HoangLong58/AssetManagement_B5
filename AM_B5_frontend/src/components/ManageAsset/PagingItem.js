import '../../css/main.css';

function PagingItem(page, totalPages, setPage) {
    const Items = [];
    for (let i = 1; i <= totalPages; ++i) {
        Items.push(
            <li
                id={'li_' + i}
                style={{padding: '0'}}
                className={page == i ? 'paginationActive pointer' : 'pointer'}
                key={i}
            >
                <a id={'page_' + i} value={i} className="page-link" onClick={() => setPage(i)}>
                    {i}
                </a>
            </li>,
        );
    }

    const handleClickPrevious = () => {
        setPage(--page);
    };

    const handleClickNext = () => {
        setPage(++page);
    };

    return (
        <div id="paging_asset">
            <nav aria-label="Page navigation example" className="paginationBtns" id="navigation">
                <ul
                    id="pagination"
                    className="pagination justify-content-center"
                    style={{display: 'flex', flexDirection: 'row'}}
                >
                    <div className={page == 1 ? 'wrapper' : 'pointer'}>
                        <li
                            id="btn_previous"
                            style={{padding: '0'}}
                            className={page == 1 ? 'paginationDisabled disabled pointer-events-none' : ''}
                        >
                            <a
                                id="page_link_previous"
                                className="page-link previousBtn "
                                onClick={(e) => handleClickPrevious(e.target.value)}
                            >
                                Previous
                            </a>
                        </li>
                    </div>
                    {Items}
                    <div className={page == totalPages || totalPages <= page ? 'wrapper' : 'pointer'}>
                        <li
                            id="btn_next"
                            style={{padding: '0'}}
                            className={
                                page == totalPages || totalPages <= page
                                    ? 'paginationDisabled disabled pointer-events-none'
                                    : ''
                            }
                        >
                            <a
                                id="page_link_next"
                                className="nextBtn page-link"
                                onClick={(e) => handleClickNext(e.target.value)}
                            >
                                Next
                            </a>
                        </li>
                    </div>
                </ul>
            </nav>
        </div>
    );
}

export default PagingItem;
