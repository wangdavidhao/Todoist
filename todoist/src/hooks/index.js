import {useState, useEffect} from 'react';
import {firebase} from '../firebase.js';  /*Local firebase file*/
import { collatedTasksExist } from '../helpers';
import moment from 'moment';

//param selectedProject = projectId
export const useTasks = selectedProject => {

    //State hooks for tasks and archivedTasks
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    //Run each time selectedProject change
    useEffect(() => {

        let unsubscribe = firebase
        .firestore()
        .collection('tasks')
        .where('userId', '==', '123');


        unsubscribe = selectedProject && !collatedTasksExist(selectedProject) //If it doesn't match with INBOX TODAY NEXT_7
        ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject)) //Choose the projectId equals to selectedProject
        : selectedProject === 'TODAY'
        ? (unsubscribe = unsubscribe.where(
            'date',
            '==',
            moment().format('DD/MM/YYYY')
        ))
        :selectedProject === 'INBOX' || selectedProject === 0
        ? (unsubscribe = unsubscribe.where('date', '==', ''))
        :unsubscribe;

        unsubscribe = unsubscribe.onSnapshot(snapshot => {
            //One task element = 1 row in the tasks collection in firebase
            const newTasks = snapshot.docs.map(task => ({
                //Only id can be passes in props, others need to acces => .
                id:task.id,
                ...task.data(),
            }));

            setTasks(
                selectedProject === 'NEXT_7'
                ? newTasks.filter(
                    task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                    task.archived !== true
                )
                : newTasks.filter(task => task.archived !== true) //Set all tasks that are not archived
            );

            setArchivedTasks(newTasks.filter(task => task.archived !== false)); //Set all tasks that are archived
        });

        return () => unsubscribe();

    }, [selectedProject]);

    return { tasks, archivedTasks };
}


export const useProjects = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        firebase
        .firestore()
        .collection('projects')
        .where('userId', '==', '123')
        .orderBy('projectId')
        .get()
        .then(snapshot => {
            const allProjects = snapshot.docs.map(project => ({
                ...project.data(),
                docId: project.id,
            }));


            //If the projects changed, then set the new projects (allProjects)
            if(JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                setProjects(allProjects);
            }
        });
    }, [projects]);

    return { projects, setProjects };
}