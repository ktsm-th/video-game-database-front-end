import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

type HeaderLinkProps = {
  link: string,
  icon: IconDefinition,
}

export default function HeaderLink({ link, icon }: HeaderLinkProps) {
  return (
    <Link href={link}>
      <li className="text-center text-white text-4xl ml-8 last-of-type:mr-8 font-bold flex justify-center items-center mr-2 hover:text-pink-500">
        <FontAwesomeIcon icon={icon}/>
      </li>
    </Link>
  )
}
