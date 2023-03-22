import { create } from 'zustand'; // aqui se importa un metodo de la libreria de zustand la que nos sirve para el estado global

// estan son interfaces, pienselo son como modelos que nos sirven para el tipado de datos
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
  color?: string;
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

  addFinishProcess: (process: string, indexOfProcessRemoved?: number, indexHelp?: number) => IFinishProcess[];
  removeFinishProcess: (process: string, color?: string) => IFinishProcess[];
  cleanTerminateProcess: () => void;
  addWaitingProcess: (process: string, sizeProcess: number, color: string) => void;
  removeWaitingProcess: (process: string) => void;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// en esta parte usamos la libreria zustand que nos sirve para tener un estado global, gracias a esto podemos acceder a todos los datos
// desde cualquier componente sin inportar en que lugar este

// practicamente zustand usa un objeto para poder crear el estado global, donde podemos agregar los metodos y arrays o cualquier otro tipo
// de dato que nos vaya a servir en nuestra applicacion
export const useProcessStore = create<IProcessStore>((set) => ({
  // este array tenemos el marco de pagina donde agregamos o quitamos los procesos
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

  //esta es la lista de los procesos en ejecucion
  runProcess: [],

  // esta es la lista de los procesos que podemos terminarlos, osea los que aparecen en el select de terminar proceso
  finishProcess: [],

  // esta es la lista de los procesos que ya estan terminados
  terminateProcess: [],

  // esta es la lista de los procesos que estan en espera
  waitingProcess: [],

  // esta es la lista de los colores que pueden tener los procesos
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

  // este metodo que nos sirve para agregar procesos al array o lista del marco de pagina
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

  // este metodo nos sirve para agregar procesos al array o lista de procesos que podemos terminar
  addFinishProcess: (process, indexOfProcessRemoved, indexHelp = 0) => {
    let copyFinishProcess: IFinishProcess[] = [];
    set((state) => {
      if (indexOfProcessRemoved !== undefined && indexHelp === 0) {
        state.finishProcess.splice(indexOfProcessRemoved, 0, { value: process });
        copyFinishProcess = state.finishProcess;

        return {};
      }

      copyFinishProcess = [...state.finishProcess, { value: process }];

      return { finishProcess: [...state.finishProcess, { value: process }] };
    });

    return copyFinishProcess;
  },

  // este metodo elimina los procesos que estan en la lista de procesos para terminarlos
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

  // este metodo limpia o elimina los procesos que ya estan terminados osea este metodo es el que usa en el boton de limpiar los procesos terminados
  cleanTerminateProcess: () => {
    set(() => ({ terminateProcess: [] }));
  },

  // este metodo agrega a la lista los procesos que estan en espera
  addWaitingProcess: (process: string, sizePage: number, color: string) => {
    set((state) => ({ waitingProcess: [...state.waitingProcess, { value: process, sizePage, color }] }));
  },

  // y por ultimo este metodo remueve o elimina los procesos que estan en la lista de espera
  removeWaitingProcess(process: string) {
    set((state) => ({ waitingProcess: state.waitingProcess.filter((proc) => proc.value !== process) }));
  },
}));
