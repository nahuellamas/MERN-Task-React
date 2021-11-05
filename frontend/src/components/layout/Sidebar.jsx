
import NewProyect from '../proyectos/NewProyect';
import ListProyects from '../proyectos/ListProyects';
const Sidebar = () => {
    
    return ( 
        <aside>
            <h1>MERN<span>Task</span></h1>
            <NewProyect />
            <div className="proyectos">
                <h2>Tus Proyectos</h2>
                <ListProyects />
            </div>
        </aside>
     );
}
 
export default Sidebar;