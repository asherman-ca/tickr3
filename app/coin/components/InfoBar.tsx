'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { likeType } from '@/app/utils/types'
import { getCoinLikes, addLike } from '@/app/utils/fetchers'

// const getCoinLikes = async (coinId: string) => {
// 	const res = await axios.get(`/api/like/${coinId}`)
// 	return res.data
// }

// const addLike = async (coinId: string) => {
// 	const res = await axios.post('/api/like/addLike', { coinId })
// 	return res.data
// }

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

	console.log('data', data)
	console.log('staticLikes', staticLikes)

	return (
		<div>
			{data ? data.length : staticLikes.length} likes
			<button onClick={submitLike}>Like</button>
		</div>
	)
}

export default InfoBar
