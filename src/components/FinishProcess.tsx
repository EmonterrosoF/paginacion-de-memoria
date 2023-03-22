import { useProcessStore } from '@/store/processStore';

// este componente se usa para mostrar los procesos ya terminados
export function FinishProcess() {
  const { terminateProcess, cleanTerminateProcess } = useProcessStore(); // siempre se usa el estado global donde manejamos casi toda la logica,
  // donde tenemos las listas o arrays y las funciones que hacen el trabajo

  // esto es lo que se muestra en la vista
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
      {/* este boton se utiliza para limpiar todos los procesos ya terminados */}
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
