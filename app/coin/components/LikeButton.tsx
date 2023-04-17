import { useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import { getCoinLikes, addLike, removeLike } from '@/app/utils/fetchers'
import { likeType } from '@/app/utils/types'

type props = {
	staticLikes: likeType[]
	coinId: string
	initialUserLike: likeType[]
}

function likeButton({ staticLikes, coinId, initialUserLike }: props) {
	const queryClient = useQueryClient()
	const { data: session, status: sessionStatus }: any = useSession()

	const {
		data: likes,
		error,
		isLoading,
		isFetching,
	} = useQuery({
		queryFn: () => getCoinLikes(coinId),
		queryKey: [`coinLikes-${coinId}`],
	})

	const { mutate: handleAddLike } = useMutation(addLike, {
		onSuccess: (data) => {
			// queryClient.invalidateQueries([`coinLikes-${coinId}`])
			queryClient.setQueryData([`coinLikes-${coinId}`], (oldData: any) => {
				const newLike = {
					userId: session.user.id,
					coinId,
				}
				return [...oldData, newLike]
			})
		},
		onError: (error) => {
			console.log('error', error)
		},
	})

	const { mutate: handleRemoveLike } = useMutation(removeLike, {
		onSuccess: (data) => {
			// queryClient.invalidateQueries([`coinLikes-${coinId}`])
			queryClient.setQueryData([`coinLikes-${coinId}`], (oldData: any) => {
				return oldData.filter((like: any) => {
					return like.userId !== session.user.id
				})
			})
		},
		onError: (error) => {
			console.log('error', error)
		},
	})

	const userLike = useMemo(() => {
		if (likes && session) {
			return likes.filter((like) => {
				return like.userId === session.user.id
			})
		} else {
			return initialUserLike
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

	return (
		<div className='pr-4 border-slate-300 border-r-2 flex items-center gap-2'>
			{!userLike.length ? (
				<HeartIcon
					height={20}
					width={20}
					onClick={handleLike}
					className='hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer hover:text-red-500'
				/>
			) : (
				<HeartIconSolid
					height={20}
					width={20}
					onClick={handleLike}
					color={'red'}
					className='hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'
				/>
			)}

			<span className='text-slate-500'>
				{likes ? likes.length : staticLikes.length}
			</span>
		</div>
	)
}

export default likeButton
