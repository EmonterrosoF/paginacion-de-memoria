import { IPageFrame } from '@/store/processStore';

// esta funcion nos ayuda para darnos un color aleatorio para los procesos
export function randomColor(colors: string[], pageFrame: IPageFrame[]): string {
  const random = Math.floor(Math.random() * (colors.length - 1 - 0 + 1) + 0);

  const existColor = pageFrame.find((page) => page.color === colors[random]);

  return existColor ? randomColor(colors, pageFrame) : colors[random];
}
