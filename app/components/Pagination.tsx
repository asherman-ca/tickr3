import React from 'react'
import { paginationRange } from './PaginationRange'
import styles from './Pagination.module.css'
const {
	pagination,
	showRows,
	pages,
	pageButton,
	active,
	dots,
	pageScrollButton,
} = styles

type PaginationProps = {
	setRowsPerPage: any
	rowsPerPage: number
	rowsPerPageOptions: number[]
	totalCount: number
	setCurrentPage: any
	currentPage: number
	nextPage: any
	prevPage: any
}

const Pagination = ({
	setRowsPerPage,
	rowsPerPage,
	rowsPerPageOptions,
	totalCount,
	setCurrentPage,
	currentPage,
	nextPage,
	prevPage,
}: PaginationProps) => {
	const lastPage =
		totalCount % rowsPerPage === 0
			? totalCount / rowsPerPage
			: Math.floor(totalCount / rowsPerPage) + 1

	const paginationPages = paginationRange(currentPage, lastPage)

	const onSelect = (selectedValue: string) => {
		setRowsPerPage(selectedValue)
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		<div className={`${pagination}`}>
			<div>
				<button
					className='top-button'
					onClick={() => {
						window.scrollTo({
							top: 0,
							behavior: 'smooth',
						})
					}}
				>
					<i className='fa-solid fa-chevron-up'></i>
				</button>
			</div>
			<div className={`${pages}`}>
				<button
					disabled={currentPage === 1}
					className={
						currentPage !== 1
							? `${pageScrollButton}`
							: `${pageScrollButton} inactive`
					}
					onClick={() => {
						prevPage()
					}}
				>
					<i className='fa-solid fa-chevron-left'></i>
				</button>

				{paginationPages.map((pageNumber: number | string, ind: number) => {
					if (pageNumber === '...') {
						return (
							<div key={ind} className={`${dots}`}>
								<i className='fa-solid fa-ellipsis'></i>
							</div>
						)
					} else if (pageNumber === currentPage) {
						return (
							<button key={ind} className={`${pageButton} ${active}`}>
								{pageNumber}
							</button>
						)
					} else {
						return (
							<button
								key={ind}
								className={`${pageButton}`}
								onClick={() => {
									setCurrentPage(pageNumber)
									window.scrollTo({
										top: 0,
										behavior: 'smooth',
									})
								}}
							>
								{pageNumber}
							</button>
						)
					}
				})}

				<button
					disabled={currentPage === lastPage}
					className={
						currentPage !== lastPage
							? `${pageScrollButton}`
							: `${pageScrollButton} inactive`
					}
					onClick={() => nextPage()}
				>
					<i className='fa-solid fa-chevron-right'></i>
				</button>
			</div>
			<div className={`${showRows}`}>
				<div>Show rows</div>
				<select
					name=''
					id=''
					value={rowsPerPage}
					onChange={(e) => {
						onSelect(e.target.value)
					}}
				>
					{rowsPerPageOptions.map((option) => (
						<option key={option}>{option}</option>
					))}
				</select>
			</div>
		</div>
	)
}

export default Pagination
