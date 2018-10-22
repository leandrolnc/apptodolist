module.exports = {
    
    addTask(tasks, obj){

        let datetime = new Date();

        let newTsk = {
            id: 1,
            description: '',
            dateAdded: datetime.toISOString(),
            state: false            
        };

        if(tasks.length > 0){

            let maxId = Math.max.apply(Math,tasks.map(function(o) { return o.id; }));
            

            newTsk.id = ++maxId;
            newTsk.description = obj.description;
        }
        else{
            newTsk.description = obj.description;
        }

        tasks.push(newTsk);

        return newTsk;
    },

    updateTask(tasks, task, id, statusCode){
        
        let tsk = tasks.find(t=>{return t.id == id});

        if(tsk == undefined){
            statusCode.code = 404;
            return {};
        }
        else{
            if(task.description)
                tsk.description = task.description;

            if(task.state != undefined){
                if (task.state == tsk.state){
                    statusCode.code = 400;
                    return {};
                }
                tsk.state = task.state;
            }
        }

        return tsk;
    },

    deleteTask(tasks, id, statusCode){
        
        let tsk = tasks.filter(t=>{return t.id != id});

        let aux = tasks.find(t=>{return t.id == id});

        if(aux == undefined){
            statusCode.code = 404;
        }

        return tsk;
    },

    filterTasks(tasks, filter, orderBy){

        let aux = Object.assign([], tasks);

        if(filter == 'INCOMPLETE'){
            aux = aux.filter(t=>{return !t.state})
        }

        switch(orderBy){
            case 'DESCRIPTION':

                aux = aux.sort(function(a,b){
                    return (a.description > b.description)
                });

                break;

            default:
                aux = aux.sort(function(a,b){
                    return (new Date(a.dateAdded)-new Date(b.dateAdded))
                });            

                break;

        }

        return aux;
    }


}