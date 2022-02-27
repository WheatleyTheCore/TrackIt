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
    const [collectionNames, setCollectionNames] = useState<string[]>([])
    const [currentCollection, setCurrentCollection] = useState<Collection>(props.defaultCollection)
    const [collections, setCollections] = useState<Collection[]>([]);

    const database = SQLite.openDatabase('db.db');

    console.log(collectionNames)

    //create table for collections (TODO abstract into setup function)
    database.transaction(tx => {
        tx.executeSql('drop table if exists collections')
        tx.executeSql('create table if not exists collections (id integer primary key autoincrement, name text unique, entry_schema text, entries text)')
    })

    const getAllCollectionNames = () => {
        let collectionNames: string[] = [];
        database.transaction(tx => {
            tx.executeSql("select name from collections", [], (_, data) => {
                data.rows._array.forEach(item => {
                    collectionNames.push(item['name'])
                })
                setCollectionNames(collectionNames)
            }, (_, err)=>{
                console.log(err)
            })
        })
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

    //updates name and entrySchema
    const updateCollection = (collectionToSave: Collection, name: string) => {
        let updatedName = collectionToSave.name;
        let updatedEntrySchema = JSON.stringify(collectionToSave.entrySchema);
        let updatedEntries = JSON.stringify(collectionToSave.entries);

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

    const addEntry = (entry: Entry, collectionName: string) => {
        database.transaction(tx => {
            tx.executeSql("select entries from collections where name = ?", [collectionName], (t, data) => {
                let entryObject = data.rows._array[0]
                let entryArray = JSON.parse(entryObject.entries)
                entryArray.push(entry)
                tx.executeSql('update collections set entries = ? where name = ?', [JSON.stringify(entryArray), collectionName])
            }, (_, err)=>{
                console.log(err)
            })
        })
    }

    const updateEntry = (entry: Entry, index: number, collectionName: string) => {
        database.transaction(tx => {
            tx.executeSql("select entries from collections where name = ?", [collectionName], (t, data) => {
                let entryObject = data.rows._array[0]
                let entryArray = JSON.parse(entryObject.entries)
                if (index < entryArray.length) {
                    entryArray[index] = entry
                }
                tx.executeSql('update collections set entries = ? where name = ?', [JSON.stringify(entryArray), collectionName])
            }, (_, err)=>{
                console.log(err)
            })
        })
    }

    

    const deleteEntry = (index: number, collectionName: string) => {
        database.transaction(tx => {
            tx.executeSql("select entries from collections where name = ?", [collectionName], (t, data) => {
                let entryObject = data.rows._array[0]
                let entryArray = JSON.parse(entryObject.entries)
                entryArray.splice(index, 1)
                tx.executeSql('update collections set entries = ? where name = ?', [JSON.stringify(entryArray), collectionName])
            }, (_, err)=>{
                console.log(err)
            })
        })
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
                let collection = {
                    name: 'test collection',
                    entrySchema: {
                        time: 'number',
                        place: 'text'
                    },
                    entries: []
                }
                createCollection(collection);
                let collection2 = {
                    name: 'test collection 2',
                    entrySchema: {
                        time: 'number',
                        place: 'text'
                    },
                    entries: []
                }
                createCollection(collection2);
                let collection3 = {
                    name: 'test collection 3',
                    entrySchema: {
                        time: 'number',
                        place: 'text'
                    },
                    entries: []
                }
                createCollection(collection3);

                getAllCollectionNames()
                console.log(collectionNames)
            }} title="test the function!" />
        </AppDataContext.Provider>
    )
}