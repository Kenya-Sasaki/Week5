function Addtask(props){
    console.log("test2");
    return(
        <div className="task">
            <input type="checkbox"/>
            <p>{props.taskName}</p>
        </div>
    );
}

export default Addtask;