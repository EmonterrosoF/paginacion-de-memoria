import './App.scss'; // archivo scss donde esta todos los estilos de la app
import { PageFrame } from './components/PageFrame';
import ProcessControl from './components/ProcessControl';
import { RunProcess } from './components/RunProcess';
import { WaitProcess } from './components/WaitProcess';

/*
 aqui es el punto de partida de la app donde renderiza los componentes 
 que nos van a servir en la intefaz grafica como en la logica de la app

 nos podemos dirigir a la carpeta components donde podemos ver la logica de cada
 uno de los componentes como por ejemplo el componente ProcessControl
  y asi con los demas
 */

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
