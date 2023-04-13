'use client'
import { useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { likeType } from '@/app/utils/types'
import { getCoinLikes, addLike, removeLike } from '@/app/utils/fetchers'
import { HeartIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

function InfoBar({
	coinId,
	staticLikes,
}: {
	coinId: string
	staticLikes: likeType[]
}) {
	const queryClient = useQueryClient()
	const { data: session }: any = useSession()

	const {
		data: likes,
		error,
		isLoading,
	} = useQuery({
		queryFn: () => getCoinLikes(coinId),
		queryKey: ['coinLikes'],
	})

	const { mutate: handleAddLike } = useMutation(addLike, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(['coinLikes'])
		},
		onError: (error) => {
			console.log('error', error)
		},
	})

	const { mutate: handleRemoveLike } = useMutation(removeLike, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(['coinLikes'])
		},
		onError: (error) => {
			console.log('error', error)
		},
	})

	const userLike = useMemo(() => {
		if (likes) {
			return likes.filter((like) => {
				return like.userId === session.user.id
			})
		} else {
			return []
		}
	}, [likes, session])

	const handleLike = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!session) {
			return toast.error('must be logged in')
		}

		if (!userLike.length) {
			handleAddLike(coinId)
		} else {
			handleRemoveLike(coinId)
		}
	}

	console.log('client session', session)
	console.log('userLike', userLike)

	return (
		<div className='flex flex-col'>
			<div className='flex flex-col'>
				<div>Name</div>
				<div>Table</div>
			</div>

			<div className='flex justify-between'>
				<div className='flex'>
					<div className='pr-2 border-slate-300 border-r-2 flex items-center'>
						<HeartIcon
							height={24}
							width={24}
							onClick={handleLike}
							color={`${userLike.length && 'red'}`}
						/>
						{likes ? likes.length : staticLikes.length}
						{/* <button onClick={submitLike}>Like</button> */}
					</div>
					<div className='pl-2'>explorers</div>
				</div>

				<div className='flex'>
					<div>link1</div>
					<div>link1</div>
					<div>link1</div>
					<div>link1</div>
				</div>
			</div>
		</div>
	)
}

export default InfoBar
