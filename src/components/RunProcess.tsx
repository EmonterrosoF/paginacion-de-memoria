import { useProcessStore } from '@/store/processStore';

// este componente muestra los proceso que estan en ejecucion
export function RunProcess() {
  const { runProcess } = useProcessStore(); // siempre se usa el estado global donde manejamos casi toda la logica,
  // donde tenemos las listas o arrays y las funciones que hacen el trabajo

  // aqui se renderiza toda la vista para ver los procesos en ejecucion
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
