"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ColorPicker } from '@/components/ui/color-picker';
import { Checkbox } from '@/components/ui/checkbox';

const generateNoise = (canvas: HTMLCanvasElement | null, size: number, density: number, color: string, rgbMode: boolean): void => {
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const imageData = ctx.createImageData(size, size);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const threshold = (density / 100) * 255;

    if (rgbMode) {
      const r = Math.random() * 255;
      const g = Math.random() * 255;
      const b = Math.random() * 255;
      const alpha = Math.random() < (density / 100) ? 255 : 0;

      imageData.data[i] = r;
      imageData.data[i + 1] = g;
      imageData.data[i + 2] = b;
      imageData.data[i + 3] = alpha;
    } else {
      const r = Math.random() * 255;
      const alpha = r < threshold ? 255 : 0;

      imageData.data[i] = parseInt(color.slice(1, 3), 16);
      imageData.data[i + 1] = parseInt(color.slice(3, 5), 16);
      imageData.data[i + 2] = parseInt(color.slice(5, 7), 16);
      imageData.data[i + 3] = alpha;
    }
  }

  ctx.putImageData(imageData, 0, 0);
};

const exportCanvas = (canvas: HTMLCanvasElement | null, size: number): void => {
  if (!canvas) return;

  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `noise_${size}x${size}.png`;
  link.click();
};

export default function Home(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [size, setSize] = useState<number>(320);
  const [density, setDensity] = useState<number>(50);
  const [color, setColor] = useState<string>('#000000');
  const [rgbMode, setRgbMode] = useState<boolean>(false);

  useEffect(() => {
    generateNoise(canvasRef.current, size, density, color, rgbMode);
  }, [size, density, color, rgbMode]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full max-w-xs space-y-2">
        <label className='text-sm font-medium text-muted-foreground'>{"Preview (Scaled): "}</label>
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="ring-1 ring-border bg-white rounded-2xl h-[320px] w-[320px]"
        />
      </div>
      <div className="w-full max-w-xs space-y-2">
        <label className='text-sm font-medium text-muted-foreground'>Size: {size}x{size}</label>
        <Slider 
          value={[size]} 
          onValueChange={(value: number[]) => setSize(value[0])} 
          min={32} 
          max={512} 
          step={32}
        />
      </div>
      <div className="w-full max-w-xs space-y-2">
        <label className='text-sm font-medium text-muted-foreground'>Density: {density}%</label>
        <Slider 
          value={[density]} 
          onValueChange={(value: number[]) => setDensity(value[0])} 
          min={0} 
          max={100} 
          step={1}
        />
      </div>
      <div className="w-full max-w-xs space-y-2">
        <div className='flex justify-between'>
          <label className='text-sm font-medium text-muted-foreground'>Color: {color}</label>
          <div className='space-x-1 flex items-center'>
            <label className='text-sm font-medium text-muted-foreground'>RGB</label>
            <Checkbox className='rounded' checked={rgbMode} onCheckedChange={(checked: boolean) => setRgbMode(checked)} />
          </div>
        </div>
        <ColorPicker value={color} onChange={setColor} className='w-full' disabled={rgbMode}/>
      </div>
      <div className="flex w-full grow justify-between">
        <Button onClick={() => generateNoise(canvasRef.current, size, density, color, rgbMode)}>Regenerate</Button>
        <Button variant={"outline"} onClick={() => exportCanvas(canvasRef.current, size)}>Export</Button>
      </div>
    </div>
  );
}