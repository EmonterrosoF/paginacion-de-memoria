import { FormEvent, useState } from 'react';
import './App.scss';
import { IPageFrame, useProcessStore } from './store/processStore';

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

interface IProcess {
  id: number;
  name: string;
}

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

function randomColor(colors: string[], pageFrame: IPageFrame[]): string {
  const random = Math.floor(Math.random() * (colors.length - 1 - 0 + 1) + 0);

  const existColor = pageFrame.find((page) => page.color === colors[random]);

  // while (existColor) {
  //   random = Math.floor(Math.random() * (colors.length - 1 - 0 + 1) + 0);
  //   existColor = pageFrame.find((page) => page.color === colors[random]);
  // }

  if (existColor) {
    return randomColor(colors, pageFrame);
  }

  return colors[random];
}

function pagesNotUseInFramePage(pageFrame: IPageFrame[]) {
  return pageFrame.reduce((prev, next) => (next.isUse ? prev : (prev += 1)), 0);
}

let helpProcessSelected = true;

function ProcessControl() {
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
  } = useProcessStore();
  const [process, setProcess] = useState<IProcess[]>(Process);
  const [processSelected, setprocessSelected] = useState('A');
  // const [color, setColor] = useState('#279AF1');
  const [sizePage, setSizePage] = useState(1);

  const [removeProcess, setRemoveProcess] = useState('');
  // const [helpChangeSelected, setHelpChangeSelected] = useState(false);

  const handlerAdd = (e: FormEvent) => {
    e.preventDefault();

    const filterPageFrame = pageFrame.filter((page) => page.isUse !== true);

    if (sizePage > filterPageFrame.length) {
      const isConfirm = confirm('maxima capacidad del marco de pagina quieres colocarlo en espera?');

      if (isConfirm) {
        const filterProcess = process.filter((proc) => proc.name !== processSelected);
        // const filterWaitingProcess = waitingProcess.filter((proc) => proc.value !== processSelected);

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

  const handlerRemove = (e: FormEvent) => {
    e.preventDefault();

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
        // TODO: areglar el orden de los procesos en el select de terminar los procesos
        const finishProcessUpdated = addFinishProcess(waitingProcess[indexHelp].value, indexOfRemoveProcess, indexHelp);

        // if (indexHelp === 0) {
        // } else {
        // }
        // setRemoveProcess(()=>finishProcess[0].value);

        setRemoveProcess(() => finishProcessUpdated[0]?.value);

        console.log(finishProcessUpdated);

        document.getElementById('formTerminatedProcess')?.reset();
        indexHelp += 1;

        pageNotUse = pagesNotUseInFramePage(pageFrame);

        if (pageNotUse === 0) return;
      }
      document.getElementById('formTerminatedProcess')?.reset();
    }
  };

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
      <FinishProcess />
    </div>
  );
}

function RunProcess() {
  const { runProcess } = useProcessStore();

  return (
    <div className="container-run_process">
      <h2 className="frame-h2">Procesos En Ejecucion</h2>
      <ul className="run-process">
        {runProcess.map((process, i) => (
          <div
            style={{
              background: process.color,
              margin: '10px 0',
              padding: '10px',
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              borderRadius: '10px',
            }}
            key={i}
          >
            <span>Proceso</span>
            <li>{process.value}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

function WaitProcess() {
  const { waitingProcess } = useProcessStore();
  return (
    <div className="container-wait_process">
      <h2 className="frame-h2">Procesos En Espera</h2>
      <ul className="wait-process">
        {waitingProcess.map((process, i) => (
          <div
            style={{
              background: process.color,
              margin: '10px 0',
              padding: '10px',
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              borderRadius: '10px',
            }}
            key={i}
          >
            <span>Proceso</span>
            <li>{process.value}</li>
            <span>T. Pagina:</span>
            <span>{process.sizePage}</span>
          </div>
        ))}
      </ul>
    </div>
  );
}

function FinishProcess() {
  const { terminateProcess, cleanTerminateProcess } = useProcessStore();
  return (
    <>
      <div className="container-finish_process">
        <h2 className="frame-h2">Procesos Terminados</h2>
        <ul className="finish-process">
          {terminateProcess.map((process, i) => (
            <div
              style={{
                background: process.color,
                margin: '10px 0',
                padding: '10px',
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                borderRadius: '10px',
              }}
              key={i}
            >
              <span>Proceso</span>
              <li>{process.value}</li>
            </div>
          ))}
        </ul>
      </div>
      <button
        onClick={() => {
          cleanTerminateProcess();
        }}
        disabled={terminateProcess.length === 0}
        className="control-button control-terminate-button"
      >
        Limpiar Procesos
        <br /> terminados
      </button>
    </>
  );
}

// const pageFrame = [
//   {
//     number: 0,
//   },
//   {
//     number: 1,
//   },
//   {
//     number: 2,
//   },
//   {
//     number: 3,
//   },
//   {
//     number: 4,
//   },
//   {
//     number: 5,
//   },
//   {
//     number: 6,
//   },
//   {
//     number: 7,
//   },
// ];

function PageFrame() {
  const { pageFrame } = useProcessStore();

  return (
    <div className="frame">
      <h2 className="frame-h2">Marco de Pagina</h2>
      <ul className="frame-ul">
        {pageFrame.map((page) => (
          <li className="frame-li" key={page.number}>
            <span className="frame-span">{page.number}</span>
            <div style={{ background: page.color }} className="frame-div">
              {page.value}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <h1 className="container-h1">PAGINACIÓN</h1>
      <section className="section">
        <ProcessControl />
        <div className="section-center">
          <RunProcess />
          <WaitProcess />
        </div>
        <PageFrame />
      </section>
    </div>
  );
}

export default App;
