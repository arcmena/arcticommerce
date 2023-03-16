import { useState } from 'react'
import cn from 'classnames'

import { Entities, ProductOption, ProductVariant } from '@shopify/schema'

import s from './OptionSelector.module.css'

interface OptionSelectorProps {
  options: [ProductOption]
  variants: Entities<ProductVariant>
  swatchImages?: Record<string, string>
}

const OptionSelector = ({
  options,
  variants,
  swatchImages
}: OptionSelectorProps) => {
  const [selectedVariant, setSelectedVariant] = useState(variants.edges[0].node)

  return (
    <div className={s['container']}>
      {options.map(({ name, values }) => (
        <div key={name}>
          <div className="flex gap-2 pb-2 text-[13px] uppercase tracking-[1px]">
            <label className="inline">{name}</label>
            {name === 'Size' && (
              <button className="ml-auto uppercase tracking-[1px] underline">
                Size Chart
              </button>
            )}

            {name === 'Color' && (
              <span className="uppercase tracking-[1px]">{values[0]}</span>
            )}
          </div>

          <div
            className={cn('flex flex-wrap gap-4', {
              ['items-center']: name !== 'Size'
            })}
          >
            {values.map((val, index) =>
              name === 'Size' ? (
                <button
                  key={val}
                  className={cn(
                    'border-2 border-gray-200 leading-[43px] h-auto text-[13px] px-4',
                    {
                      ['border-black']: index === 0,
                      [s['disabled-radio']]: index === 2
                    }
                  )}
                >
                  {val}
                </button>
              ) : (
                <button
                  key={val}
                  id={val.replace(' ', '').toLowerCase()}
                  className={cn(
                    'border-2 border-gray-200 w-[40px] min-w-[40px] h-[40px] rounded-full relative inline-block',
                    s['swatch'],
                    {
                      [s['swatch-active']]: index === 0,
                      [s['swatch-inactive']]: index === 1
                    }
                  )}
                  style={{
                    backgroundImage: `url(${
                      swatchImages?.[val.replace(' ', '').toLowerCase()]
                    })`,
                    backgroundSize: 'cover'
                  }}
                />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OptionSelector
