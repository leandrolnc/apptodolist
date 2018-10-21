module.exports = {
    
    addTask(tasks, obj){

        let newTsk = {
            id: 1,
            description: '',
            dateAdded: datetime.toISOString(),
            state: false            
        };

        if(tasks.length > 0){

            let maxId = Math.max.apply(Math,tasks.map(function(o) { return o.id; }));
            let datetime = new Date();

            tsk.id = maxId++;
            tsk.description = obj.description;
        }
        else{
            tsk.description = obj.description;
        }
        return tsk;
    },

    updateTask(tasks, task, id){
        
        let tsk = tasks.find(t=>{return t.id == id});

        if(tsk == undefined){
            throw new Error('NOTFOUND');
        }
        else{
            if(task.description)
                tsk.description = task.description;

            if(task.state != undefined){
                if (task.state == tsk.state){
                    throw new Error('BADREQUEST');
                }
                tsk.state = task.state;
            }
        }

        return tsk;
    },

    deleteTask(tasks, id){
        
        let tsk = tasks.find(t=>{return t.id != id});

        if(tsk == undefined){
            throw new Error('NOTFOUND');
        }

        return tsk;
    }    
}