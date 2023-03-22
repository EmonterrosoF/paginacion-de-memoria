import { useProcessStore } from '@/store/processStore';

// este es el componente que muestra los marcos de pagina en la vista
export function PageFrame() {
  const { pageFrame } = useProcessStore(); // siempre se usa el estado global donde manejamos casi toda la logica,
  // donde tenemos las listas o arrays y las funciones que hacen el trabajo

  // esto es lo que se muestra en la vista
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
