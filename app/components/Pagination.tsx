import React from 'react'
import { paginationRange } from './PaginationRange'
import styles from './Pagination.module.css'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import {
	ChevronUpIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from '@heroicons/react/24/outline'
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
		<div className='flex items-center justify-between pt-4 px-2'>
			<div className='basis-1/5'>
				<button
					className='top-button'
					onClick={() => {
						window.scrollTo({
							top: 0,
							behavior: 'smooth',
						})
					}}
				>
					<ChevronUpIcon height={24} width={24} />
				</button>
			</div>
			<div className='basis-3/5 flex justify-center items-center gap-2'>
				<button
					// disabled={currentPage === 1}
					onClick={() => {
						prevPage()
					}}
					className={`${
						currentPage != 1
							? 'hover:bg-gray-200 cursor-pointer'
							: 'cursor-not-allowed'
					} p-2 rounded-md`}
				>
					<ChevronLeftIcon height={24} width={24} />
				</button>

				{paginationPages.map((pageNumber: number | string, ind: number) => {
					if (pageNumber === '...') {
						return (
							<div key={ind} className={`${dots}`}>
								<EllipsisHorizontalIcon height={24} width={24} />
							</div>
						)
					} else if (pageNumber === currentPage) {
						return (
							<button key={ind} className='px-4 py-2 rounded-md bg-gray-200'>
								{pageNumber}
							</button>
						)
					} else {
						return (
							<button
								key={ind}
								className='px-4 py-2 rounded-md hover:bg-gray-200'
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
					className={`${
						currentPage != lastPage
							? 'hover:bg-gray-200 cursor-pointer'
							: 'cursor-not-allowed'
					} p-2 rounded-md`}
					onClick={() => nextPage()}
				>
					<ChevronRightIcon height={24} width={24} />
				</button>
			</div>
			<div className='basis-1/5 flex justify-end items-center'>
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
