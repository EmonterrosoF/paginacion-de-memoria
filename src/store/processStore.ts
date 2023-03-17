import { create } from 'zustand';

export interface IPageFrame {
  number: number;
  isUse: boolean;
  value: string;
  color: string;
}

interface IRunProcess {
  value: string;
  color: string;
}

interface IFinishProcess {
  value: string;
  color: string;
}

interface IWaitingProcess {
  value: string;
  color: string;
  sizePage: number;
}

interface IProcessStore {
  pageFrame: IPageFrame[];
  runProcess: IRunProcess[];
  finishProcess: IFinishProcess[];
  terminateProcess: IFinishProcess[];
  colors: string[];
  waitingProcess: IWaitingProcess[];

  addPageFrame: (process: string, sizeProcess: number, color: string) => void;

  addFinishProcess: (process: string, color: string) => void;
  removeFinishProcess: (process: string, color?: string) => IFinishProcess[];
  cleanTerminateProcess: () => void;
  addWaitingProcess: (process: string, sizeProcess: number, color: string) => void;
  removeWaitingProcess: (process: string) => void;
}

export const useProcessStore = create<IProcessStore>((set) => ({
  pageFrame: [
    {
      number: 0,
      isUse: false,
      value: '',
      color: '#757677de',
    },
    {
      number: 1,
      isUse: false,
      value: '',
      color: '#757677de',
    },
    {
      number: 2,
      isUse: false,
      value: '',
      color: '#757677de',
    },
    {
      number: 3,
      isUse: false,
      value: '',
      color: '#757677de',
    },
    {
      number: 4,
      isUse: false,
      value: '',
      color: '#757677de',
    },
    {
      number: 5,
      isUse: false,
      value: '',
      color: '#757677de',
    },
    {
      number: 6,
      isUse: false,
      value: '',
      color: '#757677de',
    },
    {
      number: 7,
      isUse: false,
      value: '',
      color: '#757677de',
    },
  ],

  runProcess: [],
  finishProcess: [],
  terminateProcess: [],
  waitingProcess: [],
  colors: [
    '#F6AA1C',
    '#79B4A9',
    '#676F54',
    '#222A68',
    '#499F68',
    '#494949',
    '#FF5D73',
    '#41EAD4',
    '#FF9F1C',
    '#F71735',
    '#011627',
    '#058ED9',
    '#77685D',
    '#058ED9',
    '#483D3F',
    '#A39A92',
    '#CAA8F5',
    '#9984D4',
    '#592E83',
    '#230C33',
    '#B27C66',
    '#8ACB88',
    '#648381',
    '#575761',
    '#FFBF46',
    '#994636',
    '#895B1E',
    '#EA7AF4',
    '#B43E8F',
    '#6200B3',
    '#3B0086',
    '#290628',
    '#FF82A9',
    '#279AF1',
    '#60656F',
    '#011638',
    '#2E294E',
    '#9055A2',
    '#294D4A',
  ],

  addPageFrame: (process: string, sizeProcess: number, color: string) => {
    set((state) => {
      const filterPageFrame = state.pageFrame.filter((page) => page.isUse !== true);

      let helpSizeProcess = 0;

      if (sizeProcess <= filterPageFrame.length) {
        state.runProcess = [...state.runProcess, { value: process, color }];
        return {
          pageFrame: state.pageFrame.map((pag) => {
            if (!pag.isUse && helpSizeProcess < sizeProcess) {
              helpSizeProcess++;
              pag.isUse = true;
              pag.value = process;
              pag.color = color;
              return pag;
            }
            return pag;
          }),
        };
      }

      return {
        pageFrame: state.pageFrame,
      };
    });
  },

  addFinishProcess: (process: string, color: string) => {
    set((state) => {
      return { finishProcess: [...state.finishProcess, { value: process, color }] };
    });

    return { value: process, color };
  },

  removeFinishProcess: (process: string, color = '') => {
    let finishProcessCopy: IFinishProcess[] = [];
    set((state) => {
      state.terminateProcess = [...state.terminateProcess, { value: process, color }];

      state.pageFrame = state.pageFrame.map((pag) => {
        if (pag.value === process) {
          pag.color = '#757677de';
          pag.value = '';
          pag.isUse = false;
          return pag;
        }

        return pag;
      });
      finishProcessCopy = state.finishProcess;
      state.runProcess = state.runProcess.filter((proc) => proc.value !== process);
      return {
        finishProcess: state.finishProcess.filter((proc) => proc.value !== process),
      };
    });

    return finishProcessCopy.filter((proc) => proc.value !== process);
  },
  cleanTerminateProcess: () => {
    set(() => ({ terminateProcess: [] }));
  },
  addWaitingProcess: (process: string, sizePage: number, color: string) => {
    set((state) => ({ waitingProcess: [...state.waitingProcess, { value: process, sizePage, color }] }));
  },

  removeWaitingProcess(process: string) {
    console.log('process desde remove waitin process', process);
    set((state) => ({ waitingProcess: state.waitingProcess.filter((proc) => proc.value !== process) }));
  },
}));
