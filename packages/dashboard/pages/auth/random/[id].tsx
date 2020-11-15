import { useRouter } from 'next/router'

export default function RandomIdPage() {
  const router = useRouter()
  const { id } = router.query

  return <div>PID = {id}</div>
}
