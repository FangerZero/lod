
import { useRouter } from 'next/router';

export default function Art() {
  const router = useRouter();
  const { artSlug } = router.query;

  return (
    <div>
      ArtSlug ID: {artSlug}
    </div>
  )
}
