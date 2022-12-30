import Image from 'next/image';
import Meta from '../../components/layout/Meta';
import endiness from '../../public/images/game/endiness.webp';

export default function Map() {
    return (
      <div>
          <Meta title="Endiness Map" description="Explore the Endiness continent." />
          <Image src={endiness} width="1000"/>
      </div>
    )
  }
  