import { useProcessStore } from '@/store/processStore';

// este componente muestra los procesos que estan en espera
export function WaitProcess() {
  const { waitingProcess } = useProcessStore(); // siempre se usa el estado global donde manejamos casi toda la logica,
  // donde tenemos las listas o arrays y las funciones que hacen el trabajo

  // aqui se renderiza los procesos que estan en espera
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
