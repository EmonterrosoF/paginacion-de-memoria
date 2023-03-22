import { IPageFrame } from '@/store/processStore';

// esta funcion nos ayuda a ver las paginas que no estan usadas en el marco de pagina
export function pagesNotUseInFramePage(pageFrame: IPageFrame[]) {
  return pageFrame.reduce((prev, next) => (next.isUse ? prev : (prev += 1)), 0);
}
