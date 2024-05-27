'use client'
import HandleComponent from "@/components/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Rnd } from 'react-rnd';
import { RadioGroup } from '@headlessui/react';
import { useState } from "react";
import { colors, finishes, materials, models } from "@/app/validators/option-validator";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { base_price } from "@/app/config/products";

interface DesignConfigurationProps {
  configId: string,
  imageUrl: string,
  imageDimensions: { width: number, height: number }
}

type OptionType = 'color' | 'model' | 'material' | 'finish';

function DesignConfiguration({ configId, imageUrl, imageDimensions }: DesignConfigurationProps) {
  const [options, setOptions] = useState<{
    color: (typeof colors)[number],
    model: (typeof models.options)[number],
    material: (typeof materials.options)[number]
    finish: (typeof finishes.options)[number]
  }>({
    color: colors[0],
    model: models.options[0],
    material: materials.options[0],
    finish: finishes.options[0]
  });

  const handleOptionChange = (name: OptionType, value: any) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value
    }));
  };

  return (
    <div className="relative mt-20 grid grid-cols-3 mb-20 pb-20">
      <div className="relative h-[37.5rem] overflow-hidden col-span-2
       w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 pt-12 text-center
      focus:ring-2 focus:ring-primary focus:ring-offset-2">
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio ratio={896 / 1831} className="pointer-events-none relative z-50 aspect-[896/1831] w-full">
            <Image width={1000} height={1000} alt="phone" src='/phone-template.png' className="pointer-events-none select-none z-50" />
          </AspectRatio>

          <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />

          <div className={cn('absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]',
            `bg-${options.color.tw}`
          )} />
        </div>

        <Rnd
          className="absolute z-20 border-[3px] border-primary"
          default={{ x: 150, y: 205, height: imageDimensions.height / 4, width: imageDimensions.width / 4 }}
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />
          }}>
          <div className="relative h-full w-full">
            <Image width={1000} height={1000} src={imageUrl} alt="custom image" className="pointer-events-none" />
          </div>
        </Rnd>
      </div>

      <div className="h-[37.5rem] flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div aria-hidden="true" className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none" />

          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">Customize your cover</h2>

            <div className="w-full h-px bg-zinc-200 my-6" />

            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">

                <RadioGroup value={options.color}
                  onChange={(value) => handleOptionChange('color', value)}>

                  <Label>Color: {options.color.label}</Label>

                  <div className="mt-3 flex items-center space-x-3">
                    {colors.map((color) => (
                      <RadioGroup.Option key={color.label} value={color}
                        className={({ active, checked }) => cn('relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent',
                          { [`border-${color.tw}`]: active || checked }
                        )}>

                        <span className={cn(`bg-${color.tw}`, "h-8 w-8 rounded-full border border-black border-opacity-10")} />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                <div className="relative flex flex-col gap-3 w-full">
                  <Label>Model</Label>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" role="combobox" className="w-full justify-between">
                        {options.model.label}

                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      {models.options.map((model) => (
                        <DropdownMenuItem key={model.label} className={cn("flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                          { "bg-zinc-100": model.label === options.model.label }
                        )}
                          onClick={() => handleOptionChange('model', model)}>
                          <Check className={cn("mr-2 h-4 w-4", model.label === options.model.label ? "opacity-100" : "opacity-0")} />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {[materials, finishes].map(({ name, options: selectableOptions }) => (
                  <RadioGroup key={name} value={options[name as OptionType]}
                    onChange={(value) => handleOptionChange(name as OptionType, value)}>
                    <Label>
                      {name.slice(0, 1).toUpperCase() + name.slice(1)}
                    </Label>

                    <div className="mt-3 space-y-4">
                      {selectableOptions.map((option) => (
                        <RadioGroup.Option key={option.value} value={option}
                          className={({ active, checked }) =>
                            cn(
                              'relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between',
                              {
                                'border-primary': active || checked,
                              }
                            )
                          }>

                          <span className="flex items-center">
                            <span className="flex flex-col text-sm">
                              <RadioGroup.Label className="font-medium text-gray-900" as="span">
                                {option.label}
                              </RadioGroup.Label>

                              {option.description ? (
                                <RadioGroup.Description className="text-gray-500" as="span">
                                  <span className="block sm:inline">{option.description}</span>
                                </RadioGroup.Description>
                              ) : null}
                            </span>
                          </span>

                          <RadioGroup.Description className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right" as="span">
                            <span className="font-medium text-gray-900">{formatPrice(option.price / 100, 'USD')}</span>
                          </RadioGroup.Description>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="w-full px-8 h-16 bg-white">
          <div className="h-px w-full bg-zinc-200" />

          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center">
              <p className="font-medium whitespace-nowrap">
                {formatPrice((base_price + options.finish.price + options.material.price) / 100, 'USD')}
              </p>

              <Button size="sm" className="w-full">Continue <ArrowRight className="h-4 w-4 ml-1.5 inline" /></Button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default DesignConfiguration