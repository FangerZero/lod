import Image from 'next/image'

export default function Custom500() {
    const src = '/images/ruff-404.png'

    return (
      <>
        <h1>500 - Server-side error occurred</h1>

        <Image
            src={src}
            alt="Spino can't deliver it."
            width={500}
            height={500}
        />
        <p>
            Spino can&#39;t deliver your message, please try again later.
        </p>
        </>
    );
  }
