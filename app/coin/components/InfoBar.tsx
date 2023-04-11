'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const getCoinLikes = async (coinId: string) => {
	const res = await axios.get(`/api/like/${coinId}`)
	return res.data
}

const addLike = async (coinId: string) => {
	const res = await axios.post('/api/like/addLike', { coinId })
	return res.data
}

function InfoBar({ coinId }: { coinId: string }) {
	const queryClient = useQueryClient()

	const { data, error, isLoading } = useQuery({
		queryFn: () => getCoinLikes(coinId),
		queryKey: ['coinLikes'],
	})

	const { mutate } = useMutation(
		async (coinId: string) => axios.post('/api/like/addLike', { coinId }),
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(['coinLikes'])
			},
			onError: (error) => {
				console.log('error', error)
			},
		}
	)

	const submitLike = async (e: React.FormEvent) => {
		e.preventDefault()
		mutate(coinId)
	}

	console.log('data', data)

	return (
		<div>
			<button onClick={submitLike}>Like</button>
		</div>
	)
}

export default InfoBar
