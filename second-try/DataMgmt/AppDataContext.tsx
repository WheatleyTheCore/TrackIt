import { createContext, ReactElement, useState } from "react";
import {loadAllCollectionNames, saveCollection as saveCollectionToDisk, deleteCollection as deleteCollectionFromDisk} from './storageUtils'
import * as SQLite from 'expo-sqlite'
import { Button } from "react-native";


interface CollectionInterface {
    name: String;
    entrySchema: Object;
    entries: Entry[];
}

interface AppContextInterface {
    collectionNames: string[];
    setCollectionNames: any;
    collectionFactory: any;
    currentCollection: any;
    setCurrentCollection: any;
    saveCollection: any;
    removeCollection: any;
    removeEntry: any;
}

type Collection = {
    name: string;
    entrySchema: Object;
    entries: Entry[];
}

type Entry = {
    [propName: string]: any;
}

const defaultCollection: CollectionInterface = {
    name: "",
    entrySchema: {},
    entries: []
}

export const AppDataContext = createContext<AppContextInterface | null>(null)

export const AppDataContextProvider = (props: any): ReactElement => {
    const [collectionNames, setCollectionNames] = useState<string[]>(['asdf'])
    const [currentCollection, setCurrentCollection] = useState<Collection>(props.defaultCollection)
    const [collections, setCollections] = useState<Collection[]>([]);

    const database = SQLite.openDatabase('db.db');

    //create table for collections (TODO abstract into setup function)
    database.transaction(tx => {
        tx.executeSql('drop table if exists collections')
        tx.executeSql('create table if not exists collections (id integer primary key autoincrement, name text unique, entry_schema text, entries text)')
    })

    const loadAllCollections = () => {
        let collections = [];
    }

    const createCollection = (collectionToSave: Collection) => {
        let name = collectionToSave.name;
        let entrySchema = JSON.stringify(collectionToSave.entrySchema);
        let entries = JSON.stringify([]);

        database.transaction(tx => {
            tx.executeSql("insert into collections (name, entry_schema, entries) values (?, ?, ?)", [name, entrySchema, entries], () => {
                //direct user to the collection page
            }, (_, err)=>{
                console.log(err)
            })
        })
    }

    const updateCollection = (collectionToSave: Collection, name: string) => {
        let updatedName = collectionToSave.name;
        let updatedEntrySchema = JSON.stringify(collectionToSave.entrySchema);
        let updatedEntries = JSON.stringify([]);

        database.transaction(tx => {
            tx.executeSql("update collections set name = ?, entry_schema = ?, entries = ?  where name = ?", [updatedName, updatedEntrySchema, updatedEntries, name], () => {
                //direct user to the collection page
            }, (_, err)=>{
                console.log(err)
            })
        })
    }

    const deleteCollection = (name: string) => {
        database.transaction(tx => {
            tx.executeSql("delete from collections where name = ?", [name], () => {
                //direct user to the collection page
            }, (_, err)=>{
                console.log(err)
            })
        })
    }

    const removeCollection = async (collectionName: string) => {
        deleteCollectionFromDisk(collectionName)
        let updatedNameList = collectionNames.filter(name => name != collectionName)
        setCollectionNames(updatedNameList)
    }

    const saveEntries = (entries: Entry[]) => {
        setCurrentCollection({
            ...currentCollection,
            entries: entries
        })
    }

    const removeEntry = (entryID: string) => {
        let updatedEntries = currentCollection.entries.filter(entry => entry.ID != entryID)
        saveEntries(updatedEntries)
    }

    const collectionFactory = () => {
        let newCollection = new Object(defaultCollection)
        return newCollection
    }
    

    return (
        <AppDataContext.Provider value={{
            // collectionNames,
            // setCollectionNames,
            // collectionFactory,
            // currentCollection,
            // setCurrentCollection,
            // saveCollection,
            // removeCollection,
            // removeEntry
        }}>
            {props.children}
            <Button onPress={() => {
                let collection = {
                    name: 'test collection',
                    entrySchema: {
                        time: 'number',
                        place: 'text'
                    },
                    entries: []
                }
                createCollection(collection);
            }} title="add some data" />
            <Button onPress={() => {
                let collection = {
                    name: 'updated!',
                    entrySchema: {
                        time: 'AAAAA',
                        place: 'EEEEEEE'
                    },
                    entries: []
                }
                updateCollection(collection, 'test collection');
            }} title="update some data" />
            <Button onPress={() => {
                deleteCollection('test collection');
            }} title="delete row" />
            <Button onPress={() => {
                database.transaction(tx => {
                    tx.executeSql("select * from collections", [], (_, data) => {
                        console.log("-------------data from db------------")
                        console.log(data)
                    })
                })
            }} title="read some data" />
        </AppDataContext.Provider>
    )
}