import { createContext, ReactElement, useState } from "react";
import {loadAllCollectionNames, saveCollection as saveCollectionToDisk, deleteCollection as deleteCollectionFromDisk} from './storageUtils'



interface Collection {
    entrySchema: Object;
    notes?: String;
    entries: Entry[];
}

interface AppContextInterface {
    collectionNames: string[];
    setCollectionNames: any;
    currentCollection: any;
    setCurrentCollection: any;
    saveCollection: any;
    removeCollection: any;
    removeEntry: any;
}

type Entry = {
    ID: string;
    [propName: string]: any;
}

const defaultCollection: Collection = {
    entrySchema: {},
    notes:"",
    entries: []
}

export const AppDataContext = createContext<AppContextInterface | null>(null)

export const AppDataContextProvider = (props: any): ReactElement => {
    const [collectionNames, setCollectionNames] = useState<string[]>(['asdf'])
    const [currentCollection, setCurrentCollection] = useState<Collection>(defaultCollection)

    const saveCollection = (collectionToSave: Collection, collectionName: any) => {
        const tempCollectionNames: string[] = [...collectionNames]
        if (!(tempCollectionNames.indexOf(collectionName))) {
            setCollectionNames([...tempCollectionNames, collectionName])
        }

        saveCollectionToDisk(collectionToSave, collectionName)
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

    return (
        <AppDataContext.Provider value={{
            collectionNames,
            setCollectionNames,
            currentCollection,
            setCurrentCollection,
            saveCollection,
            removeCollection,
            removeEntry
        }}>
            {props.children}
        </AppDataContext.Provider>
    )
}