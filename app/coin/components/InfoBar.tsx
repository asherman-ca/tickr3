'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { likeType } from '@/app/utils/types'
import { getCoinLikes, addLike } from '@/app/utils/fetchers'

function InfoBar({
	coinId,
	staticLikes,
}: {
	coinId: string
	staticLikes: likeType[]
}) {
	const queryClient = useQueryClient()

	const { data, error, isLoading } = useQuery({
		queryFn: () => getCoinLikes(coinId),
		queryKey: ['coinLikes'],
	})

	const { mutate } = useMutation(addLike, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(['coinLikes'])
		},
		onError: (error) => {
			console.log('error', error)
		},
	})

	const submitLike = async (e: React.FormEvent) => {
		e.preventDefault()
		mutate(coinId)
	}

	return (
		<div>
			{data ? data.length : staticLikes.length} likes
			<button onClick={submitLike}>Like</button>
		</div>
	)
}

export default InfoBar
