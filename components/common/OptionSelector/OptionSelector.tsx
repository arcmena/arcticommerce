import cn from 'classnames'

import {
  Entities,
  ProductOption,
  ProductVariant,
  ProductWithVariants
} from '@shopify/schema'

import s from './OptionSelector.module.css'

interface OptionSelectorProps {
  product: ProductWithVariants
  activeVariant: ProductVariant
  updateActiveVariant: (
    selectedOptions: {
      name: string
      value: string
    }[]
  ) => void
}

const OptionSelector = ({
  product,
  activeVariant,
  updateActiveVariant
}: OptionSelectorProps) => {
  const { options, swatchImages } = product

  const previewImages = JSON.parse(swatchImages?.value!)

  console.log(activeVariant)

  const activeOptions = activeVariant.selectedOptions

  return (
    <div className={s['container']}>
      {options?.map(({ name, values }) => (
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
                  onClick={() => {
                    const newOptions = activeVariant.selectedOptions.map(
                      selectedOption =>
                        selectedOption.name === 'Size'
                          ? { ...selectedOption, value: val }
                          : selectedOption
                    )

                    updateActiveVariant(newOptions)
                  }}
                  className={cn(
                    'border-2 border-gray-200 leading-[43px] h-auto text-[13px] px-4',
                    {
                      ['border-black']: activeOptions[0].value === val
                      // [s['disabled-radio']]: index === 2
                    }
                  )}
                >
                  {val}
                </button>
              ) : (
                <button
                  key={val}
                  onClick={() => {
                    const newOptions = activeVariant.selectedOptions.map(
                      selectedOption =>
                        selectedOption.name === 'Color'
                          ? { ...selectedOption, value: val }
                          : selectedOption
                    )

                    updateActiveVariant(newOptions)
                  }}
                  id={val.replace(' ', '').toLowerCase()}
                  className={cn(
                    'border-2 border-gray-200 w-[40px] min-w-[40px] h-[40px] rounded-full relative inline-block',
                    s['swatch'],
                    {
                      [s['swatch-active']]: activeOptions[1].value === val
                      // [s['swatch-inactive']]: index === 1
                    }
                  )}
                  style={{
                    backgroundImage: `url(${
                      previewImages?.[val.replace(' ', '').toLowerCase()]
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
