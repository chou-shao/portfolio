import { useState, useId } from 'react';
function Home(){

    const [count, setCount] = useState(0);
    const id = useId();

    return (
        <div>
            Home
            <button
                onClick = { () => {
                    const delay = Math.floor(Math.random()*2000);
                    // Called after 1-2 sec
                    // setTimeout( () => setCount ( count + 1), delay);
                    setTimeout( ()=> setCount( (current) => current + 1), delay );

                }}
                > {count } </button>

                <label className="form__name" htmlFor={`${id}-name`}>Name</label><input className="form__name" id = {`${id}-name`}/>
                <label className="form__age" htmlFor={`${id}-age`}>Age </label><input className="form__age" id ={`${id}-age`}/>
        </div>
    );
}
export default Home;