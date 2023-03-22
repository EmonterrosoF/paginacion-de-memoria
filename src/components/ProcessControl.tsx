import { IProcess } from '@/models/intefaces';
import { useProcessStore } from '@/store/processStore';
import { pagesNotUseInFramePage } from '@/utils/pagesNot';
import { randomColor } from '@/utils/randomColor';
import { FormEvent, useState } from 'react';
import { FinishProcess } from './FinishProcess';

// array de objetos que contiene la lista de procesos que podemos asignar al marco de pagina, este se muestra en el select de proceso
const Process: IProcess[] = [
  {
    id: 1,
    name: 'A',
  },
  {
    id: 2,
    name: 'B',
  },
  {
    id: 3,
    name: 'C',
  },
  {
    id: 4,
    name: 'D',
  },
  {
    id: 5,
    name: 'E',
  },
  {
    id: 6,
    name: 'F',
  },
  {
    id: 7,
    name: 'G',
  },
  {
    id: 8,
    name: 'H',
  },
  {
    id: 9,
    name: 'I',
  },
  {
    id: 10,
    name: 'J',
  },
  {
    id: 11,
    name: 'K',
  },
  {
    id: 12,
    name: 'L',
  },
  {
    id: 13,
    name: 'M',
  },
  {
    id: 14,
    name: 'N',
  },
];

// esta es una interface que sirve como modelo de tipo  de dato recordemos que estamos usando ts
interface IForm {
  reset: () => void;
}

// este es un array de objetos que nos sirve para darle el tamanio de pagina al proceso +, este se muestra en el select de tamanio de pagina
const sizeProcess = [
  {
    id: 1,
    size: 1,
  },
  {
    id: 2,
    size: 2,
  },
  {
    id: 3,
    size: 3,
  },
  {
    id: 4,
    size: 4,
  },
  {
    id: 5,
    size: 5,
  },
  {
    id: 6,
    size: 6,
  },
];

// este es en si el componente que se renderiza en el archivo App en donde es el punto inicial
export default function ProcessControl() {
  const {
    addPageFrame,
    addFinishProcess,
    removeFinishProcess,
    addWaitingProcess,
    removeWaitingProcess,

    pageFrame,
    finishProcess,
    colors,
    waitingProcess,
  } = useProcessStore(); // este es un archivo donde se tiene todos los estados globales de la app, aqui se uso zustand una libreria para manejar
  // los estados globales de la app pracicamente casi que toda la logica de la app proviene de aqui en este archivo lo pueden encontrar en la ruta
  // store/processStore.ts

  const [process, setProcess] = useState<IProcess[]>(Process); // este es un estado local de tipo array de procesos donde guardamos todos los procesos que podemos elegir
  const [processSelected, setprocessSelected] = useState('A'); // este es un estado local que guarda el estado seleccionado

  const [sizePage, setSizePage] = useState(1); // este es un estado local que guarda el tamanio de pagina del proceso cuando elegimos el tamanio de pagina del proceso

  const [removeProcess, setRemoveProcess] = useState(processSelected); // este es un estado local que nos ayuda a guardar la referencia del proceso que vamos a terminar

  // esta funcion se ejecuta cuando agragamos un nuevo proceso, osea caundo presionamos el boton de iniciar proceso
  const handlerAdd = (e: FormEvent) => {
    // ya que me llevaria mucho tiempo explicar cada linea de codigo, entonces lo realizare generalmente
    // practicamente aqui esta la logica de como se agregan procesos a la lista de marcos de pagina (pageFrame), al igual que la lista de procesos en ejecucion,
    // y tambien si se llena el marco de pagina agregamos los procesos a la lista o array de procesos en espera

    e.preventDefault();

    const filterPageFrame = pageFrame.filter((page) => page.isUse !== true);

    if (sizePage > filterPageFrame.length) {
      const isConfirm = confirm('maxima capacidad del marco de pagina quieres colocarlo en espera?');

      if (isConfirm) {
        const filterProcess = process.filter((proc) => proc.name !== processSelected);

        setProcess(filterProcess);
        setprocessSelected(filterProcess[0].name);

        addWaitingProcess(processSelected, sizePage, randomColor(colors, pageFrame));
      }
      return;
    }

    if (process.length === 0) return;
    const filterProcess = process.filter((proc) => proc.name !== processSelected);
    setProcess(filterProcess);
    setprocessSelected(filterProcess[0].name);

    addPageFrame(processSelected, sizePage, randomColor(colors, pageFrame));
    addFinishProcess(processSelected);
    if (finishProcess.length === 0) {
      setRemoveProcess(processSelected);
    }
  };

  // esta funcion se ejecuta cuando terminanos un proceso, osea caundo presionamos el boton de terminar proceso
  const handlerRemove = (e: FormEvent) => {
    // aqui va toda la logica cuando terminamos un proceso en ejecucion, se remueve de la lista de marcos de pagina osea pageFrame
    // se remueve del select terminar proceso y se agregan al array o lista de procesos terminados y tambien se remueve de la lista
    // de procesos en ejecucion y aqui esta la logica de cuando hay procesos en espera, cuando le damos a terminar un proceso, aqui se
    // verifica si hay suficientes marcos de pagina libres para ingresar el proceso que esta en la cola y si hay suficientes marcos lo agrega
    // al marco de pagina

    e.preventDefault();
    const formTerminated = document.getElementById('formTerminatedProcess') as unknown;
    const formSelectRemoveProcess = formTerminated as IForm;

    const exitstProcess = process.find((prc) => prc.name === removeProcess);

    const pageFram = pageFrame.find((pag) => pag.value === removeProcess);

    if (!exitstProcess) {
      setProcess([...process, { id: Math.random() * (5 - 1), name: removeProcess }]);
      const finishProcessFilter = removeFinishProcess(removeProcess, pageFram?.color);
      setRemoveProcess(finishProcessFilter[0]?.value);
      const indexOfRemoveProcess = finishProcess.findIndex((process) => process.value === removeProcess);

      let pageNotUse = pagesNotUseInFramePage(pageFrame);
      let indexHelp = 0;

      while (pageNotUse > 0) {
        if (!waitingProcess[indexHelp]) break;
        if (waitingProcess[indexHelp]?.sizePage > pageNotUse) break;
        addPageFrame(
          waitingProcess[indexHelp].value,
          waitingProcess[indexHelp].sizePage,
          waitingProcess[indexHelp].color,
        );
        removeWaitingProcess(waitingProcess[indexHelp].value);

        const finishProcessUpdated = addFinishProcess(waitingProcess[indexHelp].value, indexOfRemoveProcess, indexHelp);

        setRemoveProcess(() => finishProcessUpdated[0]?.value);

        formSelectRemoveProcess.reset();

        indexHelp += 1;

        pageNotUse = pagesNotUseInFramePage(pageFrame);

        if (pageNotUse === 0) return;
      }

      formSelectRemoveProcess.reset();
    }
  };

  // esto es practicamente lo que se observa en la app es html solo que como usamos react es tsx osea html combinado con javascript
  return (
    <div className="control">
      <div className="control-start">
        <form onSubmit={handlerAdd} className="control-form">
          <div className="control-container">
            <div className="control-group">
              <span className="control-span">Proceso:</span>
              <select onChange={(e) => setprocessSelected(e.target.value)} className="control-select">
                {process.map((proc) => (
                  <option className="control-option" key={proc.id} value={proc.name}>
                    {proc.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="control-group">
              <span className="control-span">Tamaño Pagina:</span>
              <select onChange={(e) => setSizePage(parseInt(e.target.value))} className="control-select">
                {sizeProcess.map((proc) => (
                  <option className="control-option" key={proc.id} value={proc.size}>
                    {proc.size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button disabled={process.length === 0} className="control-button">
            Iniciar <br /> Proceso
          </button>
        </form>
      </div>
      <div className="control-terminate">
        <form id="formTerminatedProcess" onSubmit={handlerRemove} className="control-form">
          <div className="control-container">
            <div className="control-group">
              <span className="control-span">Proceso:</span>
              <select
                onChange={(e) => setRemoveProcess(e.target.value)}
                className="control-select control-terminate-select"
              >
                {finishProcess.map((proc, i) => (
                  <option className="control-option control-terminate-option" key={i} value={proc.value}>
                    {proc.value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button disabled={finishProcess.length === 0} className="control-button control-terminate-button">
            terminar <br /> Proceso
          </button>
        </form>
      </div>
      {/*este es otro componente el que muestra los procesos ya terminadosl pueden ver la logica en la ruta components/FInishProcess.tsx*/}
      <FinishProcess />
    </div>
  );
}
