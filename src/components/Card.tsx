import React from 'react'
import { FavoritesDataProps } from '../../prisma/data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'
import { AspectRatio } from './ui/aspect-ratio'

interface cardProps extends FavoritesDataProps {}

function Card({favorites, item, index}: {favorites: FavoritesDataProps[], item: cardProps, index: number}) {
  return (
    <>
    <div className='flex flex-wrap gap-y-6'>
        <div key={index} id="cardMedia" className="relative overflow-hidden w-[235px] rounded-t-[10px]">
            {/* TODO: Add outline heart */}
                <Link href={`/property-details/${item.url}`}>
            <div className="relative">
                <FontAwesomeIcon
                icon={faHeart}
                className="absolute right-4 top-4 cursor-pointer text-white shadow-lg z-50 hover:scale-110 transition-all duration-80"
                />
                <AspectRatio ratio={16 / 9} className="bg-muted">
                    <Image
                        src={item.imgSrc}
                        alt={item.alt}
                        fill
                        className='object-cover rounded-t-[10px] hover:scale-110 transition-all duration-30'
                    />
                </AspectRatio>
            </div>
            
              <div id="cardContents"className="flex flex-col justify-center space-y-2 h-[88px] rounded-b-[10px] border border-zinc-300 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-normal leading-[14px] text-zinc-950">
                    {item.askPrice}
                  </p>
                  <div className="flex items-center justify-between gap-[2px]">
                    <p className="text-xs font-normal leading-[14px] text-neutral-500">
                      ARV:{" "}
                    </p>
                    <p className="text-xs font-normal leading-[14px] text-neutral-500">
                      {item.arv}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <p className="whitespace-nowrap text-sm font-normal leading-[14px] text-zinc-950">
                    {item.location}
                  </p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <div className="flex items-center justify-between gap-[2px]">
                    <p className="text-xs font-normal leading-[14px] text-neutral-500">
                      4 {item.beds}
                    </p>
                    <p className="text-xs font-normal leading-[14px] text-neutral-500">
                      bds
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-[2px]">
                    <p className="text-xs font-normal leading-[14px] text-neutral-500">
                     {item.baths}
                    </p>
                    <p className="text-xs font-normal leading-[14px] text-neutral-500">
                      ba
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-[2px]">
                    <p className="text-xs font-normal leading-[14px] text-neutral-500">
                     {item.sqft}
                    </p>
                    <p className="text-xs font-normal leading-[14px] text-neutral-500">
                      sqft
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
    </div>
          </>
  )
}

export default Card
